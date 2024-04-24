package com.ESAD.ESAD.repository;

import com.ESAD.ESAD.entity.ESAD_enfermedad;
import com.ESAD.ESAD.entity.ESAD_listaTareas;
import com.ESAD.ESAD.entity.enu.EEnfermedad;
import com.ESAD.ESAD.entity.enu.ETarea;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ListaTareaRepository extends JpaRepository<ESAD_listaTareas, Integer> {
    Optional<ESAD_listaTareas> findByListaTarea(ETarea listaTarea);
}
