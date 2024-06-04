package com.ESAD.ESAD.service;

import com.ESAD.ESAD.entity.ESAD_listaProfesiones;
import com.ESAD.ESAD.entity.ESAD_listaTareas;
import com.ESAD.ESAD.entity.ESAD_listaSalida;
import com.ESAD.ESAD.repository.ListaSalidaRepository;
import com.ESAD.ESAD.repository.ListaProfesiones;
import com.ESAD.ESAD.repository.ListaTareaRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class VariosListaService {

    @Autowired
    private ListaSalidaRepository repositorySalida;

    @Autowired
    private ListaProfesiones repositoryProfesiones;

    @Autowired
    private ListaTareaRepository repositoryTareas;

    //  Listar todas
    public List<ESAD_listaProfesiones> getAllProfesiones() {
        return repositoryProfesiones.findAll();
    }

    //  Listar todas
    public List<ESAD_listaTareas> getAllTareas() {
        return repositoryTareas.findAll();
    }

    //  Listar todas
    public List<ESAD_listaSalida> getAllSalida() {
        return repositorySalida.findAll();
    }
}
