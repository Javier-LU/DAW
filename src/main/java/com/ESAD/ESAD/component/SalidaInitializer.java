package com.ESAD.ESAD.component;

import com.ESAD.ESAD.entity.ESAD_enfermedad;
import com.ESAD.ESAD.entity.ESAD_listaSalida;
import com.ESAD.ESAD.entity.enu.EEnfermedad;
import com.ESAD.ESAD.entity.enu.ESalida;
import com.ESAD.ESAD.repository.ListaSalidaRepository;
import com.ESAD.ESAD.repository.ProfesionalesRolesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class SalidaInitializer {
    @Autowired
    private ListaSalidaRepository listaSalidaRepository;

    @PostConstruct
    public void initRoles() {
        for (ESalida salida : ESalida.values()) {
            listaSalidaRepository.findByListaSalida(salida).orElseGet(() -> {
                ESAD_listaSalida nuevaSalida = new ESAD_listaSalida();
                nuevaSalida.setListaSalida(salida);
                return listaSalidaRepository.save(nuevaSalida);
            });
        }
    }}