package com.ESAD.ESAD.controllers.request;

import com.ESAD.ESAD.entity.enu.EEprofesion;
import com.ESAD.ESAD.entity.enu.Erole;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
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

    @Id
    private Integer id;

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

    @Enumerated(EnumType.STRING)
    private EEprofesion cualificacion;

    @NotBlank
    private Set<Erole> roles;

    // Propiedades adicionales para manejo del estado del usuario
    private boolean isEnabled = true;
    private boolean isAccountNoExpired = true;
    private boolean isAccountNoLocked = true;
    private boolean isCredentialsNoExpired = true;

    // En este caso no incluimos roles porque normalmente se asignan después de crear el usuario o a través de un proceso diferente
}


