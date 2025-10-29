package com.example.foodwastesystem.Dto;

import com.example.foodwastesystem.model.ProcessingType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record WasteProcessorRequestDto(
        @NotBlank(message = "Name cannot be null")
        String name,

        @NotBlank(message = "Location cannot be null")
        String location,

        @NotNull(message = "Maximum processing capacity cannot be null")
        Double maximumProcessingCapacityKg,

        @NotNull(message = "Processing type cannot be null")
        ProcessingType processingType
) {}
