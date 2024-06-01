package com.ESAD.ESAD.service;

import com.ESAD.ESAD.controllers.request.CreateProfesionalesDTO;
import com.ESAD.ESAD.controllers.request.CreateUsuarioDTO;
import com.ESAD.ESAD.entity.ESAD_equipo;
import com.ESAD.ESAD.entity.ESAD_profesionales;
import com.ESAD.ESAD.entity.ESAD_profesionalesRoleEntity;
import com.ESAD.ESAD.entity.ESAD_usuarios;
import com.ESAD.ESAD.entity.enu.Erole;
import com.ESAD.ESAD.repository.EquipoRepository;
import com.ESAD.ESAD.repository.ProfesionalesRepository;
import com.ESAD.ESAD.repository.ProfesionalesRolesRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ProfesionalesService {

    @Autowired
    private ProfesionalesRepository profesionalesRepository;

    @Autowired
    private ProfesionalesRolesRepository profesionalesRolesRepository;

    @Autowired
    private EquipoRepository equipoRepository;

    // update
    public ESAD_profesionales updateProfesional(@RequestBody CreateProfesionalesDTO createProfesionalesDTO) {

        // Verifica que el ID no sea nulo
        if (createProfesionalesDTO.getId() == null) {
            throw new IllegalArgumentException("El ID no puede ser null");
        }

        // Encuentra el profesional ID
        ESAD_profesionales existingProfesional = profesionalesRepository.findById(createProfesionalesDTO.getId())
                .orElseThrow(() -> new EntityNotFoundException("Profesional no encontrado con ID: " + createProfesionalesDTO.getId()));

        // Actualiza el DTO
        existingProfesional.setNombre(createProfesionalesDTO.getNombre());
        existingProfesional.setPrimerApellido(createProfesionalesDTO.getPrimerApellido());
        existingProfesional.setSegundoApellido(createProfesionalesDTO.getSegundoApellido());
        existingProfesional.setDni(createProfesionalesDTO.getDni());
        existingProfesional.setEmail(createProfesionalesDTO.getEmail());
        existingProfesional.setCualificacion(createProfesionalesDTO.getCualificacion());
        existingProfesional.setEnabled(createProfesionalesDTO.isEnabled());
        existingProfesional.setAccountNoExpired(createProfesionalesDTO.isAccountNoExpired());
        existingProfesional.setAccountNoLocked(createProfesionalesDTO.isAccountNoLocked());
        existingProfesional.setCredentialNoExpired(createProfesionalesDTO.isCredentialsNoExpired());

        // Actualizar la contraseña
        String password = createProfesionalesDTO.getPassword();
        if (password != null) {
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            String contrasenaEncriptada = encoder.encode(password);
            existingProfesional.setPassword(contrasenaEncriptada);
        }

        // Actualiza el rol del profesional
        Set<Erole> newRoles = createProfesionalesDTO.getRoles(); // Assuming roles are included in the DTO
        if (newRoles != null && !newRoles.isEmpty()) {
            Set<ESAD_profesionalesRoleEntity> updatedRoles = new HashSet<>();
            for (Erole role : newRoles) {
                ESAD_profesionalesRoleEntity roleEntity = profesionalesRolesRepository.findByRol(role)
                        .orElseThrow(() -> new RuntimeException("Role not found: " + role));
                updatedRoles.add(roleEntity);
            }
            existingProfesional.setRoles(updatedRoles);
        }
        return profesionalesRepository.save(existingProfesional);
    }

    // Crear
    public ESAD_profesionales saveProfesional(ESAD_profesionales profesional, Set<Erole> roleNames) {
        Set<ESAD_profesionalesRoleEntity> roles = new HashSet<>();
        for (Erole role : roleNames) {
            ESAD_profesionalesRoleEntity roleEntity = profesionalesRolesRepository.findByRol(role)
                    .orElseThrow(() -> new RuntimeException("Role not found: " + role));
            roles.add(roleEntity);
        }
        profesional.setRoles(roles);
        return profesionalesRepository.save(profesional);
    }

    // BUscar por email
    public Optional<ESAD_profesionales> findProfesionalByEmail(String email) {
        return profesionalesRepository.findByEmail(email);
    }

    // Encontrar todos
    public List<ESAD_profesionales> getAllProfesionales() {
        return profesionalesRepository.findAll();
    }

    //  Eliminar
    @Transactional
    public String deleteProfesional(int id) {
        // Llamadas individuales para cada tipo de profesional
        equipoRepository.unsetMedicoInEquipo(id);
        equipoRepository.unsetEnfermeroInEquipo(id);
        equipoRepository.unsetAuxiliarInEquipo(id);
        equipoRepository.unsetAdministrativoInEquipo(id);

        // Eliminar el profesional por ID
        profesionalesRepository.deleteById(id);
        return "Centro de Salud eliminado: " + id; }
















}
