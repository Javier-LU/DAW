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
    @Size(min = 5, max = 150)
    @Column(name = "equipo")
    private String equipo;

    @OneToOne
    @JoinColumn(name = "medico_id")
    private ESAD_profesionales medico;

    @OneToOne
    @JoinColumn(name = "enfermero_id")
    private ESAD_profesionales enfermero;

    @ManyToOne
    @JoinColumn(name = "auxiliar_id")
    private ESAD_profesionales auxiliar;

}
