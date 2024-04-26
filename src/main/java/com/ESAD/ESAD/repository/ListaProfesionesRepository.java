package com.ESAD.ESAD.repository;

import com.ESAD.ESAD.entity.ESAD_listaProfesiones;
import com.ESAD.ESAD.entity.enu.EEprofesion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ListaProfesionesRepository  extends JpaRepository<ESAD_listaProfesiones, Integer> {
    Optional<ESAD_listaProfesiones> findByListaPorfesion(EEprofesion listaPorfesion);
}
