package com.ESAD.ESAD.repository;


import com.ESAD.ESAD.entity.ESAD_profesionales;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfesionalesRepository extends JpaRepository <ESAD_profesionales, Integer>  {

    Optional<ESAD_profesionales> findByEmail(String email);

    Optional<ESAD_profesionales> findByNombre(String nombre);
}
