package com.ESAD.ESAD.controllers;

import com.ESAD.ESAD.entity.ESAD_CS;
import com.ESAD.ESAD.entity.ESAD_equipo;
import com.ESAD.ESAD.service.CSService;
import com.ESAD.ESAD.service.EquipoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/equipo")
public class EquipoController {

    @Autowired
    private EquipoService service;


    // Listar todas
    @GetMapping("/all")
    public List<ESAD_equipo> retrieveCS() {
        return service.getAllEquipo();
    }

    // Eliminar una CS por ID
    @DeleteMapping("/delete/{id}")
    public String deleteCS(@PathVariable int id) {return service.deleteEquipo(id); }



    // Crear una nueva CS
    @PostMapping("/save")
    public ESAD_equipo createEnfermedad(@RequestBody ESAD_equipo equipo) {
        return service.saveEquipo(equipo);
    }

    // Actualizar una CS existente
    @PutMapping("/update/{id}")
    public ESAD_equipo updateEnfermedad(@PathVariable Integer id,@RequestBody ESAD_equipo equipo) {
        equipo.setId(id);
        return service.updateEquipo(equipo);
    }

}
