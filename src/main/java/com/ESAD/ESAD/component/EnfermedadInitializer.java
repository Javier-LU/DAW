package com.ESAD.ESAD.component;

import com.ESAD.ESAD.entity.ESAD_enfermedad;
import com.ESAD.ESAD.entity.ESAD_profesionalesRoleEntity;
import com.ESAD.ESAD.entity.enu.EEnfermedad;
import com.ESAD.ESAD.entity.enu.Erole;
import com.ESAD.ESAD.repository.EnfermedadRepository;
import com.ESAD.ESAD.repository.ProfesionalesRolesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class EnfermedadInitializer {

    @Autowired
    private EnfermedadRepository enfermedadRepository;

    @PostConstruct
    public void initRoles() {
        for (EEnfermedad enfermedad : EEnfermedad.values()) {
            enfermedadRepository.findByEnfermedad(enfermedad).orElseGet(() -> {
                ESAD_enfermedad nuevaEnfermedad = new ESAD_enfermedad();
                nuevaEnfermedad.setEnfermedad(enfermedad);
                return enfermedadRepository.save(nuevaEnfermedad);
            });
        }
    }}
