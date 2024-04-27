package com.ESAD.ESAD.entity;

import jakarta.persistence.*;
import lombok.*;

import javax.validation.constraints.*;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "ESAD_usuarios")
public class ESAD_usuarios {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "en_programa")
    private Boolean enPrograma;

    @NotNull(message = "La fecha de ingreso no puede ser nula")
    @Temporal(TemporalType.DATE)
    @PastOrPresent(message = "La fecha de ingreso debe ser hoy o una fecha anterior")
    @Column(name = "fecha_ingreso")
    private Date ingreso;

    @ManyToOne
    @JoinColumn(name = "equipo_id")
    private ESAD_equipo equipo;

    @NotBlank(message = "El nombre no puede estar vacío")
    @Size(max = 100, message = "El nombre debe tener un máximo de 100 caracteres")
    @Column(name = "nombre")
    private String nombre;

    @NotBlank(message = "El primer apellido no puede estar vacío")
    @Size(max = 100, message = "El primer apellido debe tener un máximo de 100 caracteres")
    @Column(name = "primer_apellido")
    private String primerApellido;

    @Size(max = 100, message = "El segundo apellido debe tener un máximo de 100 caracteres")
    @Column(name = "segundo_apellido")
    private String segundoApellido;

    @NotBlank(message = "El DNI no puede estar vacío")
    @Pattern(regexp = "[0-9]{8}[A-Z]", message = "El formato del DNI no es válido")
    @Column(name = "dni")
    private String dni;

    @Column(name = "residencia")
    private Boolean  residencia;

    @NotBlank(message = "La residencia no puede estar vacía")
    @Size(max = 150, message = "La residencia debe tener un máximo de 150 caracteres")
    @Column(name = "direccion_residencia")
    private String direccionResidencia;

    @NotBlank(message = "El número de teléfono no puede estar vacío")
    @Pattern(regexp = "\\d{10}", message = "El número de teléfono debe ser de 10 dígitos")
    @Column(name = "telefono_residencia")
    private String telefonoResidencia;

    @NotNull(message = "La fecha de nacimiento no puede ser nula")
    @Past(message = "La fecha de nacimiento debe ser una fecha pasada")
    @Temporal(TemporalType.DATE)
    @Column(name = "fecha_nacimiento")
    private Date fechaNacimiento;

    @NotNull(message = "La edad no puede ser nula")
    @Min(value = 0, message = "La edad no puede ser menor que 0")
    @Column(name = "edad")
    private Integer edad;

    @Column(name = "supera_50")
    private Boolean supera50;

    @Column(name = "supera_70")
    private Boolean supera70;

    @Column(name = "supera_90")
    private Boolean supera90;

    @NotNull(message = "El campo de la enfermedad no puede ser nula")
    @ManyToOne
    @JoinColumn(name = "enfermedad_id")
    private ESAD_enfermedad enfermedad;

    @ManyToOne
    @JoinColumn(name = "tipo_salida_id")
    private ESAD_listaSalida tipoSalida;;

    @Size(max = 150, message = "El lugar de salida debe tener un máximo de 150 caracteres")
    @Column(name = "lugar_salida")
    private String lugarSalida;


    @PastOrPresent(message = "La fecha de la salida debe ser hoy o una fecha pasada")
    @Temporal(TemporalType.DATE)
    @Column(name = "lugar_fecha")
    private Date lugarFecha;

    @ManyToOne
    @JoinColumn(name = "centro_salud_id")
    private ESAD_CS centroSalud;

    @Column(name = "historico")
    private Boolean historico;


    /**
     * Método que se ejecuta antes de persistir o actualizar la entidad.
     * Actualiza los campos supera50, supera70 y supera90 en función de la edad.
     */
    @PrePersist
    @PreUpdate
    private void updateAgeThresholds() {
        if (edad != null) {
            supera50 = edad > 50;
            supera70 = edad > 70;
            supera90 = edad > 90;
        }
    }

}
