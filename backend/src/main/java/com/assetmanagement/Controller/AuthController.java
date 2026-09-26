package com.assetmanagement.Controller;

import com.assetmanagement.DTO.LoginRequest;
import com.assetmanagement.DTO.UserResponse;
import com.assetmanagement.Entity.User;
import com.assetmanagement.Service.AuthService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@RequestBody User user) {

        User registeredUser = authService.register(user);

        return ResponseEntity.ok(
                new UserResponse(registeredUser)
        );
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(
            @RequestBody LoginRequest request) {

        String token = authService.login(request);

        return ResponseEntity.ok(
                Map.of("token", token)
        );
    }
}
