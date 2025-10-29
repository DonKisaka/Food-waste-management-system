package com.example.foodwastesystem.Dto;

import com.example.foodwastesystem.model.ProcessingStatus;
import com.example.foodwastesystem.model.WasteType;

import java.time.LocalDate;

public record FoodWasteItemResponseDto(
        Long id,
        Double weightKg,
        LocalDate expirationDate,
        WasteType wasteType,
        ProcessingStatus status,
        Long foodDonorId
) {
}
