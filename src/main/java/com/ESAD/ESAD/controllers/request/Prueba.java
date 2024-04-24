package com.ESAD.ESAD.controllers.request;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Prueba {

    @GetMapping("/hello")
    public String hello() {
        return "¡Hola! Has accedido al recurso protegido.";
    }

    @GetMapping("/hello2")
    public String hello2() {
        return "¡Hola! Has accedido al recurso sinnnnnnnnnnnnnnn protegido.";
    }
}