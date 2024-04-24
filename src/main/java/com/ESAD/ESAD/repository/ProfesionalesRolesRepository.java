package com.ESAD.ESAD.repository;

import com.ESAD.ESAD.entity.ESAD_profesionalesRoleEntity;
import com.ESAD.ESAD.entity.enu.Erole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfesionalesRolesRepository extends JpaRepository<ESAD_profesionalesRoleEntity, Integer> {
    Optional<ESAD_profesionalesRoleEntity> findByRol(Erole role);
}
