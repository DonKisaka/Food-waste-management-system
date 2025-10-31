package com.example.foodwastesystem.controller;

import com.example.foodwastesystem.Service.CollectionCenterService;
import com.example.foodwastesystem.dto.CollectionCenterRequestDto;
import com.example.foodwastesystem.dto.CollectionCenterResponseDto;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/collection-centers")
public class CollectionCenterController {

    private final CollectionCenterService collectionCenterService;

    public CollectionCenterController(CollectionCenterService collectionCenterService) {
        this.collectionCenterService = collectionCenterService;
    }

    @PostMapping
    public ResponseEntity<CollectionCenterResponseDto> createCollectionCenter(
            @Valid @RequestBody CollectionCenterRequestDto dto
    ){
        CollectionCenterResponseDto responseDto = collectionCenterService.createCollection(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CollectionCenterResponseDto> updateCollectionCenter(
             @PathVariable Long id,
             @Valid @RequestBody CollectionCenterRequestDto dto
    ) {
        CollectionCenterResponseDto responseDto = collectionCenterService.updateCollectionCenter(id, dto);
        return ResponseEntity.ok(responseDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCollectionCenter(@PathVariable Long id){
        collectionCenterService.deleteCollectionCenter(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CollectionCenterResponseDto> getCollectionCenterById(@PathVariable Long id){
        CollectionCenterResponseDto responseDto = collectionCenterService.getCollectionCenterById(id);
        return ResponseEntity.ok(responseDto);
    }





    @GetMapping
    public ResponseEntity<List<CollectionCenterResponseDto>> getCollectionCenters(
            @RequestParam(required = false) Long wasteProcessorId,
            @RequestParam(required = false) String location
    ){
        if(wasteProcessorId != null) {
            return ResponseEntity.ok(collectionCenterService.getByWasteProcessorId(wasteProcessorId));
        }
        if(location != null) {
            return ResponseEntity.ok(collectionCenterService.getByLocation(location));
        }
        return ResponseEntity.ok(collectionCenterService.getAllCollectionCenters());
    }
}
