package com.example.foodwastesystem.Service;

import com.example.foodwastesystem.dto.FoodWasteItemRequestDto;
import com.example.foodwastesystem.dto.FoodWasteItemResponseDto;
import com.example.foodwastesystem.mapper.FoodWasteItemMapper;
import com.example.foodwastesystem.model.FoodWasteItem;
import com.example.foodwastesystem.model.WasteType;
import com.example.foodwastesystem.repository.FoodWasteItemRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class FoodWasteItemService {

    private final FoodWasteItemRepository foodWasteItemRepository;
    private final FoodWasteItemMapper foodWasteItemMapper;

    public FoodWasteItemService(FoodWasteItemRepository foodWasteItemRepository, FoodWasteItemMapper foodWasteItemMapper) {
        this.foodWasteItemRepository = foodWasteItemRepository;
        this.foodWasteItemMapper = foodWasteItemMapper;
    }

    @Transactional
    public FoodWasteItemResponseDto createFoodWasteItem(FoodWasteItemRequestDto dto){

        FoodWasteItem foodWasteItem = foodWasteItemMapper.toEntity(dto);
        FoodWasteItem savedFoodWasteItem = foodWasteItemRepository.save(foodWasteItem);
        return foodWasteItemMapper.toDto(savedFoodWasteItem);
    }

    public FoodWasteItemResponseDto getFoodWasteItemById(Long id){
        FoodWasteItem foodWasteItem = foodWasteItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Food Waste Item not found with id: " + id));
        return foodWasteItemMapper.toDto(foodWasteItem);
    }

    @Transactional
    public FoodWasteItemResponseDto updateFoodWasteItem(Long id, FoodWasteItemRequestDto dto){
        FoodWasteItem foodWasteItem = foodWasteItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Food Waste Item not found with id: " + id));
        foodWasteItemMapper.updateFoodWasteItem(dto, foodWasteItem);
        FoodWasteItem savedFoodWasteItem = foodWasteItemRepository.save(foodWasteItem);
        return foodWasteItemMapper.toDto(savedFoodWasteItem);
    }

    public List<FoodWasteItemResponseDto> getAllFoodWasteItems(){
        return foodWasteItemRepository.findAll().stream()
                .map(foodWasteItemMapper::toDto)
                .toList();
    }

    public List<FoodWasteItemResponseDto> getByFoodDonorId(Long foodDonorId){
        return foodWasteItemRepository.findByFoodDonorId(foodDonorId).stream()
                .map(foodWasteItemMapper::toDto)
                .toList();
    }

    public List<FoodWasteItemResponseDto> getByWasteType(WasteType wasteType){
        return foodWasteItemRepository.findByWasteType(wasteType).stream()
                .map(foodWasteItemMapper::toDto)
                .toList();
    }

    @Transactional
    public void deleteFoodWasteItem(Long id){
        if (!foodWasteItemRepository.existsById(id)){
            throw new RuntimeException("Food Waste Item not found with id: " + id);
        }
        foodWasteItemRepository.deleteById(id);
    }
}
