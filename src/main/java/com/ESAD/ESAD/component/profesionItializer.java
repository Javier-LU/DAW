package com.ESAD.ESAD.component;

import com.ESAD.ESAD.entity.ESAD_listaProfesiones;
import com.ESAD.ESAD.entity.ESAD_profesionalesRoleEntity;
import com.ESAD.ESAD.entity.enu.Erole;
import com.ESAD.ESAD.repository.ListaProfesionesRepository;
import com.ESAD.ESAD.repository.ProfesionalesRolesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.ESAD.ESAD.entity.enu.EEprofesion;

import javax.annotation.PostConstruct;

@Component
public class profesionItializer {

    @Autowired
    private ListaProfesionesRepository listaProfesionesRepository;

    @PostConstruct
    public void initRoles() {
        for (EEprofesion profesion : EEprofesion.values()) {
            listaProfesionesRepository.findByListaPorfesion(profesion).orElseGet(() -> {
                ESAD_listaProfesiones newRole = new ESAD_listaProfesiones();
                newRole.setListaPorfesion(profesion);
                return listaProfesionesRepository.save(newRole);
            });
        }
    }
}
