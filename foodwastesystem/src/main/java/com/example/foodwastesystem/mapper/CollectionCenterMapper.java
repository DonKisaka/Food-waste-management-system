package com.example.foodwastesystem.mapper;

import com.example.foodwastesystem.dto.CollectionCenterRequestDto;
import com.example.foodwastesystem.dto.CollectionCenterResponseDto;
import com.example.foodwastesystem.model.CollectionCenter;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = org.mapstruct.ReportingPolicy.IGNORE)
public interface CollectionCenterMapper {

    @Mapping(source = "wasteProcessor.id", target = "wasteProcessorId")
    CollectionCenterResponseDto toDto(CollectionCenter collectionCenter);

    @Mapping(target = "foodDonors", ignore = true)
    @Mapping(target = "wasteProcessor", ignore = true)
    @Mapping(target = "id", ignore = true)
    CollectionCenter toEntity(CollectionCenterRequestDto collectionCenterRequestDto);

    List<CollectionCenterResponseDto> toDtos(List<CollectionCenter> collectionCenters);

    @Mapping(target = "foodDonors", ignore = true)
    @Mapping(target = "wasteProcessor", ignore = true)
    @Mapping(target = "id", ignore = true)
    void updateCollectionCenter(CollectionCenterRequestDto dto, @MappingTarget CollectionCenter collectionCenter);
}
