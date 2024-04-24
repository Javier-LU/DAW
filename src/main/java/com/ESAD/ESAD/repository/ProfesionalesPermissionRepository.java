package com.ESAD.ESAD.repository;

import com.ESAD.ESAD.entity.ESAD_profesionalesPermissionEntity;
import com.ESAD.ESAD.entity.ESAD_profesionalesRoleEntity;
import com.ESAD.ESAD.entity.enu.EPermission;
import com.ESAD.ESAD.entity.enu.Erole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfesionalesPermissionRepository  extends JpaRepository<ESAD_profesionalesPermissionEntity, Integer> {
    Optional<ESAD_profesionalesPermissionEntity> findByListPermissions(EPermission listPermissions);

}
