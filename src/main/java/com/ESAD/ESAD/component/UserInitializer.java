package com.ESAD.ESAD.component;

import com.ESAD.ESAD.entity.ESAD_profesionales;
import com.ESAD.ESAD.entity.ESAD_profesionalesRoleEntity;
import com.ESAD.ESAD.entity.enu.Erole;
import com.ESAD.ESAD.repository.ProfesionalesRepository;
import com.ESAD.ESAD.repository.ProfesionalesRolesRepository;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.DependsOn;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.Collections;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.logging.Logger;

@Component
@DependsOn({"rolesInitializer", "permissionInitializer", "rolePermissionLinkInitializer"})
public class UserInitializer {

    @Autowired
    private ProfesionalesRepository profesionalesRepository;

    @Autowired
    private ProfesionalesRolesRepository profesionalesRolesRepository;

    @PostConstruct
    public void initUser() {

        // Checking if the admin user already exists
        if (profesionalesRepository.findByEmail("admin@example.com").isPresent()) {
            return; // Admin already initialized
        }

        // Retrieve or create the ADMIN role
        ESAD_profesionalesRoleEntity adminRole = profesionalesRolesRepository.findByRol(Erole.ADMIN)
                .orElseThrow(() -> new RuntimeException("ADMIN role not found"));

        // Create the admin professional
        ESAD_profesionales admin = ESAD_profesionales.builder()
                .nombre("Admin")
                .primerApellido("User")
                .segundoApellido("System")
                .dni("99999999R")
                .password("$2a$10$.btaTOC/PwcWbgTKvriyZ.Lk1E2unBU9VBEC7T59w2DLq1ugehCve") // Use a secure, encrypted method for real passwords
                .email("admin@example.com")
                .cualificacion("administrativo")
                .isEnabled(true)
                .isAccountNoExpired(true)
                .isAccountNoLocked(true)
                .isCredentialNoExpired(true)
                .roles(Set.of(adminRole))
                .build();

        // Save the new admin professional
        profesionalesRepository.save(admin);
    }
}
