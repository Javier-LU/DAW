package com.ESAD.ESAD.entity;

import com.ESAD.ESAD.entity.enu.ESalida;
import com.ESAD.ESAD.entity.enu.ETarea;
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
@Table(name = "ESAD_listaTareas")
public class ESAD_listaTareas {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(name = "listaTareas")
    private ETarea listaTarea;

}
