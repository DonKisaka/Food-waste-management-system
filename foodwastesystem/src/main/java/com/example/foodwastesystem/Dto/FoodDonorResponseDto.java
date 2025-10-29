package com.example.foodwastesystem.Dto;

import java.time.LocalDateTime;

public record FoodDonorResponseDto
(
        Long id,
        String name,
        String address,
        String contactInfo,
        LocalDateTime registrationDate
) {}
