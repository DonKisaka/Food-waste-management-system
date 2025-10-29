package com.example.foodwastesystem.dto;

public record CollectionCenterResponseDto(
        Long id,
        String location,
        Double maximumCapacityKg,
        Long wasteProcessorId
) {}
