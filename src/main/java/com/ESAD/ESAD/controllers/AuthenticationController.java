package com.ESAD.ESAD.controllers;


import com.ESAD.ESAD.controllers.request.AutLoginRequest;
import com.ESAD.ESAD.controllers.request.AuthReponse;
import com.ESAD.ESAD.service.UserDetailServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    private UserDetailServiceImpl userDetailServiceImpl;

    @PostMapping("/log-in")
    public ResponseEntity<AuthReponse>login(@RequestBody @Valid AutLoginRequest userRequest){
        return new ResponseEntity<AuthReponse>(this.userDetailServiceImpl.loginUser(userRequest), HttpStatus.OK);

    }
}
