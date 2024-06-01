package com.ESAD.ESAD.repository;

import com.ESAD.ESAD.entity.ESAD_equipo;
import com.ESAD.ESAD.entity.ESAD_profesionales;
import com.ESAD.ESAD.entity.ESAD_usuarios;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface EquipoRepository extends JpaRepository <ESAD_equipo, Integer>  {


    @Modifying
    @Query("UPDATE ESAD_equipo e SET e.medico = null WHERE e.medico.id = ?1")
    void unsetMedicoInEquipo(Integer id);

    @Modifying
    @Query("UPDATE ESAD_equipo e SET e.enfermero = null WHERE e.enfermero.id = ?1")
    void unsetEnfermeroInEquipo(Integer id);

    @Modifying
    @Query("UPDATE ESAD_equipo e SET e.auxiliar = null WHERE e.auxiliar.id = ?1")
    void unsetAuxiliarInEquipo(Integer id);

    @Modifying
    @Query("UPDATE ESAD_equipo e SET e.administrativo = null WHERE e.administrativo.id = ?1")
    void unsetAdministrativoInEquipo(Integer id);


}
