package com.example.foodwastesystem.Dto;

import com.example.foodwastesystem.model.ProcessingType;

public record WasteProcessorResponseDto(
        Long id,
        String name,
        String location,
        Double maximumProcessingCapacityKg,
        ProcessingType processingType
) {}
