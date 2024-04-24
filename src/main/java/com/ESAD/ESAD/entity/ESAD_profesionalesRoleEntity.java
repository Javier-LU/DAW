package com.ESAD.ESAD.entity;


import com.ESAD.ESAD.entity.enu.Erole;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "ESAD_roles")
public class ESAD_profesionalesRoleEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(name = "rol")
    private Erole rol;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @JoinTable(
            name = "user_permision_union", // Esto es el nombre de la tabla de unión
            joinColumns = @JoinColumn(name = "role_id"), // Columna que refiere a la entidad actual
            inverseJoinColumns = @JoinColumn(name = "permission_id") // Columna que refiere a la entidad opuesta
    )
    private Set<ESAD_profesionalesPermissionEntity> permissionList = new HashSet<>();
}
