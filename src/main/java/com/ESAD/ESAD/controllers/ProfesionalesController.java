package com.ESAD.ESAD.controllers;

import com.ESAD.ESAD.controllers.request.CreateProfesionalesDTO;
import com.ESAD.ESAD.entity.ESAD_profesionales;
import com.ESAD.ESAD.entity.ESAD_profesionalesRoleEntity;
import com.ESAD.ESAD.entity.enu.Erole;
import com.ESAD.ESAD.repository.ProfesionalesRepository;
import com.ESAD.ESAD.service.ProfesionalesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.validation.Valid;
import java.util.Set;

@RestController
public class ProfesionalesController{

    @Autowired
    private ProfesionalesService profesionalesService;






    @PostMapping("/createProfesional")
    public ResponseEntity<ESAD_profesionales> createProfesional(@RequestBody CreateProfesionalesDTO createProfesionalesDTO) {
        ESAD_profesionales newProfesional = ESAD_profesionales.builder()
                .nombre(createProfesionalesDTO.getNombre())
                .primerApellido(createProfesionalesDTO.getPrimerApellido())
                .segundoApellido(createProfesionalesDTO.getSegundoApellido())
                .dni(createProfesionalesDTO.getDni())
                .password(createProfesionalesDTO.getPassword())
                .email(createProfesionalesDTO.getEmail())
                .cualificacion(createProfesionalesDTO.getCualificacion())
                .build();

        // Roles y más propiedades podrían ser configuradas aquí
        ESAD_profesionales savedProfesional = profesionalesService.saveProfesional(newProfesional, createProfesionalesDTO.getRoles());
        return ResponseEntity.ok(savedProfesional);
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Optional<ESAD_profesionales>> getProfesionalByEmail(@PathVariable String email) {
        return ResponseEntity.ok(profesionalesService.findProfesionalByEmail(email));
    }

    @GetMapping
    public ResponseEntity<List<ESAD_profesionales>> getAllProfesionales() {
        return ResponseEntity.ok(profesionalesService.getAllProfesionales());
    }


}