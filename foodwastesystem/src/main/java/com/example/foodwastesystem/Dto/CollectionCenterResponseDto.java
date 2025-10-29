package com.example.foodwastesystem.Dto;

public record CollectionCenterResponseDto(
        Long id,
        String location,
        Double maximumCapacityKg,
        Long wasteProcessorId
) {}
