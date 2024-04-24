package com.ESAD.ESAD.entity;

import com.ESAD.ESAD.entity.enu.EEnfermedad;
import com.ESAD.ESAD.entity.enu.ESalida;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "ESAD_listaSalida")
public class ESAD_listaSalida {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(name = "listaSalida")
    private ESalida listaSalida;
}
