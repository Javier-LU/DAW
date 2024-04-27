package com.ESAD.ESAD.controllers;

import com.ESAD.ESAD.entity.ESAD_CS;
import com.ESAD.ESAD.entity.ESAD_tareas;
import com.ESAD.ESAD.service.CSService;
import com.ESAD.ESAD.service.TareasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tareas")
public class TareasController {

    @Autowired
    private TareasService service;

    // Listar todas
    @GetMapping("/all")
    public List<ESAD_tareas> retrieveCS() {
        return service.getAllTareas();
    }

    // Eliminar una CS por ID
    @DeleteMapping("/delete/{id}")
    public String deleteCS(@PathVariable int id) {return service.deleteTareas(id); }

    // Crear una nueva CS
    @PostMapping("/save")
    public ESAD_tareas createEnfermedad(@RequestBody ESAD_tareas terea) {
        return service.saveTareas(terea);
    }

    // Actualizar una CS existente
    @PutMapping("/update/{id}")
    public ESAD_tareas updateEnfermedad(@PathVariable Integer id,@RequestBody ESAD_tareas tera) {
        tera.setId(id);
        return service.updateTareas(tera);
    }


}
