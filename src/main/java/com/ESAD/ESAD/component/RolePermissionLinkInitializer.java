package com.ESAD.ESAD.component;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.DependsOn;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import javax.annotation.PostConstruct;

import com.ESAD.ESAD.repository.ProfesionalesRolesRepository;
import com.ESAD.ESAD.repository.ProfesionalesPermissionRepository;
import com.ESAD.ESAD.entity.ESAD_profesionalesRoleEntity;
import com.ESAD.ESAD.entity.ESAD_profesionalesPermissionEntity;
import com.ESAD.ESAD.entity.enu.Erole;
import com.ESAD.ESAD.entity.enu.EPermission;

import java.util.HashSet;
import java.util.Set;

@Component
@DependsOn({"rolesInitializer", "permissionInitializer"})
public class RolePermissionLinkInitializer {

    @Autowired
    private ProfesionalesRolesRepository rolesRepository;

    @Autowired
    private ProfesionalesPermissionRepository permissionRepository;

    @PostConstruct
    @Transactional
    public void linkRolesAndPermissions() {
        // Asignar permisos específicos a cada rol
        assignPermissionsToRole(Erole.ADMIN, new EPermission[]{EPermission.CREATE, EPermission.READ, EPermission.UPDATE, EPermission.DELETE});
        assignPermissionsToRole(Erole.MANAGER, new EPermission[]{EPermission.READ, EPermission.UPDATE});
        assignPermissionsToRole(Erole.SANITARY, new EPermission[]{EPermission.READ});
        assignPermissionsToRole(Erole.ADMINISTRATIVE, new EPermission[]{EPermission.READ, EPermission.REFRACTOR});
    }

    private void assignPermissionsToRole(Erole roleName, EPermission[] permissions) {
        ESAD_profesionalesRoleEntity role = rolesRepository.findByRol(roleName)
                .orElseThrow(() -> new IllegalStateException("El rol no funciona: " + roleName));

        Set<ESAD_profesionalesPermissionEntity> permissionSet = new HashSet<>();
        for (EPermission permission : permissions) {
            ESAD_profesionalesPermissionEntity perm = permissionRepository.findByListPermissions(permission)
                    .orElseThrow(() -> new IllegalStateException("El permiso no funciona: " + permission));
            permissionSet.add(perm);
        }

        role.setPermissionList(permissionSet);
        rolesRepository.save(role);
    }
}
