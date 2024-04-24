package com.ESAD.ESAD.repository;


import com.ESAD.ESAD.entity.ESAD_profesionales;
import com.ESAD.ESAD.entity.ESAD_usuarios;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuariosRepository extends JpaRepository <ESAD_usuarios, Integer>  {


}
