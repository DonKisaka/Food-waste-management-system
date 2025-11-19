package com.example.foodwastesystem.mapper;

import com.example.foodwastesystem.dto.CollectionCenterRequestDto;
import com.example.foodwastesystem.dto.CollectionCenterResponseDto;
import com.example.foodwastesystem.model.CollectionCenter;
import com.example.foodwastesystem.model.WasteProcessor;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-11-19T15:18:20+0300",
    comments = "version: 1.6.3, compiler: javac, environment: Java 25 (Oracle Corporation)"
)
@Component
public class CollectionCenterMapperImpl implements CollectionCenterMapper {

    @Override
    public CollectionCenterResponseDto toDto(CollectionCenter collectionCenter) {
        if ( collectionCenter == null ) {
            return null;
        }

        Long wasteProcessorId = null;
        Long id = null;
        String location = null;
        Double maximumCapacityKg = null;

        wasteProcessorId = collectionCenterWasteProcessorId( collectionCenter );
        id = collectionCenter.getId();
        location = collectionCenter.getLocation();
        maximumCapacityKg = collectionCenter.getMaximumCapacityKg();

        CollectionCenterResponseDto collectionCenterResponseDto = new CollectionCenterResponseDto( id, location, maximumCapacityKg, wasteProcessorId );

        return collectionCenterResponseDto;
    }

    @Override
    public CollectionCenter toEntity(CollectionCenterRequestDto collectionCenterRequestDto) {
        if ( collectionCenterRequestDto == null ) {
            return null;
        }

        CollectionCenter.CollectionCenterBuilder collectionCenter = CollectionCenter.builder();

        collectionCenter.location( collectionCenterRequestDto.location() );
        collectionCenter.maximumCapacityKg( collectionCenterRequestDto.maximumCapacityKg() );

        return collectionCenter.build();
    }

    @Override
    public List<CollectionCenterResponseDto> toDtos(List<CollectionCenter> collectionCenters) {
        if ( collectionCenters == null ) {
            return null;
        }

        List<CollectionCenterResponseDto> list = new ArrayList<CollectionCenterResponseDto>( collectionCenters.size() );
        for ( CollectionCenter collectionCenter : collectionCenters ) {
            list.add( toDto( collectionCenter ) );
        }

        return list;
    }

    @Override
    public void updateCollectionCenter(CollectionCenterRequestDto dto, CollectionCenter collectionCenter) {
        if ( dto == null ) {
            return;
        }

        collectionCenter.setLocation( dto.location() );
        collectionCenter.setMaximumCapacityKg( dto.maximumCapacityKg() );
    }

    private Long collectionCenterWasteProcessorId(CollectionCenter collectionCenter) {
        WasteProcessor wasteProcessor = collectionCenter.getWasteProcessor();
        if ( wasteProcessor == null ) {
            return null;
        }
        return wasteProcessor.getId();
    }
}
