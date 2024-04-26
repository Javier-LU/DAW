package com.ESAD.ESAD.repository;

import com.ESAD.ESAD.entity.ESAD_listaProfesiones;
import com.ESAD.ESAD.entity.ESAD_listaSalida;
import com.ESAD.ESAD.entity.enu.EEprofesion;
import com.ESAD.ESAD.entity.enu.ESalida;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ListaProfesiones extends JpaRepository<ESAD_listaProfesiones, Integer> {
    Optional<ESAD_listaProfesiones> findByListaPorfesion(EEprofesion listaPorfesion);
}
