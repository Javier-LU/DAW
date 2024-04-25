package com.ESAD.ESAD.service;

import com.ESAD.ESAD.entity.ESAD_profesionales;
import com.ESAD.ESAD.repository.ProfesionalesRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.ArrayList;
import java.util.stream.Collectors;

@Service
public class UserDetailServiceImpl implements UserDetailsService {

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
}
