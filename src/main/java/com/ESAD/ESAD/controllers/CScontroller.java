package com.ESAD.ESAD.controllers;

import com.ESAD.ESAD.controllers.request.CreateUsuarioDTO;
import com.ESAD.ESAD.entity.ESAD_CS;
import com.ESAD.ESAD.entity.ESAD_enfermedad;
import com.ESAD.ESAD.entity.ESAD_usuarios;
import com.ESAD.ESAD.repository.CSRepository;
import com.ESAD.ESAD.repository.EnfermedadRepository;
import com.ESAD.ESAD.repository.EquipoRepository;
import com.ESAD.ESAD.repository.UsuariosRepository;
import com.ESAD.ESAD.service.CSService;
import com.ESAD.ESAD.service.EnfermedadService;
import com.ESAD.ESAD.service.EquipoService;
import com.ESAD.ESAD.service.SalidaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/CS")
public class CScontroller {





    @Autowired
    private CSService service;

    // Listar todas
    @GetMapping("/all")
    public List<ESAD_CS> retrieveCS() {
        return service.getAllCS();
    }

    // Eliminar una CS por ID
    @DeleteMapping("/delete/{id}")
    public String deleteCS(@PathVariable int id) {return service.deleteCS(id); }



    // Crear una nueva CS
    @PostMapping("/save")
    public ESAD_CS createEnfermedad(@RequestBody ESAD_CS cs) {
        return service.saveCS(cs);
    }

    // Actualizar una CS existente
    @PutMapping("/update/{id}")
    public ESAD_CS updateEnfermedad(@PathVariable Integer  id, @RequestBody ESAD_CS cs) {
        cs.setId(id);
        return service.updateCS(cs);
    }


}
