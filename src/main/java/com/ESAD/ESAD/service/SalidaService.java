package com.ESAD.ESAD.service;

import com.ESAD.ESAD.entity.ESAD_equipo;
import com.ESAD.ESAD.entity.ESAD_listaSalida;
import com.ESAD.ESAD.repository.EquipoRepository;
import com.ESAD.ESAD.repository.ListaSalidaRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SalidaService {

    @Autowired
    private ListaSalidaRepository listaSalidaRepository;

    public ESAD_listaSalida getSalidaById(Integer salidaId) {
        return listaSalidaRepository.findById(salidaId)
                .orElseThrow(() -> new EntityNotFoundException("Equipo no encontrado con ID: " + salidaId));
    }
}
