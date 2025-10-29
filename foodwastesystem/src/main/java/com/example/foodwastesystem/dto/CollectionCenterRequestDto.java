package com.example.foodwastesystem.Dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CollectionCenterRequestDto(
        @NotBlank(message = "Name cannot be blank")
        String location,

        @NotNull(message = "Maximum capacity cannot be null")
        Double maximumCapacityKg,

        @NotNull(message = "Waste processor id cannot be null")
        Long wasteProcessorId
) {}
