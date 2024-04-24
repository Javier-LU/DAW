package com.ESAD.ESAD.controllers.request;

import com.ESAD.ESAD.entity.enu.Erole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateProfesionalesDTO {

    @NotBlank(message = "El nombre no puede estar vacío")
    @Size(max = 50, message = "El nombre no puede tener más de 50 caracteres")
    private String nombre;

    @NotBlank(message = "El primer apellido no puede estar vacío")
    @Size(max = 50, message = "El primer apellido no puede tener más de 50 caracteres")
    private String primerApellido;

    @NotBlank(message = "El segundo apellido no puede estar vacío")
    @Size(max = 50, message = "El segundo apellido no puede tener más de 50 caracteres")
    private String segundoApellido;

    @NotBlank(message = "El DNI no puede estar vacío")
    @Pattern(regexp = "^[0-9]{8}[A-Za-z]$", message = "El formato del DNI no es válido")
    private String dni;

    @NotBlank(message = "La contraseña no puede estar vacía")
    @Size(min = 6, max = 20, message = "La contraseña debe tener entre 6 y 20 caracteres")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,20}$", message = "La contraseña debe contener al menos una letra mayúscula, una minúscula y un número")
    private String password;

    @Email(message = "El correo electrónico no es válido")
    private String email;

    @NotBlank(message = "La cualificación no puede estar vacía")
    @Pattern(regexp = "^(enfermero|medico|administrativo|enfermera|medica|administrativa|auxiliar de clinica)$",
            message = "La cualificación debe ser 'enfermero/a', 'medico/a', 'administrativo/a' o 'auxiliar de clinica'")
    private String cualificacion;

    @NotBlank
    private Set<Erole> roles;

    // En este caso no incluimos roles porque normalmente se asignan después de crear el usuario o a través de un proceso diferente
}


