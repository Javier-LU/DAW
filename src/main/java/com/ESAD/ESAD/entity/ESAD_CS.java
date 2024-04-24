package com.ESAD.ESAD.entity;
import jakarta.persistence.*;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "ESAD_CS")
public class ESAD_CS {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    @Size(min = 5, max = 100, message = "El código 'cs' debe tener entre 5 y 100 caracteres.")
    @Column(name = "cs")
    private String cs;

    @NotBlank
    @Size(min = 5, max = 100, message = "El nombre de la calle debe tener entre 5 y 100 caracteres.")
    @Column(name = "calle")
    private String calle;

    @NotBlank
    @Pattern(regexp = "^\\+?\\d{10,15}$", message = "El formato del teléfono no es válido")
    @Size(min = 10, max = 15, message = "El número de teléfono debe tener entre 10 y 15 dígitos.")
    @Column(name = "telefono")
    private String telefono;
}
