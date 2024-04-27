package com.ESAD.ESAD.service;

import com.ESAD.ESAD.entity.ESAD_profesionales;
import com.ESAD.ESAD.entity.ESAD_profesionalesRoleEntity;
import com.ESAD.ESAD.entity.enu.Erole;
import com.ESAD.ESAD.repository.ProfesionalesRepository;
import com.ESAD.ESAD.repository.ProfesionalesRolesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ProfesionalesService {

    @Autowired
    private ProfesionalesRepository profesionalesRepository;

    @Autowired
    private ProfesionalesRolesRepository profesionalesRolesRepository;




    public ESAD_profesionales saveProfesional(ESAD_profesionales profesional, Set<Erole> roleNames) {
        Set<ESAD_profesionalesRoleEntity> roles = new HashSet<>();
        for (Erole role : roleNames) {
            ESAD_profesionalesRoleEntity roleEntity = profesionalesRolesRepository.findByRol(role)
                    .orElseThrow(() -> new RuntimeException("Role not found: " + role));
            roles.add(roleEntity);
        }
        profesional.setRoles(roles);
        return profesionalesRepository.save(profesional);
    }

    public Optional<ESAD_profesionales> findProfesionalByEmail(String email) {
        return profesionalesRepository.findByEmail(email);
    }

    public List<ESAD_profesionales> getAllProfesionales() {
        return profesionalesRepository.findAll();
    }





}
