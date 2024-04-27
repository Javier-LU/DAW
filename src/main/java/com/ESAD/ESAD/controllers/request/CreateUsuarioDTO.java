package com.ESAD.ESAD.controllers.request;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.*;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateUsuarioDTO {

    private Boolean enPrograma;

    @Id
    private Integer id;

    @NotNull(message = "La fecha de ingreso no puede ser nula")
    @PastOrPresent(message = "La fecha de ingreso debe ser hoy o una fecha pasada")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date ingreso;

    private Integer equipoId; // Solo el ID para evitar acoplar con la entidad

    @NotBlank(message = "El nombre no puede estar vacío")
    @Size(max = 100, message = "El nombre debe tener un máximo de 100 caracteres")
    private String nombre;

    @NotBlank(message = "El primer apellido no puede estar vacío")
    @Size(max = 100, message = "El primer apellido debe tener un máximo de 100 caracteres")
    private String primerApellido;

    @Size(max = 100, message = "El segundo apellido debe tener un máximo de 100 caracteres")
    private String segundoApellido;

    @NotBlank(message = "El DNI no puede estar vacío")
    @Pattern(regexp = "[0-9]{8}[A-Z]", message = "El formato del DNI no es válido")
    private String dni;

    @NotBlank(message = "La residencia no puede estar vacía")
    @Size(max = 150, message = "La residencia debe tener un máximo de 150 caracteres")
    private String direccionResidencia;

    @NotBlank(message = "El número de teléfono no puede estar vacío")
    @Pattern(regexp = "\\d{10}", message = "El número de teléfono debe ser de 10 dígitos")
    private String telefonoResidencia;

    @NotNull(message = "La fecha de nacimiento no puede ser nula")
    @Past(message = "La fecha de nacimiento debe ser una fecha pasada")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date fechaNacimiento;

    @NotNull(message = "La edad no puede ser nula")
    @Min(value = 0, message = "La edad no puede ser menor que 0")
    private Integer edad;

    private Integer enfermedadId;
    private Integer tipoSalidaId;
    @Size(max = 150, message = "El lugar de salida debe tener un máximo de 150 caracteres")
    private String lugarSalida;

    @PastOrPresent(message = "La fecha de la salida debe ser hoy o una fecha pasada")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date lugarFecha;

    private Integer centroSaludId;
    private Boolean historico;




}
