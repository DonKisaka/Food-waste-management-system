package com.example.foodwastesystem.mapper;

import com.example.foodwastesystem.dto.WasteProcessorRequestDto;
import com.example.foodwastesystem.dto.WasteProcessorResponseDto;
import com.example.foodwastesystem.model.WasteProcessor;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface WasteProcessorMapper {


    WasteProcessorResponseDto toDto(WasteProcessor wasteProcessor);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "collectionCenters", ignore = true)
    WasteProcessor toEntity(WasteProcessorRequestDto wasteProcessorRequestDto);

    List<WasteProcessorResponseDto> toDtos(List<WasteProcessor> wasteProcessors);
}
