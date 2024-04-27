package com.ESAD.ESAD.service;

import com.ESAD.ESAD.entity.ESAD_equipo;
import com.ESAD.ESAD.entity.ESAD_profesionales;
import com.ESAD.ESAD.entity.ESAD_tareas;
import com.ESAD.ESAD.entity.ESAD_usuarios;
import com.ESAD.ESAD.repository.EquipoRepository;
import com.ESAD.ESAD.repository.ProfesionalesRepository;
import com.ESAD.ESAD.repository.TareasRepository;
import com.ESAD.ESAD.repository.UsuariosRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TareasService {


    @Autowired
    private TareasRepository repository;

    //  Eliminar todas
    public ESAD_tareas getTareasById(Integer Id) {
        return repository.findById(Id)
                .orElseThrow(() -> new EntityNotFoundException("Equipo no encontrado con ID: " + Id));
    }

    //  Listar todas
    public List<ESAD_tareas> getAllTareas() {
        return repository.findAll();
    }

    //  Eliminar todas
    public String deleteTareas(Integer id) {  repository.deleteById(id); return "Enfermedad eliminada: " + id; }

    // Create
    public ESAD_tareas saveTareas(ESAD_tareas teras) { return repository.save(teras);}

    // Actualizar
    public ESAD_tareas updateTareas(ESAD_tareas tareas) {
        ESAD_tareas existing = repository.findById(tareas.getId()).orElse(null);
        if (existing != null) {
            existing.setTipoTarea(tareas.getTipoTarea());
            existing.setFecha(tareas.getFecha());
            existing.setUsuario(tareas.getUsuario());

            return repository.save(existing);
        }
        return null;
    }

}
