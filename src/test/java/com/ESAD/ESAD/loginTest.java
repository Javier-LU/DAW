package com.ESAD.ESAD;

import com.ESAD.ESAD.controllers.AuthenticationController;
import com.ESAD.ESAD.controllers.request.AutLoginRequest;
import com.ESAD.ESAD.controllers.request.AuthReponse;
import com.ESAD.ESAD.service.UserDetailServiceImpl;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AuthenticationController.class)
public class loginTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserDetailServiceImpl userDetailService;

    @Test
    public void testLoginSuccess() throws Exception {
        // Prepare mock user data
        String username = "Admin";
        String password = "1234";
        AutLoginRequest userRequest = new AutLoginRequest(username, password);
        AuthReponse expectedResponse = new AuthReponse("Admin", "Login successful", "your_auth_token", true);
        // Replace with your expected token format

        // Mock successful user login
        Mockito.when(userDetailService.loginUser(userRequest)).thenReturn(expectedResponse);

        // Perform the login request
        mockMvc.perform(post("/auth/log-in")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(userRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.jwt").value(expectedResponse.jwt()))
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    public void testLoginInvalidCredentials() throws Exception {
        // Prepare mock user data with invalid credentials
        String username = "InvalidUser";
        String password = "WrongPassword";
        AutLoginRequest userRequest = new AutLoginRequest(username, password);

        // Mock unsuccessful login (e.g., throw an exception)
        Mockito.when(userDetailService.loginUser(userRequest)).thenThrow(new RuntimeException("Invalid credentials"));

        // Perform the login request and expect an error
        mockMvc.perform(post("/auth/log-in")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(userRequest)))
                .andExpect(status().isUnauthorized()); // Use the appropriate status code
    }

    // Utility method to convert object to JSON string
    private static String asJsonString(final Object obj) throws Exception {
        return new ObjectMapper().writeValueAsString(obj);
    }
}
