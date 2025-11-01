package com.example.foodwastesystem.mapper;

import com.example.foodwastesystem.dto.FoodDonorRequestDto;
import com.example.foodwastesystem.dto.FoodDonorResponseDto;
import com.example.foodwastesystem.model.FoodDonor;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-11-01T15:01:02+0300",
    comments = "version: 1.6.3, compiler: javac, environment: Java 25 (Oracle Corporation)"
)
@Component
public class FoodDonorMapperImpl implements FoodDonorMapper {

    @Override
    public FoodDonorResponseDto toDto(FoodDonor foodDonor) {
        if ( foodDonor == null ) {
            return null;
        }

        Long id = null;
        String name = null;
        String address = null;
        String contactInfo = null;
        LocalDateTime registrationDate = null;

        id = foodDonor.getId();
        name = foodDonor.getName();
        address = foodDonor.getAddress();
        contactInfo = foodDonor.getContactInfo();
        registrationDate = foodDonor.getRegistrationDate();

        FoodDonorResponseDto foodDonorResponseDto = new FoodDonorResponseDto( id, name, address, contactInfo, registrationDate );

        return foodDonorResponseDto;
    }

    @Override
    public FoodDonor toEntity(FoodDonorRequestDto foodDonorRequestDto) {
        if ( foodDonorRequestDto == null ) {
            return null;
        }

        FoodDonor.FoodDonorBuilder foodDonor = FoodDonor.builder();

        foodDonor.name( foodDonorRequestDto.name() );
        foodDonor.address( foodDonorRequestDto.address() );
        foodDonor.contactInfo( foodDonorRequestDto.contactInfo() );

        return foodDonor.build();
    }

    @Override
    public List<FoodDonorResponseDto> toDto(List<FoodDonor> foodDonors) {
        if ( foodDonors == null ) {
            return null;
        }

        List<FoodDonorResponseDto> list = new ArrayList<FoodDonorResponseDto>( foodDonors.size() );
        for ( FoodDonor foodDonor : foodDonors ) {
            list.add( toDto( foodDonor ) );
        }

        return list;
    }

    @Override
    public void updateFoodDonor(FoodDonorRequestDto dto, FoodDonor foodDonor) {
        if ( dto == null ) {
            return;
        }

        if ( dto.name() != null ) {
            foodDonor.setName( dto.name() );
        }
        if ( dto.address() != null ) {
            foodDonor.setAddress( dto.address() );
        }
        if ( dto.contactInfo() != null ) {
            foodDonor.setContactInfo( dto.contactInfo() );
        }
    }
}
