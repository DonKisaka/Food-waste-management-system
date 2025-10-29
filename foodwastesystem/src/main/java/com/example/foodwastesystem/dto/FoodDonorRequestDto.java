package com.example.foodwastesystem.Dto;

import jakarta.validation.constraints.NotBlank;

public record FoodDonorRequestDto(
        @NotBlank(message = "Name cannot be blank")
        String name,

        @NotBlank(message = "Address cannot be blank")
        String address,

        @NotBlank(message = "Contact info cannot be blank")
        String contactInfo
)
{}
