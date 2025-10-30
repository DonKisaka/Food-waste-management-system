package com.example.foodwastesystem.mapper;

import com.example.foodwastesystem.dto.FoodDonorRequestDto;
import com.example.foodwastesystem.dto.FoodDonorResponseDto;
import com.example.foodwastesystem.model.FoodDonor;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface FoodDonorMapper {

    FoodDonorResponseDto toDto(FoodDonor foodDonor);

    @Mapping(target = "foodWasteItems", ignore = true)
    @Mapping(target = "collectionCenters", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "registrationDate", ignore = true)
    FoodDonor toEntity(FoodDonorRequestDto foodDonorRequestDto);


    List<FoodDonorResponseDto> toDto(List<FoodDonor> foodDonors);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "registrationDate", ignore = true)
    @Mapping(target = "foodWasteItems", ignore = true)
    @Mapping(target = "collectionCenters", ignore = true)
    void updateFoodDonor(FoodDonorRequestDto dto, @MappingTarget FoodDonor foodDonor);
}
