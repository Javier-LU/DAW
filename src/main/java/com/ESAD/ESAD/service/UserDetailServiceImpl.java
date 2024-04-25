package com.ESAD.ESAD.service;

import com.ESAD.ESAD.config.SecurityConfig;
import com.ESAD.ESAD.controllers.request.AutLoginRequest;
import com.ESAD.ESAD.controllers.request.AuthReponse;
import com.ESAD.ESAD.entity.ESAD_profesionales;
import com.ESAD.ESAD.repository.ProfesionalesRepository;
import com.ESAD.ESAD.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.ArrayList;
import java.util.stream.Collectors;

@Service
public class UserDetailServiceImpl implements UserDetailsService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private ProfesionalesRepository profesionalesRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        ESAD_profesionales userEntity = profesionalesRepository.findByNombre(username)
                .orElseThrow(() -> new UsernameNotFoundException("No existe: "+username));

        List<SimpleGrantedAuthority> authorityList = new ArrayList<>();

// Añadir roles como autoridades
        userEntity.getRoles().forEach(role -> {
            authorityList.add(new SimpleGrantedAuthority("ROLE_" + role.getRol().name()));
        });

// Añadir permisos como autoridades
        userEntity.getRoles().stream()
                .flatMap(role -> role.getPermissionList().stream())
                .forEach(permission -> authorityList.add(new SimpleGrantedAuthority(permission.getListPermissions().name())));

                //.map(PermissionEntity::getName)
                //.map(SimpleGrantedAuthority::new)
                //.forEach(authorityList::add);

        return new User(
                userEntity.getNombre(),
                userEntity.getPassword(),
                userEntity.isEnabled(),
                userEntity.isAccountNoExpired(),
                userEntity.isCredentialNoExpired(),
                userEntity.isCredentialNoExpired(),
                authorityList
        );


    }

    public AuthReponse loginUser(AutLoginRequest autLoginRequest){
            String username = autLoginRequest.username();
            String password = autLoginRequest.password();

        Authentication authentication = this.autenticate(username,password);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String accessToken = jwtUtils.createToken(authentication);

        AuthReponse authReponse = new AuthReponse(username, "Logeado con exito", accessToken, true);
        return authReponse;
    }

    public Authentication autenticate (String username, String password){
        UserDetails userDetails = this.loadUserByUsername(username);

        if(userDetails == null){
            throw new UsernameNotFoundException("Usuario no encontrado");
        }

        if(!passwordEncoder.matches(password,userDetails.getPassword())){
            throw new UsernameNotFoundException("Contraseña erronea");
        }

        return new UsernamePasswordAuthenticationToken(username, userDetails.getPassword(), userDetails.getAuthorities());
    }
}
