package com.ESAD.ESAD.entity;
import com.ESAD.ESAD.entity.ESAD_profesionales;

import jakarta.persistence.*;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "ESAD_equipo")
public class ESAD_equipo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    private Integer id;

    @NotBlank
    @Size(min = 3, max = 150)
    @Column(name = "equipo")
    private String equipo;

    @ManyToOne
    @JoinColumn(name = "medico_id")
    private ESAD_profesionales medico;

    @ManyToOne
    @JoinColumn(name = "enfermero_id")
    private ESAD_profesionales enfermero;

    @ManyToOne
    @JoinColumn(name = "auxiliar_id")
    private ESAD_profesionales auxiliar;

    @ManyToOne
    @JoinColumn(name = "administrativo_id")
    private ESAD_profesionales administrativo;

    @NotBlank(message = "El primer centro no puede estar vacío")
    @Size(max = 50, message = "El nombre del centro  no puede tener más de 50 caracteres")
    @Column(name = "centro")
    private String centro;

}
