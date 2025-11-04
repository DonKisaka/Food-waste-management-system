package com.example.foodwastesystem.dto;

public record AuthenticationResponseDto(
        String token,
        String email
) {}
