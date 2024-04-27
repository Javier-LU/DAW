package com.ESAD.ESAD.service;

import com.ESAD.ESAD.controllers.request.CreateUsuarioDTO;
import com.ESAD.ESAD.entity.ESAD_CS;
import com.ESAD.ESAD.entity.ESAD_usuarios;
import com.ESAD.ESAD.repository.CSRepository;
import com.ESAD.ESAD.repository.UsuariosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private EquipoService equipoService;
    @Autowired
    private EnfermedadService enfermedadService;
    @Autowired
    private CSService csService;

    @Autowired
    private SalidaService salidaService;

    @Autowired
    private UsuariosRepository repository;

    //  Buscar todas
    public List<ESAD_usuarios> getAllUsuarios() {
        return repository.findAll();
    }

    // Buscar por CS Id
    public List<ESAD_usuarios> getCentroSalud(int id){return repository.findByCentroSaludId(id);}

    // Buscar por enfermedad Id
    public List<ESAD_usuarios> getEnfermedad(int id){return repository.findByEnfermedadId(id);}

    // Buscar por equipo Id
    public List<ESAD_usuarios> getEquipo(int id){return repository.findByEquipoId(id);}

    // Buscar por usuaario Id
    public Optional<ESAD_usuarios> getUsuarioId(int id){return repository.findById(id);}

    // Buscar por nombre y apellidos
    public List<ESAD_usuarios> getBuscarTresValores(String nombre, String primerApellido, String segundoApellido){
        return repository.buscarPorNombreYApellidos(nombre, primerApellido, segundoApellido);
    }

    // Buscar por DNI
    public List<ESAD_usuarios> getDni(String id){ return repository.findByDni(id);}

    //------------------------------------------------------------------

    // Crear
    public ESAD_usuarios createUsuario(@RequestBody CreateUsuarioDTO usuarioDTO) {

        ESAD_usuarios usuario = new ESAD_usuarios();
        // Update user properties from DTO (considering potential null values)
        usuario.setEnPrograma(usuarioDTO.getEnPrograma());
        usuario.setIngreso(usuarioDTO.getIngreso());
        usuario.setNombre(usuarioDTO.getNombre());
        usuario.setPrimerApellido(usuarioDTO.getPrimerApellido());
        usuario.setSegundoApellido(usuarioDTO.getSegundoApellido());
        usuario.setDni(usuarioDTO.getDni());
        usuario.setDireccionResidencia(usuarioDTO.getDireccionResidencia());
        usuario.setTelefonoResidencia(usuarioDTO.getTelefonoResidencia());
        usuario.setFechaNacimiento(usuarioDTO.getFechaNacimiento());
        usuario.setEdad(usuarioDTO.getEdad());
        usuario.setLugarSalida(usuarioDTO.getLugarSalida());
        usuario.setLugarFecha(usuarioDTO.getLugarFecha());
        usuario.setHistorico(usuarioDTO.getHistorico());

        // Assign relationships using services (assuming methods exist)
        if (usuarioDTO.getEquipoId() != null) {
            usuario.setEquipo(equipoService.getEquipoById(usuarioDTO.getEquipoId()));
        }
        if (usuarioDTO.getEnfermedadId() != null) {
            usuario.setEnfermedad(enfermedadService.getEnfermedadById(usuarioDTO.getEnfermedadId()));
        }
        if (usuarioDTO.getTipoSalidaId() != null) {
            usuario.setTipoSalida(salidaService.getSalidaById(usuarioDTO.getTipoSalidaId()));
        }
        if (usuarioDTO.getCentroSaludId() != null) {
            usuario.setCentroSalud(csService.getCSById(usuarioDTO.getCentroSaludId()));
        }

        // Save the updated user and return the updated entity
        return repository.save(usuario);
    }

    // update
    public ESAD_usuarios updateUsuario(@RequestBody CreateUsuarioDTO usuarioDTO) {

        if (usuarioDTO.getId() == null) {
            throw new IllegalArgumentException("El ID no puede ser null");        }

        ESAD_usuarios existingUser = repository.findById(usuarioDTO.getId()).orElse(null);

        // Update user properties from DTO (considering potential null values)
        existingUser.setEnPrograma(usuarioDTO.getEnPrograma());
        existingUser.setIngreso(usuarioDTO.getIngreso());
        existingUser.setNombre(usuarioDTO.getNombre());
        existingUser.setPrimerApellido(usuarioDTO.getPrimerApellido());
        existingUser.setSegundoApellido(usuarioDTO.getSegundoApellido());
        existingUser.setDni(usuarioDTO.getDni());
        existingUser.setDireccionResidencia(usuarioDTO.getDireccionResidencia());
        existingUser.setTelefonoResidencia(usuarioDTO.getTelefonoResidencia());
        existingUser.setFechaNacimiento(usuarioDTO.getFechaNacimiento());
        existingUser.setEdad(usuarioDTO.getEdad());
        existingUser.setLugarSalida(usuarioDTO.getLugarSalida());
        existingUser.setLugarFecha(usuarioDTO.getLugarFecha());
        existingUser.setHistorico(usuarioDTO.getHistorico());

        // Assign relationships using services (assuming methods exist)
        if (usuarioDTO.getEquipoId() != null) {
            existingUser.setEquipo(equipoService.getEquipoById(usuarioDTO.getEquipoId()));
        }
        if (usuarioDTO.getEnfermedadId() != null) {
            existingUser.setEnfermedad(enfermedadService.getEnfermedadById(usuarioDTO.getEnfermedadId()));
        }
        if (usuarioDTO.getTipoSalidaId() != null) {
            existingUser.setTipoSalida(salidaService.getSalidaById(usuarioDTO.getTipoSalidaId()));
        }
        if (usuarioDTO.getCentroSaludId() != null) {
            existingUser.setCentroSalud(csService.getCSById(usuarioDTO.getCentroSaludId()));
        }

        // Save the updated user and return the updated entity
        return repository.save(existingUser);
    }

    //  Eliminar
    public String deleteUsuarios(Integer id) {  repository.deleteById(id); return "Usuario eliminado: " + id; }

    // -------------------------------------------------------------------

    public List<Object[]> obtenerTotalUsuariosPorEnfermedad() {
        return repository.countTotalUsuariosPorEnfermedad();
    }

    public List<Object[]> obtenerTotalUsuariosPorEquipo() {
        return repository.countTotalUsuariosPorEquipo();
    }

    public List<Object[]> obtenerTotalUsuariosPorRangoEdad() {
        return repository.countTotalUsuariosPorRangoEdad();
    }

    public List<Object[]> obtenerTotalUsuariosPorCentroSalud() {
        return repository.countTotalUsuariosPorCentroSalud();
    }

    public int obtenerTotalUsuariosSinTipoSalida() {
        return repository.countUsuariosSinTipoSalida();
    }

}
