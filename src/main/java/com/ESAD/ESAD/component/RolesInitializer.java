package com.ESAD.ESAD.component;

import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;
import javax.annotation.PostConstruct;
import com.ESAD.ESAD.repository.ProfesionalesRolesRepository;
import com.ESAD.ESAD.entity.ESAD_profesionalesRoleEntity;
import com.ESAD.ESAD.entity.enu.Erole;



@Component
public class RolesInitializer {


    @Autowired
    private ProfesionalesRolesRepository rolesRepository;

    @PostConstruct
    public void initRoles() {
        for (Erole role : Erole.values()) {
            rolesRepository.findByRol(role).orElseGet(() -> {
                ESAD_profesionalesRoleEntity newRole = new ESAD_profesionalesRoleEntity();
                newRole.setRol(role);
                return rolesRepository.save(newRole);
            });
        }
    }
}

