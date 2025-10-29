package com.example.foodwastesystem.mapper;

import com.example.foodwastesystem.dto.FoodWasteItemRequestDto;
import com.example.foodwastesystem.dto.FoodWasteItemResponseDto;
import com.example.foodwastesystem.model.FoodWasteItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = org.mapstruct.ReportingPolicy.IGNORE)
public interface FoodWasteItemMapper {

    @Mapping(source = "foodDonor.id", target = "foodDonorId")
    @Mapping(source = "WasteProcessor.id", target = "wasteProcessorId")
    FoodWasteItemResponseDto toDto(FoodWasteItem foodWasteItem);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "foodDonor", ignore = true)
    @Mapping(target = "WasteProcessor", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    FoodWasteItem toEntity(FoodWasteItemRequestDto foodWasteItemRequestDto);

    List<FoodWasteItemResponseDto> toDtos(List<FoodWasteItem> foodWasteItems);
}
