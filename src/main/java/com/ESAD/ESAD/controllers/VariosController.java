package com.ESAD.ESAD.controllers;

import com.ESAD.ESAD.entity.ESAD_enfermedad;
import com.ESAD.ESAD.entity.ESAD_listaProfesiones;
import com.ESAD.ESAD.entity.ESAD_listaTareas;
import com.ESAD.ESAD.entity.ESAD_listaSalida;

import com.ESAD.ESAD.repository.EnfermedadRepository;
import com.ESAD.ESAD.service.EnfermedadService;
import com.ESAD.ESAD.service.VariosListaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class VariosController {

    @Autowired
    private VariosListaService service;

    // Listar todas
    @GetMapping("/allProfesiones")
    public List<ESAD_listaProfesiones> retrieveProfesiones() {
        return service.getAllProfesiones();
    }

    @GetMapping("/allTareas")
    public List<ESAD_listaTareas> retrieveTareas() {
        return service.getAllTareas();
    }

    @GetMapping("/allSalida")
    public List<ESAD_listaSalida> retrieveSalida() {
        return service.getAllSalida();
    }


}
