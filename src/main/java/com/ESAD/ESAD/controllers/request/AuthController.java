package com.ESAD.ESAD.controllers.request;

import com.ESAD.ESAD.security.jwt.JwtUtils;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    @Autowired
    private JwtUtils jwtUtils;

    @GetMapping("/auth/verify-token")
    public ResponseEntity<?> verifyToken(@RequestHeader("Authorization") String token) {
        try {
            String jwtToken = token.replace("Bearer ", "");
            DecodedJWT decodedJWT = jwtUtils.validateToken(jwtToken);

            boolean isValid = decodedJWT != null;

            return ResponseEntity.ok(new TokenVerificationResponse(isValid));
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid token");
        }
    }

    static class TokenVerificationResponse {
        private boolean valid;

        public TokenVerificationResponse(boolean valid) {
            this.valid = valid;
        }

        public boolean isValid() {
            return valid;
        }

        public void setValid(boolean valid) {
            this.valid = valid;
        }
    }
}
