package com.ESAD.ESAD.entity;

import com.ESAD.ESAD.entity.enu.EPermission;
import com.ESAD.ESAD.entity.enu.ETarea;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(name = "ESAD_permisos")
public class ESAD_profesionalesPermissionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;


   // @Column(unique = true, nullable = false, updatable = false)

    @Enumerated(EnumType.STRING)
    @Column(name = "listPermissions")
    private EPermission listPermissions;




}
