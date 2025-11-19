package com.example.foodwastesystem.mapper;

import com.example.foodwastesystem.dto.WasteProcessorRequestDto;
import com.example.foodwastesystem.dto.WasteProcessorResponseDto;
import com.example.foodwastesystem.model.ProcessingType;
import com.example.foodwastesystem.model.WasteProcessor;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-11-19T15:18:19+0300",
    comments = "version: 1.6.3, compiler: javac, environment: Java 25 (Oracle Corporation)"
)
@Component
public class WasteProcessorMapperImpl implements WasteProcessorMapper {

    @Override
    public WasteProcessorResponseDto toDto(WasteProcessor wasteProcessor) {
        if ( wasteProcessor == null ) {
            return null;
        }

        Long id = null;
        String name = null;
        String location = null;
        Double maximumProcessingCapacityKg = null;
        ProcessingType processingType = null;

        id = wasteProcessor.getId();
        name = wasteProcessor.getName();
        location = wasteProcessor.getLocation();
        maximumProcessingCapacityKg = wasteProcessor.getMaximumProcessingCapacityKg();
        processingType = wasteProcessor.getProcessingType();

        WasteProcessorResponseDto wasteProcessorResponseDto = new WasteProcessorResponseDto( id, name, location, maximumProcessingCapacityKg, processingType );

        return wasteProcessorResponseDto;
    }

    @Override
    public WasteProcessor toEntity(WasteProcessorRequestDto wasteProcessorRequestDto) {
        if ( wasteProcessorRequestDto == null ) {
            return null;
        }

        WasteProcessor.WasteProcessorBuilder wasteProcessor = WasteProcessor.builder();

        wasteProcessor.name( wasteProcessorRequestDto.name() );
        wasteProcessor.location( wasteProcessorRequestDto.location() );
        wasteProcessor.maximumProcessingCapacityKg( wasteProcessorRequestDto.maximumProcessingCapacityKg() );
        wasteProcessor.processingType( wasteProcessorRequestDto.processingType() );

        return wasteProcessor.build();
    }

    @Override
    public List<WasteProcessorResponseDto> toDtos(List<WasteProcessor> wasteProcessors) {
        if ( wasteProcessors == null ) {
            return null;
        }

        List<WasteProcessorResponseDto> list = new ArrayList<WasteProcessorResponseDto>( wasteProcessors.size() );
        for ( WasteProcessor wasteProcessor : wasteProcessors ) {
            list.add( toDto( wasteProcessor ) );
        }

        return list;
    }

    @Override
    public void updateWasteProcessor(WasteProcessorRequestDto dto, WasteProcessor wasteProcessor) {
        if ( dto == null ) {
            return;
        }

        wasteProcessor.setName( dto.name() );
        wasteProcessor.setLocation( dto.location() );
        wasteProcessor.setMaximumProcessingCapacityKg( dto.maximumProcessingCapacityKg() );
        wasteProcessor.setProcessingType( dto.processingType() );
    }
}
