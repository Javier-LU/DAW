package com.ESAD.ESAD.repository;

import com.ESAD.ESAD.entity.ESAD_equipo;
import com.ESAD.ESAD.entity.ESAD_profesionales;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EquipoRepository extends JpaRepository <ESAD_equipo, Integer>  {



}
