package com.ESAD.ESAD.service;

import com.ESAD.ESAD.entity.ESAD_CS;
import com.ESAD.ESAD.entity.ESAD_equipo;
import com.ESAD.ESAD.entity.ESAD_usuarios;
import com.ESAD.ESAD.repository.CSRepository;
import com.ESAD.ESAD.repository.EquipoRepository;
import com.ESAD.ESAD.repository.ProfesionalesRepository;
import com.ESAD.ESAD.repository.UsuariosRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

@Service
public class EquipoService {

    @Autowired
    private UsuariosRepository repositoryUsuario;

    @Autowired
    private ProfesionalesRepository profesionalesRepository;

    @Autowired
    private EquipoRepository repository;

    public ESAD_equipo getEquipoById(Integer equipoId) {
        return repository.findById(equipoId)
                .orElseThrow(() -> new EntityNotFoundException("Equipo no encontrado con ID: " + equipoId));
    }


    //  Listar todas
    public List<ESAD_equipo> getAllEquipo() {
        return repository.findAll();
    }


    //  Eliminar
    public String deleteEquipo(Integer id) {

        List<ESAD_usuarios> usuarios = repositoryUsuario.findByEquipoId(id);

        for (ESAD_usuarios usuario : usuarios) {
            usuario.setEquipo(null);
        }

        // Save the updated usuarios
        repositoryUsuario.saveAll(usuarios);

        repository.deleteById(id); return "Centro de Salud eliminado: " + id; }

    // Create
    public ESAD_equipo saveEquipo(ESAD_equipo equipo) { return repository.save(equipo);}

    // Actualizar
    public ESAD_equipo updateEquipo(ESAD_equipo equipo) {
        ESAD_equipo existingCS = repository.findById(equipo.getId()).orElse(null);
        if (existingCS != null) {
            existingCS.setEquipo(equipo.getEquipo());
            existingCS.setAuxiliar(equipo.getAuxiliar());
            existingCS.setEnfermero(equipo.getEnfermero());
            existingCS.setMedico(equipo.getMedico());
            existingCS.setAdministrativo(equipo.getAdministrativo());
            existingCS.setCentro(equipo.getCentro());
            return repository.save(existingCS);
        }
        return null;
    }

    // Contar registros
    public Map<String, Long> getEquipoCounts() {
        List<Object[]> results = repository.countByCategoria();
        Map<String, Long> counts = new HashMap<>();

        for (Object[] result : results) {
            String categoria = (String) result[0];
            Long cantidad = ((Number) result[1]).longValue();
            counts.put(categoria, cantidad);
        }

        return counts;
    }



}
