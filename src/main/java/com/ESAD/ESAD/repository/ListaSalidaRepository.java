package com.ESAD.ESAD.repository;

import com.ESAD.ESAD.entity.ESAD_listaSalida;
import com.ESAD.ESAD.entity.enu.ESalida;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ListaSalidaRepository extends JpaRepository<ESAD_listaSalida, Integer> {
    Optional<ESAD_listaSalida> findByListaSalida(ESalida listaSalida);
}
