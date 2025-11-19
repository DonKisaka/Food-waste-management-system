package com.example.foodwastesystem.mapper;

import com.example.foodwastesystem.dto.FoodWasteItemRequestDto;
import com.example.foodwastesystem.dto.FoodWasteItemResponseDto;
import com.example.foodwastesystem.model.FoodDonor;
import com.example.foodwastesystem.model.FoodWasteItem;
import com.example.foodwastesystem.model.ProcessingStatus;
import com.example.foodwastesystem.model.WasteType;
import java.time.LocalDate;
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
public class FoodWasteItemMapperImpl implements FoodWasteItemMapper {

    @Override
    public FoodWasteItemResponseDto toDto(FoodWasteItem foodWasteItem) {
        if ( foodWasteItem == null ) {
            return null;
        }

        Long foodDonorId = null;
        Long id = null;
        Double weightKg = null;
        LocalDate expirationDate = null;
        WasteType wasteType = null;
        ProcessingStatus status = null;

        foodDonorId = foodWasteItemFoodDonorId( foodWasteItem );
        id = foodWasteItem.getId();
        weightKg = foodWasteItem.getWeightKg();
        expirationDate = foodWasteItem.getExpirationDate();
        wasteType = foodWasteItem.getWasteType();
        status = foodWasteItem.getStatus();

        FoodWasteItemResponseDto foodWasteItemResponseDto = new FoodWasteItemResponseDto( id, weightKg, expirationDate, wasteType, status, foodDonorId );

        return foodWasteItemResponseDto;
    }

    @Override
    public FoodWasteItem toEntity(FoodWasteItemRequestDto foodWasteItemRequestDto) {
        if ( foodWasteItemRequestDto == null ) {
            return null;
        }

        FoodWasteItem.FoodWasteItemBuilder foodWasteItem = FoodWasteItem.builder();

        foodWasteItem.wasteType( foodWasteItemRequestDto.wasteType() );
        foodWasteItem.weightKg( foodWasteItemRequestDto.weightKg() );
        foodWasteItem.expirationDate( foodWasteItemRequestDto.expirationDate() );
        foodWasteItem.status( foodWasteItemRequestDto.status() );

        return foodWasteItem.build();
    }

    @Override
    public List<FoodWasteItemResponseDto> toDtos(List<FoodWasteItem> foodWasteItems) {
        if ( foodWasteItems == null ) {
            return null;
        }

        List<FoodWasteItemResponseDto> list = new ArrayList<FoodWasteItemResponseDto>( foodWasteItems.size() );
        for ( FoodWasteItem foodWasteItem : foodWasteItems ) {
            list.add( toDto( foodWasteItem ) );
        }

        return list;
    }

    @Override
    public void updateFoodWasteItem(FoodWasteItemRequestDto dto, FoodWasteItem foodWasteItem) {
        if ( dto == null ) {
            return;
        }

        if ( dto.weightKg() != null ) {
            foodWasteItem.setWeightKg( dto.weightKg() );
        }
        if ( dto.expirationDate() != null ) {
            foodWasteItem.setExpirationDate( dto.expirationDate() );
        }
        if ( dto.wasteType() != null ) {
            foodWasteItem.setWasteType( dto.wasteType() );
        }
        if ( dto.status() != null ) {
            foodWasteItem.setStatus( dto.status() );
        }
    }

    private Long foodWasteItemFoodDonorId(FoodWasteItem foodWasteItem) {
        FoodDonor foodDonor = foodWasteItem.getFoodDonor();
        if ( foodDonor == null ) {
            return null;
        }
        return foodDonor.getId();
    }
}
