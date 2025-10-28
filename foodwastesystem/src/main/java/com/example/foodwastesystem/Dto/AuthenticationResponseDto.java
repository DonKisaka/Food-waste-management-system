package com.example.foodwastesystem.Dto;

public record AuthenticationResponseDto(
        String token,
        String email,
        String username
) {}
