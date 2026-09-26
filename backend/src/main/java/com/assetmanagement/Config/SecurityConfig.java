package com.assetmanagement.Config;

import com.assetmanagement.Service.JwtAuthenticationFilter;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.http.HttpMethod;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter) {

        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http

            // ==========================================
            // CSRF
            // ==========================================

            .csrf(csrf -> csrf.disable())

            // ==========================================
            // CORS
            // ==========================================

            .cors(cors -> {})

            // ==========================================
            // AUTHORIZATION
            // ==========================================

            .authorizeHttpRequests(auth -> auth

                // Allow browser CORS preflight requests
                .requestMatchers(HttpMethod.OPTIONS, "/**")
                .permitAll()

                // ======================================
                // AUTHENTICATION
                // ======================================

                .requestMatchers("/api/auth/**")
                .permitAll()

                // ======================================
                // EMPLOYEE - MY ISSUES ONLY
                // ======================================

                .requestMatchers("/api/issues/my")
                .hasAnyRole(
                        "ADMIN",
                        "STOCK_MANAGER",
                        "EMPLOYEE"
                )

                // ======================================
                // ADMIN + STOCK MANAGER
                // ======================================

                .requestMatchers(
                        "/api/assets/**",
                        "/api/employees/**",
                        "/api/issues/**"
                )
                .hasAnyRole(
                        "ADMIN",
                        "STOCK_MANAGER"
                )

                // ======================================
                // EVERYTHING ELSE
                // ======================================

                .anyRequest()
                .authenticated()
            )

            // ==========================================
            // JWT FILTER
            // ==========================================

            .addFilterBefore(
                    jwtAuthenticationFilter,
                    UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }
}
