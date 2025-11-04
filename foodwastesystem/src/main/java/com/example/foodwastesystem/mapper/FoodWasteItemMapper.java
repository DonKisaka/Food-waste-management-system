package com.example.foodwastesystem.mapper;

import com.example.foodwastesystem.dto.FoodWasteItemRequestDto;
import com.example.foodwastesystem.dto.FoodWasteItemResponseDto;
import com.example.foodwastesystem.model.FoodWasteItem;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = org.mapstruct.ReportingPolicy.IGNORE)
public interface FoodWasteItemMapper {

    @Mapping(source = "foodDonor.id", target = "foodDonorId")
    FoodWasteItemResponseDto toDto(FoodWasteItem foodWasteItem);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "foodDonor", ignore = true)
    @Mapping(target = "wasteProcessor", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(source = "wasteType", target = "wasteType")
    FoodWasteItem toEntity(FoodWasteItemRequestDto foodWasteItemRequestDto);

    List<FoodWasteItemResponseDto> toDtos(List<FoodWasteItem> foodWasteItems);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "foodDonor", ignore = true)
    @Mapping(target = "wasteProcessor", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    void updateFoodWasteItem(FoodWasteItemRequestDto dto, @MappingTarget FoodWasteItem foodWasteItem);
}
