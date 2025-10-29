package com.example.foodwastesystem.dto;

import java.time.LocalDateTime;

public record FoodDonorResponseDto
(
        Long id,
        String name,
        String address,
        String contactInfo,
        LocalDateTime registrationDate
) {}
