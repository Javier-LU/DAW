package com.ESAD.ESAD.service;

import com.ESAD.ESAD.entity.ESAD_CS;
import com.ESAD.ESAD.entity.ESAD_enfermedad;
import com.ESAD.ESAD.entity.ESAD_usuarios;
import com.ESAD.ESAD.repository.CSRepository;
import com.ESAD.ESAD.repository.UsuariosRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CSService {

    @Autowired
    private UsuariosRepository repositoryUsuario;


    @Autowired
    private CSRepository repository;

    //  Listar todas
    public List<ESAD_CS> getAllCS() {
        return repository.findAll();
    }

    public ESAD_CS getCSById(Integer CSId) {
        return repository.findById(CSId)
                .orElseThrow(() -> new EntityNotFoundException("Enfermedad no encontrado con ID: " + CSId));
    }

    //  Eliminar
    public String deleteCS(Integer id) {

        List<ESAD_usuarios> usuarios = repositoryUsuario.findByCentroSaludId(id);

        for (ESAD_usuarios usuario : usuarios) {
            usuario.setCentroSalud(null);
        }

        // Save the updated usuarios
        repositoryUsuario.saveAll(usuarios);

        repository.deleteById(id); return "Centro de Salud eliminado: " + id; }

    // Create
    public ESAD_CS saveCS(ESAD_CS CS) { return repository.save(CS);}

    // Actualizar 
    public ESAD_CS updateCS(ESAD_CS cs) {
        ESAD_CS existingCS = repository.findById(cs.getId()).orElse(null);
        if (existingCS != null) {
            existingCS.setCs(cs.getCs());
            existingCS.setCalle(cs.getCalle());
            existingCS.setTelefono(cs.getTelefono());
            return repository.save(existingCS);
        }
        return null;
    }
}
