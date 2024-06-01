package com.ESAD.ESAD.controllers;

import com.ESAD.ESAD.controllers.request.CreateUsuarioDTO;
import com.ESAD.ESAD.entity.ESAD_usuarios;
import com.ESAD.ESAD.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private EquipoService equipoService;
    @Autowired
    private EnfermedadService enfermedadService;
    @Autowired
    private CSService csService;

    @Autowired
    private SalidaService salidaService;

    @Autowired
    private UsuarioService service;

    // Listar todas
    @GetMapping("/all")
    public List<ESAD_usuarios> allCS() {
        return service.getAllUsuarios();
    }

    // Buscar por CS por ID
    @GetMapping("/getCS/{id}")
    public List<ESAD_usuarios> getCentroSalud(@PathVariable int id){
        return service.getCentroSalud(id);
    }

    // Buscar por enfermedad por ID
    @GetMapping("/getEnfermedad/{id}")
    public List<ESAD_usuarios> getEnfermedad(@PathVariable int id){
        return service.getEnfermedad(id);
    }

    // Buscar por equipo por ID
    @GetMapping("/getEquipo/{id}")
    public List<ESAD_usuarios> getEquipo(@PathVariable int id){
        return service.getEquipo(id);
    }

    // Buscar por ID
    @GetMapping("/getUsuarioId/{id}")
    public Optional<ESAD_usuarios> getUsuario(@PathVariable int id){
        return service.getUsuarioId(id);
    }

    // Buscar por DNI
    @GetMapping("/getDni/{dni}")
    public List<ESAD_usuarios> getDni(@PathVariable String dni){
        return service.getDni(dni);
    }

    // Buscar por nombre y apellidos
    @GetMapping("/BuscarTresValores/")
    public List<ESAD_usuarios> buscarTresValores(
            @RequestParam(value = "nombre", required = false) String nombre,
            @RequestParam(value = "primerApellido", required = false) String primerApellido,
            @RequestParam(value = "segundoApellido", required = false) String segundoApellido) {

        return service.getBuscarTresValores(nombre, primerApellido, segundoApellido);
    }

    // --------------------------------------------------------------------

    // Crear una usuario por ID
    @PostMapping("/createUsuario")
    public void createUsuario(@RequestBody CreateUsuarioDTO usuarioDTO){  service.createUsuario(usuarioDTO);;}

    // Actualizar una usuario por ID
    @PutMapping("/update/{id}")
    public ESAD_usuarios updateUsuario(@PathVariable Integer id, @RequestBody CreateUsuarioDTO usuario) {
        usuario.setId(id);
        return service.updateUsuario(usuario);
    }

    // Eliminar una usuario por ID
    @DeleteMapping("/delete/{id}")
    public String deleteUsuario(@PathVariable int id) {return service.deleteUsuarios(id); }

    // Estadisticas --------------------------------------------------------------------------

    @GetMapping("/usuariosPorEnfermedad")
    public List<Object[]> obtenerUsuariosPorEnfermedad() {
        return service.obtenerTotalUsuariosPorEnfermedad();
    }

    @GetMapping("/usuariosPorEquipo")
    public List<Object[]> obtenerUsuariosPorEquipo() {
        return service.obtenerTotalUsuariosPorEquipo();
    }

    @GetMapping("/usuariosPorRangoEdad")
    public List<Object[]> obtenerUsuariosPorRangoEdad() {
        return service.obtenerTotalUsuariosPorRangoEdad();
    }

    @GetMapping("/usuariosPorCentroSalud")
    public List<Object[]> obtenerUsuariosPorCentroSalud() {
        return service.obtenerTotalUsuariosPorCentroSalud();
    }

    @GetMapping("/usuariosSinTipoSalida")
    public int obtenerUsuariosSinTipoSalida() {
        return service.obtenerTotalUsuariosSinTipoSalida();
    }

}
