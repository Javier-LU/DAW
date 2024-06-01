package com.ESAD.ESAD.controllers;

import com.ESAD.ESAD.controllers.request.CreateProfesionalesDTO;
import com.ESAD.ESAD.entity.ESAD_equipo;
import com.ESAD.ESAD.entity.ESAD_profesionales;
import com.ESAD.ESAD.entity.ESAD_profesionalesRoleEntity;
import com.ESAD.ESAD.entity.enu.Erole;
import com.ESAD.ESAD.repository.ProfesionalesRepository;
import com.ESAD.ESAD.service.ProfesionalesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.validation.Valid;
import java.util.Set;

@RestController
@RequestMapping("/profesionales")
public class ProfesionalesController{

    @Autowired
    private ProfesionalesService profesionalesService;



    // Actualizar una CS existente
    @PutMapping("/update/{id}")
    public ESAD_profesionales updateProfesional(@PathVariable Integer id, @RequestBody CreateProfesionalesDTO  profesionales) {
        profesionales.setId(id);
        return profesionalesService.updateProfesional(profesionales);
    }


    // Crear
    @PostMapping("/createProfesional")
    public ResponseEntity<ESAD_profesionales> createProfesional(@RequestBody CreateProfesionalesDTO createProfesionalesDTO) {

        // Encriptar la contraseña utilizando BCryptPasswordEncoder
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String contrasenaEncriptada = encoder.encode(createProfesionalesDTO.getPassword());

        ESAD_profesionales newProfesional = ESAD_profesionales.builder()
                .nombre(createProfesionalesDTO.getNombre())
                .primerApellido(createProfesionalesDTO.getPrimerApellido())
                .segundoApellido(createProfesionalesDTO.getSegundoApellido())
                .dni(createProfesionalesDTO.getDni())
                .password(contrasenaEncriptada)
                .email(createProfesionalesDTO.getEmail())
                .cualificacion(createProfesionalesDTO.getCualificacion())

                .isEnabled(createProfesionalesDTO.isEnabled())
                .isAccountNoExpired(createProfesionalesDTO.isAccountNoExpired())
                .isAccountNoLocked(createProfesionalesDTO.isAccountNoLocked())
                .isCredentialNoExpired(createProfesionalesDTO.isCredentialsNoExpired())
                .build();

        // Roles y más propiedades podrían ser configuradas aquí
        ESAD_profesionales savedProfesional = profesionalesService.saveProfesional(newProfesional, createProfesionalesDTO.getRoles());
        return ResponseEntity.ok(savedProfesional);
    }

    // Buscar por email
    @GetMapping("/email/{email}")
    public ResponseEntity<Optional<ESAD_profesionales>> getProfesionalByEmail(@PathVariable String email) {
        return ResponseEntity.ok(profesionalesService.findProfesionalByEmail(email));
    }

    // Buscar todos
    @GetMapping("/all")
    public ResponseEntity<List<ESAD_profesionales>> getAllProfesionales() {
        return ResponseEntity.ok(profesionalesService.getAllProfesionales());
    }


    // Eliminar una CS por ID
    @DeleteMapping("/delete/{id}")
    public String deleteCS(@PathVariable int id) {return profesionalesService.deleteProfesional(id); }

}
