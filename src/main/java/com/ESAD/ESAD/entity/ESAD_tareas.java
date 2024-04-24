package com.ESAD.ESAD.entity;

import com.ESAD.ESAD.entity.enu.ETarea;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.FutureOrPresent;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "ESAD_tareas")
public class ESAD_tareas {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private ESAD_usuarios  usuario;

    @FutureOrPresent(message = "La fecha de la tarea debe ser hoy o en el futuro.")
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @Column(name = "fecha")
    private Date fecha;


    @ManyToOne
    @JoinColumn(name = "tipo_tarea_id")
    private ESAD_listaTareas tipoTarea;;
}
