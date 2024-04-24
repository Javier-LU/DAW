package com.ESAD.ESAD.repository;


import com.ESAD.ESAD.entity.ESAD_tareas;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TareasRepository extends JpaRepository <ESAD_tareas, Integer>  {
}
