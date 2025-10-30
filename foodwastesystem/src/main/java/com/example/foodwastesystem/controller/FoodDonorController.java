package com.example.foodwastesystem.controller;

import com.example.foodwastesystem.Service.FoodDonorService;
import com.example.foodwastesystem.dto.FoodDonorRequestDto;
import com.example.foodwastesystem.dto.FoodDonorResponseDto;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/food-donor")
public class FoodDonorController {

    private final FoodDonorService foodDonorService;

    public FoodDonorController(FoodDonorService foodDonorService) {
        this.foodDonorService = foodDonorService;
    }

    @PostMapping
    public ResponseEntity<FoodDonorResponseDto> createFoodDonor(
            @Valid @RequestBody FoodDonorRequestDto dto
    ){
        FoodDonorResponseDto responseDto = foodDonorService.createFoodDonor(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FoodDonorResponseDto> getFoodDonorById(@PathVariable Long id){
        FoodDonorResponseDto responseDto = foodDonorService.getFoodDonorById(id);
        return ResponseEntity.ok(responseDto);
    }

    @GetMapping
    public ResponseEntity<List<FoodDonorResponseDto>> getAllFoodDonors(){
        List<FoodDonorResponseDto> responseDto = foodDonorService.getAllFoodDonors();
        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/search")
    public ResponseEntity<List<FoodDonorResponseDto>> getFoodDonorsByName(
            @RequestParam String name
    ){
        List<FoodDonorResponseDto> responseDto = foodDonorService.getFoodDonorsByName(name);
        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/collection-center/{collectionCenterId}")
    public ResponseEntity<List<FoodDonorResponseDto>> getFoodDonorsByCollectionCenterId(
            @PathVariable Long collectionCenterId
    ){
        List<FoodDonorResponseDto> responseDto = foodDonorService.getFoodDonorsByCollectionCenterId(collectionCenterId);
        return ResponseEntity.ok(responseDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FoodDonorResponseDto> updateFoodDonor(
            @PathVariable Long id,
            @Valid @RequestBody FoodDonorRequestDto dto
    ) {
        FoodDonorResponseDto responseDto = foodDonorService.updateFoodDonor(id, dto);
        return ResponseEntity.ok(responseDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFoodDonor(@PathVariable Long id){
        foodDonorService.deleteFoodDonor(id);
        return ResponseEntity.noContent().build();
    }

}
