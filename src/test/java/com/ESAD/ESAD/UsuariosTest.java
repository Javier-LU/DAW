package com.ESAD.ESAD;

import com.ESAD.ESAD.config.SecurityConfig;
import com.ESAD.ESAD.controllers.UsuarioController;
import com.ESAD.ESAD.entity.ESAD_usuarios;
import com.ESAD.ESAD.service.*;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;

import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(UsuarioController.class)
public class UsuariosTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UsuarioService service; // Mock del servicio que será inyectado en el controlador

    @MockBean
    private EquipoService equipoService;
    @MockBean
    private EnfermedadService enfermedadService;
    @MockBean
    private CSService csService;
    @MockBean
    private SalidaService salidaService;

    @Test
    public void testAllUsuarios() throws Exception {
        // Preparar datos de prueba
        List<ESAD_usuarios> usuarios = new ArrayList<>();
        usuarios.add(new ESAD_usuarios()); // Añadir usuarios de prueba a la lista

        // Configurar el comportamiento del servicio simulado (mock)
        Mockito.when(service.getAllUsuarios()).thenReturn(usuarios);

        // Realizar la solicitud y verificar el resultado
        mockMvc.perform(get("/all"))
                .andExpect(status().isOk()) // Verificar que la respuesta tiene un estado HTTP 200
                .andExpect(jsonPath("$", hasSize(1))) // Verificar que el cuerpo de respuesta es una lista con un tamaño de 1
                .andExpect(content().contentType(MediaType.APPLICATION_JSON)); // Verificar el tipo de contenido de la respuesta

        // Verificar que el servicio fue llamado
        Mockito.verify(service).getAllUsuarios();
    }
}
