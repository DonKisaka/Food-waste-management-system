package com.example.foodwastesystem.controller;

import com.example.foodwastesystem.Service.WasteProcessorService;
import com.example.foodwastesystem.dto.WasteProcessorRequestDto;
import com.example.foodwastesystem.dto.WasteProcessorResponseDto;
import com.example.foodwastesystem.model.ProcessingType;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/waste-processor")
public class WasteProcessorController {

    private final WasteProcessorService wasteProcessorService;

    public WasteProcessorController(WasteProcessorService wasteProcessorService) {
        this.wasteProcessorService = wasteProcessorService;
    }

    @PostMapping
    public ResponseEntity<WasteProcessorResponseDto> createWasteProcessor(
            @Valid @RequestBody WasteProcessorRequestDto dto
    ){
        WasteProcessorResponseDto responseDto = wasteProcessorService.createWasteProcessor(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<WasteProcessorResponseDto> getWasteProcessorById(@PathVariable Long id){
        WasteProcessorResponseDto responseDto = wasteProcessorService.getWasteProcessorById(id);
        return ResponseEntity.ok(responseDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<WasteProcessorResponseDto> updateWasteProcessor(
            @PathVariable Long id,
            @Valid @RequestBody WasteProcessorRequestDto dto
    ){
        WasteProcessorResponseDto responseDto = wasteProcessorService.updateWasteProcessor(id, dto);
        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/search")
    public ResponseEntity<List<WasteProcessorResponseDto>> getWasteProcessorByName(
            @RequestParam String name
    ) {
        List<WasteProcessorResponseDto> responseDto = wasteProcessorService.getByName(name);
        return ResponseEntity.ok(responseDto);
    }

    @GetMapping
    public ResponseEntity<List<WasteProcessorResponseDto>> getWasteProcessors(
            @RequestParam(required = false) ProcessingType processingType
            ){
        if(processingType != null) {
            return ResponseEntity.ok(wasteProcessorService.getByProcessingType(processingType));
        }
        else {
            return ResponseEntity.ok(wasteProcessorService.getAllWasteProcessors());
        }
    }




    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWasteProcessor(@PathVariable Long id){
        wasteProcessorService.deleteWasteProcessor(id);
        return ResponseEntity.noContent().build();
    }
}
