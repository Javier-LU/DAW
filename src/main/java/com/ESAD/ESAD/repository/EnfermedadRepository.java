package com.ESAD.ESAD.repository;

import com.ESAD.ESAD.entity.ESAD_enfermedad;
import com.ESAD.ESAD.entity.ESAD_equipo;
import com.ESAD.ESAD.entity.ESAD_profesionalesRoleEntity;
import com.ESAD.ESAD.entity.enu.EEnfermedad;
import com.ESAD.ESAD.entity.enu.Erole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EnfermedadRepository extends JpaRepository<ESAD_enfermedad, Integer> {
    Optional<ESAD_enfermedad> findByEnfermedad(EEnfermedad enfermedad);

    List<ESAD_enfermedad> findById(int enfermedad);

}



