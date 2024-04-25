package com.ESAD.ESAD.security.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.io.Decoders;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.net.Authenticator;
import java.security.Key;
import java.util.Date;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
@Slf4j
public class JwtUtils {

    @Value("${security.jwt.key.private}")
    private String secretKey;

    @Value("${security.jwt.user.backend}")
    private String userGenerator;

    @Value("${security.jwt.time.expiration}")
    private long timeExpiration; // Cambiado a tipo long directamente si es posible

    //Crear token
    public String createToken(Authentication authentication) {
        Algorithm algorithm = Algorithm.HMAC256(this.secretKey);
        String username = authentication.getPrincipal().toString();
        String authorities = authentication.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));
        String jwtToken = JWT.create()
                .withIssuer(this.userGenerator)
                .withSubject(username)
                .withClaim("authorities", authorities)
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + this.timeExpiration))
                .withJWTId(UUID.randomUUID().toString())
                .withNotBefore(new Date(System.currentTimeMillis()))
                .sign(algorithm);
        return  jwtToken;

    }


    // Validad el token
    public DecodedJWT validateToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(this.secretKey);
            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer(this.userGenerator)
                    .build();

            DecodedJWT decodedJWT =verifier.verify(token);
            return decodedJWT;

        } catch (JWTVerificationException e) {
            throw new JwtException("Token no valido");
        }
    }

    //Extraer el nombre
    public String extractUsername(DecodedJWT decodedJWT) {
        return decodedJWT.getSubject().toString();
    }

    //Clain devolver el nombre
    public Claim getSpecificClaim(DecodedJWT decodedJWT, String claimName) {
        return decodedJWT.getClaim(claimName);
    }

    //Clain devolver todos los clain
    public Map<String, Claim> returAllClain(DecodedJWT decodedJWT){
        return  decodedJWT.getClaims();
    }


}
