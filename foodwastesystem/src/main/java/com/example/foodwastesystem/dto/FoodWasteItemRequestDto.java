package com.example.foodwastesystem.dto;

import com.example.foodwastesystem.model.ProcessingStatus;
import com.example.foodwastesystem.model.WasteType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.time.LocalDate;

public record FoodWasteItemRequestDto(
        @Positive(message = "Weight cannot be negative")
        Double weightKg,

        @NotNull(message = "Expiration date cannot be null")
        LocalDate expirationDate,

        @NotNull(message = "Waste type cannot be null")
        WasteType wasteType,

        @NotNull(message = "Processing status cannot be null")
        ProcessingStatus status,

        @NotNull(message = "Food donor id cannot be null")
        Long foodDonorId
) {}
