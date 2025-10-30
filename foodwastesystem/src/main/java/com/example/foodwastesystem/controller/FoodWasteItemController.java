package com.example.foodwastesystem.controller;

import com.example.foodwastesystem.Service.FoodWasteItemService;
import com.example.foodwastesystem.dto.FoodWasteItemRequestDto;
import com.example.foodwastesystem.dto.FoodWasteItemResponseDto;
import com.example.foodwastesystem.model.WasteType;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/food-waste-item")
public class FoodWasteItemController {

    private final FoodWasteItemService foodWasteItemService;

    public FoodWasteItemController(FoodWasteItemService foodWasteItemService) {
        this.foodWasteItemService = foodWasteItemService;
    }


    @PostMapping
    public ResponseEntity<FoodWasteItemResponseDto> createFoodWasteItem(
            @Valid @RequestBody FoodWasteItemRequestDto dto
    ){
        FoodWasteItemResponseDto responseDto = foodWasteItemService.createFoodWasteItem(dto);
        return ResponseEntity.status(201).body(responseDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FoodWasteItemResponseDto> updateFoodWasteItem(
            @PathVariable Long id,
            @Valid @RequestBody FoodWasteItemRequestDto dto
    ){
        FoodWasteItemResponseDto responseDto = foodWasteItemService.updateFoodWasteItem(id, dto);
        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FoodWasteItemResponseDto> getFoodWasteItemById(@PathVariable Long id){
        FoodWasteItemResponseDto responseDto = foodWasteItemService.getFoodWasteItemById(id);
        return ResponseEntity.ok(responseDto);
    }

    @GetMapping
    public ResponseEntity<List<FoodWasteItemResponseDto>> getFoodWasteItems(
            @RequestParam(required = false) Long foodDonorId,
            @RequestParam(required = false) WasteType wasteType
    ){
        if(foodDonorId != null) {
            return ResponseEntity.ok(foodWasteItemService.getByFoodDonorId(foodDonorId));
        }
        if(wasteType != null) {
            return ResponseEntity.ok(foodWasteItemService.getByWasteType(wasteType));
        }
        return ResponseEntity.ok(foodWasteItemService.getAllFoodWasteItems());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFoodWasteItem(
            @PathVariable Long id
    ){
        foodWasteItemService.deleteFoodWasteItem(id);
        return ResponseEntity.noContent().build();
    }


}
