package com.ESAD.ESAD.service;

import com.ESAD.ESAD.entity.ESAD_enfermedad;
import com.ESAD.ESAD.entity.ESAD_equipo;
import com.ESAD.ESAD.repository.EnfermedadRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnfermedadService {
    @Autowired
    private EnfermedadRepository repository;

    //  Listar todas
    public List<ESAD_enfermedad> getAllEnfermedades() {
        return repository.findAll();
    }

    public ESAD_enfermedad getEnfermedadById(Integer enfermedadId) {
        return repository.findById(enfermedadId)
                .orElseThrow(() -> new EntityNotFoundException("Enfermedad no encontrado con ID: " + enfermedadId));
    }

    //  Eliminar una enfermedad por ID
    public String deleteEnfermedad(Integer id) {  repository.deleteById(id); return "Enfermedad eliminada: " + id; }

    // Create - Crear una nueva enfermedad
    public ESAD_enfermedad saveEnfermedad(ESAD_enfermedad enfermedad) { return repository.save(enfermedad);}

    //  Actualizar una enfermedad existente
    public ESAD_enfermedad updateEnfermedad(ESAD_enfermedad enfermedad) {
        ESAD_enfermedad existingEnfermedad = repository.findById(enfermedad.getId()).orElse(null);
        if (existingEnfermedad != null) {
            existingEnfermedad.setEnfermedad(enfermedad.getEnfermedad());
            return repository.save(existingEnfermedad);
        }
        return null;
    }
}
