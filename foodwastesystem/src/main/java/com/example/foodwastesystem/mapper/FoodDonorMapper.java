package com.example.foodwastesystem.mapper;

import com.example.foodwastesystem.dto.FoodDonorRequestDto;
import com.example.foodwastesystem.dto.FoodDonorResponseDto;
import com.example.foodwastesystem.model.FoodDonor;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface FoodDonorMapper {
    FoodDonorResponseDto toDto(FoodDonor foodDonor);

    @Mapping(target = "foodWasteItems", ignore = true)
    @Mapping(target = "collectionCenters", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "registrationDate", ignore = true)
    FoodDonor toEntity(FoodDonorRequestDto foodDonorRequestDto);


    List<FoodDonorResponseDto> toDtos(List<FoodDonor> foodDonors);
}
