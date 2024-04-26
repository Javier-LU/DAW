package com.ESAD.ESAD.entity;

import com.ESAD.ESAD.entity.enu.EEprofesion;
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
@Table(name = "ESAD_listaProfesion")
public class ESAD_listaProfesiones {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(name = "listaPorfesion")
    private EEprofesion listaPorfesion;
}
