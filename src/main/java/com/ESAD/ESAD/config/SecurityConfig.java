package com.ESAD.ESAD.config;


import com.ESAD.ESAD.security.filter.jwtTokenValidator;
import com.ESAD.ESAD.security.jwt.JwtUtils;
import com.ESAD.ESAD.service.UserDetailServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private JwtUtils jwtUtils;

    // COnfigurar los primeros filtros
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                // Deshabilitar CSRF
                .csrf(csrf -> csrf.disable())

                //Navegar sin token
                //.httpBasic(Customizer.withDefaults())
                // Configuración de manejo de sesiones para ser STATELESS
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // Configuración de autorización de solicitudes HTTP
                .authorizeHttpRequests(http -> {

                    // Ednpoint publicos
                    http.requestMatchers(HttpMethod.GET, "/hello").permitAll(); // Acceso permitido para todos
                    http.requestMatchers(HttpMethod.POST, "/auth/**").permitAll();


                    //Endpoint privados
                    http.requestMatchers(HttpMethod.GET, "/hello2").hasAuthority("READ"); // Acceso restringido por autoridad

                    //Todos los demas
                     http.anyRequest().authenticated(); // Denegar todas las demás solicitudes


                })
                .addFilterBefore(new jwtTokenValidator(jwtUtils), BasicAuthenticationFilter.class)
                .build();
    }

    //2º es el que maneja el comienzo de la conexión con la base de datos
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    //3º Necesita de dos componentes para autentificarse, la conexion con la base de datos y el encriptador de contraseñas
    @Bean
    public AuthenticationProvider authenticationProvider(UserDetailServiceImpl uuserDetailServiceImpl) {
        // Crear una instancia del DaoAuthenticationProvider
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder (passwordEncoder());
        provider.setUserDetailsService(uuserDetailServiceImpl);
        return provider;
    }

    // Contraseña
    @Bean
    public PasswordEncoder passwordEncoder() {
        return  new BCryptPasswordEncoder();
        //return NoOpPasswordEncoder.getInstance();
    }

    // Usuario
    @Bean
    public UserDetailsService userDetailsService() {
        // Crear un objeto UserDetails para definir las propiedades del usuario
        UserDetails userDetails = User.withUsername("santiago")
                .password("1234") // Añade {noop} para indicar que no hay encoder de contraseña
                .roles("ADMIN") // Define roles
                .authorities("READ", "CREATE") // Define permisos específicos además de los roles
                .build();

        // Retorna una instancia de InMemoryUserDetailsManager con el usuario definido
        return new InMemoryUserDetailsManager(userDetails);
    }

    // Encriptar contraseñas manual
    public static void main(String[] args) {
        String contraseña = "1234";

        // Crear un objeto BCryptPasswordEncoder
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        // Encriptar la contraseña
        String contraseñaEncriptada = encoder.encode(contraseña);

        // Imprimir la contraseña encriptada
        System.out.println(contraseñaEncriptada);
    }
}