package com.ESAD.ESAD.component;

import com.ESAD.ESAD.entity.ESAD_enfermedad;
import com.ESAD.ESAD.entity.ESAD_listaTareas;
import com.ESAD.ESAD.entity.enu.EEnfermedad;
import com.ESAD.ESAD.entity.enu.ETarea;
import com.ESAD.ESAD.repository.ListaTareaRepository;
import com.ESAD.ESAD.repository.ProfesionalesRolesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class TareaInitializer {
    @Autowired
    private ListaTareaRepository listaTareaRepository;

    @PostConstruct
    public void initRoles() {
        for (ETarea listaTarea : ETarea.values()) {
            listaTareaRepository.findByListaTarea(listaTarea).orElseGet(() -> {
                ESAD_listaTareas nuevaTarea = new ESAD_listaTareas();
                nuevaTarea.setListaTarea(listaTarea);
                return listaTareaRepository.save(nuevaTarea);
            });
        }
    }}
