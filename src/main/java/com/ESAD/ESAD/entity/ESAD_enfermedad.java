package com.ESAD.ESAD.entity;

import com.ESAD.ESAD.entity.enu.EEnfermedad;
import com.ESAD.ESAD.entity.enu.Erole;
import jakarta.persistence.*;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "ESAD_enfermedad")
public class ESAD_enfermedad {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Integer id;

        @Enumerated(EnumType.STRING)
        @Column(name = "enfermedad")
        private EEnfermedad enfermedad;

}
