package com.example.foodwastesystem.Service;

import com.example.foodwastesystem.dto.FoodDonorRequestDto;
import com.example.foodwastesystem.dto.FoodDonorResponseDto;
import com.example.foodwastesystem.mapper.FoodDonorMapper;
import com.example.foodwastesystem.model.FoodDonor;
import com.example.foodwastesystem.repository.FoodDonorRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class FoodDonorService {

    private final FoodDonorRepository foodDonorRepository;
    private final FoodDonorMapper foodDonorMapper;

    public FoodDonorService(FoodDonorRepository foodDonorRepository, FoodDonorMapper foodDonorMapper) {
        this.foodDonorRepository = foodDonorRepository;
        this.foodDonorMapper = foodDonorMapper;
    }

    @Transactional
    public FoodDonorResponseDto createFoodDonor(FoodDonorRequestDto dto) {

        FoodDonor donor = foodDonorMapper.toEntity(dto);
        FoodDonor savedDonor = foodDonorRepository.save(donor);

        return foodDonorMapper.toDto(savedDonor);
    }

    public FoodDonorResponseDto getFoodDonorById(Long id) {
        FoodDonor foodDonor = foodDonorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Food Donor not found with id: " + id));
        return foodDonorMapper.toDto(foodDonor);
    }


    @Transactional
    public FoodDonorResponseDto updateFoodDonor(Long id, FoodDonorRequestDto dto) {
        FoodDonor foodDonor = foodDonorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Food Donor not found with id: " + id));
        foodDonorMapper.updateFoodDonor(dto, foodDonor);
        FoodDonor savedFoodDonor = foodDonorRepository.save(foodDonor);
        return foodDonorMapper.toDto(savedFoodDonor);
    }

    public List<FoodDonorResponseDto> getFoodDonorsByCollectionCenterId(Long collectionCenterId) {
        return foodDonorRepository.findByCollectionCenterId(collectionCenterId).stream()
                .map(foodDonorMapper::toDto)
                .toList();
    }

    public List<FoodDonorResponseDto> getFoodDonorsByName(String name) {
        return foodDonorRepository.findByNameContainingIgnoreCase(name).stream()
                .map(foodDonorMapper::toDto)
                .toList();
    }

    public List<FoodDonorResponseDto> getAllFoodDonors() {
        return foodDonorRepository.findAll().stream()
                .map(foodDonorMapper::toDto)
                .toList();
    }

    @Transactional
    public void deleteFoodDonor(Long id) {
        FoodDonor foodDonor = foodDonorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Food Donor not found with id: " + id));
        foodDonorRepository.delete(foodDonor);
    }

}
