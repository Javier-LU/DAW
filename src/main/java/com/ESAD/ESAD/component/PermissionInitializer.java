package com.ESAD.ESAD.component;

import com.ESAD.ESAD.entity.ESAD_profesionalesPermissionEntity;
import com.ESAD.ESAD.entity.ESAD_profesionalesRoleEntity;
import com.ESAD.ESAD.entity.enu.EPermission;
import com.ESAD.ESAD.entity.enu.Erole;
import com.ESAD.ESAD.repository.ProfesionalesPermissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class PermissionInitializer {

    @Autowired
    private ProfesionalesPermissionRepository profesionalesPermissionRepository;

    @PostConstruct
    public void initRoles() {
        for (EPermission permission : EPermission.values()) {
            profesionalesPermissionRepository.findByListPermissions(permission).orElseGet(() -> {
                ESAD_profesionalesPermissionEntity newPermission = new ESAD_profesionalesPermissionEntity();
                newPermission.setListPermissions(permission);
                return profesionalesPermissionRepository.save(newPermission);
            });
        }
    }
}
