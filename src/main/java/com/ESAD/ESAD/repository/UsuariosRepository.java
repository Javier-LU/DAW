package com.ESAD.ESAD.repository;


import com.ESAD.ESAD.entity.ESAD_profesionales;
import com.ESAD.ESAD.entity.ESAD_usuarios;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.List;
import java.util.Optional;

public interface UsuariosRepository extends JpaRepository <ESAD_usuarios, Integer>  {

    // Buscar por CS
    List<ESAD_usuarios> findByCentroSaludId(int centroSaludId);

    // Buscar por enfermedad
    List<ESAD_usuarios> findByEnfermedadId(int enfermedad);

    // Buscar por equipo
    List<ESAD_usuarios> findByEquipoId(int equipodId);

    // Buscar por DNI
    List<ESAD_usuarios> findByDni( String nombre);

    // Buscar por historico
    List<ESAD_usuarios> findByHistorico(Boolean historico);

    // Buscar por nombre y apellidos
    @Query("SELECT u FROM ESAD_usuarios u " +
            "WHERE (u.nombre IS NOT NULL AND u.nombre != '' AND u.nombre LIKE %?1%) " +
            "AND (u.primerApellido IS NOT NULL AND u.primerApellido != '' AND u.primerApellido LIKE %?2%) " +
            "AND (u.segundoApellido IS NOT NULL AND u.segundoApellido != '' AND u.segundoApellido LIKE %?3%)")
    List<ESAD_usuarios> buscarPorNombreYApellidos(String nombre, String primerApellido, String segundoApellido);

    // Métodos  para las estadísticas

    @Query("SELECT e.enfermedad, COUNT(u) FROM ESAD_usuarios u JOIN u.enfermedad e GROUP BY e.enfermedad")
    List<Object[]> countTotalUsuariosPorEnfermedad();

    @Query("SELECT e.equipo, COUNT(u) FROM ESAD_usuarios u JOIN u.equipo e GROUP BY e.equipo")
    List<Object[]> countTotalUsuariosPorEquipo();

    @Query("SELECT CASE WHEN u.edad < 50 THEN 'menores de 50' " +
            "WHEN u.edad < 50 THEN 'menores de 50' " +
            "WHEN u.edad BETWEEN 50 AND 69 THEN 'entre 50 y 69' " +
            "WHEN u.edad BETWEEN 70 AND 89 THEN 'entre 70 y 89' " +
            "ELSE '90 o más' END as rangoEdad, COUNT(u) FROM ESAD_usuarios u GROUP BY rangoEdad")
    List<Object[]> countTotalUsuariosPorRangoEdad();

    @Query("SELECT c.cs, COUNT(u) FROM ESAD_usuarios u JOIN u.centroSalud c GROUP BY c.cs")
    List<Object[]> countTotalUsuariosPorCentroSalud();

    @Query("SELECT COUNT(u) FROM ESAD_usuarios u WHERE u.tipoSalida IS NULL")
    int countUsuariosSinTipoSalida();



}
