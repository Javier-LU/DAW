package com.ESAD.ESAD.entity;

import jakarta.persistence.*;
import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "ESAD_profesionales")
public class ESAD_profesionales {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank(message = "El nombre no puede estar vacío")
    @Size(max = 50, message = "El nombre no puede tener más de 50 caracteres")
    @Column(name = "nombre")
    private String nombre;

    @NotBlank(message = "El primer apellido no puede estar vacío")
    @Size(max = 50, message = "El primer apellido no puede tener más de 50 caracteres")
    @Column(name = "primer_apellido")
    private String primerApellido;

    @NotBlank(message = "El segundo apellido no puede estar vacío")
    @Size(max = 50, message = "El segundo apellido no puede tener más de 50 caracteres")
    @Column(name = "segundo_apellido")
    private String segundoApellido;

    @NotBlank(message = "El DNI no puede estar vacío")
    @Pattern(regexp = "^[0-9]{8}[A-Za-z]$", message = "El formato del DNI no es válido")
    @Column(name = "dni")
    private String dni;

    @NotBlank(message = "La contraseña no puede estar vacía")
    @Size(min = 6, max = 20, message = "La contraseña debe tener entre 6 y 20 caracteres")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,20}$", message = "La contraseña debe contener al menos una letra mayúscula, una minúscula y un número")
    @Column(name = "password")
    private String password;

    @Email(message = "El correo electrónico no es válido")
    @Column(name = "email")
    private String email;

    @NotBlank(message = "La cualificación no puede estar vacía")
    @Pattern(regexp = "^(enfermero|medico|administrativo|enfermera|medica|administrativa|auxiliar de clinica)$",
            message = "La cualificación debe ser 'enfermero/a', 'medico/a', 'administrativo/a' o 'auxiliar de clinica'")
    @Column(name = "cualificacion")
    private String cualificacion;

    @ManyToMany(fetch = FetchType.EAGER, targetEntity = ESAD_profesionalesRoleEntity.class, cascade = CascadeType.PERSIST)
    @JoinTable(
            name = "user_roles_union", // Esto es el nombre de la tabla de unión
            joinColumns = @JoinColumn(name = "user_id"), // Columna que refiere a la entidad actual
            inverseJoinColumns = @JoinColumn(name = "role_id") // Columna que refiere a la entidad opuesta
    )
    private Set<ESAD_profesionalesRoleEntity> roles;
}
