package com.ESAD.ESAD.controllers;

import com.ESAD.ESAD.entity.ESAD_enfermedad;
import com.ESAD.ESAD.repository.EnfermedadRepository;
import com.ESAD.ESAD.service.EnfermedadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class EnfermedadController {

    @Autowired
    private EnfermedadService service;

    // Listar todas
    @GetMapping("/allEnfermedad")
    public List<ESAD_enfermedad> retrieveEnfermedades() {
        return service.getAllEnfermedades();
    }

    // Eliminar una enfermedad por ID
    //  @DeleteMapping("/DeleteEnfermedad/{id}")
    //  public String deleteEnfermedad(@PathVariable int id) {return service.deleteEnfermedad(id); }



    // Crear una nueva enfermedad
    //  @PostMapping("/saveEnfermedad")
    //  public ESAD_enfermedad createEnfermedad(@RequestBody ESAD_enfermedad enfermedad) {
    //     return service.saveEnfermedad(enfermedad);
    // }
    // Actualizar una enfermedad existente
    // @PutMapping("/updateEnfermedad")
    //  public ESAD_enfermedad updateEnfermedad(@RequestBody ESAD_enfermedad enfermedad) {
    //     return service.updateEnfermedad(enfermedad);
    //  }
}
