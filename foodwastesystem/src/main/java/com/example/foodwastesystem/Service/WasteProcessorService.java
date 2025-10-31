package com.example.foodwastesystem.Service;

import com.example.foodwastesystem.dto.WasteProcessorRequestDto;
import com.example.foodwastesystem.dto.WasteProcessorResponseDto;
import com.example.foodwastesystem.mapper.WasteProcessorMapper;
import com.example.foodwastesystem.model.ProcessingType;
import com.example.foodwastesystem.model.WasteProcessor;
import com.example.foodwastesystem.repository.WasteProcessorRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class WasteProcessorService {

    private final WasteProcessorRepository wasteProcessorRepository;
    private final WasteProcessorMapper wasteProcessorMapper;

    public WasteProcessorService(WasteProcessorRepository wasteProcessorRepository, WasteProcessorMapper wasteProcessorMapper) {
        this.wasteProcessorRepository = wasteProcessorRepository;
        this.wasteProcessorMapper = wasteProcessorMapper;
    }

    @Transactional
    public WasteProcessorResponseDto createWasteProcessor(WasteProcessorRequestDto dto) {

        WasteProcessor wasteProcessor = wasteProcessorMapper.toEntity(dto);
        WasteProcessor savedWasteProcessor = wasteProcessorRepository.save(wasteProcessor);
        return wasteProcessorMapper.toDto(savedWasteProcessor);
    }

    public WasteProcessorResponseDto getWasteProcessorById(Long id) {
        WasteProcessor wasteProcessor = wasteProcessorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Waste Processor not found with id: " + id));
        return wasteProcessorMapper.toDto(wasteProcessor);
    }

    @Transactional
    public WasteProcessorResponseDto updateWasteProcessor(Long id, WasteProcessorRequestDto dto) {
        WasteProcessor wasteProcessor = wasteProcessorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Waste Processor not found with id: " + id));
        wasteProcessorMapper.updateWasteProcessor(dto, wasteProcessor);
        WasteProcessor savedWasteProcessor = wasteProcessorRepository.save(wasteProcessor);
        return wasteProcessorMapper.toDto(savedWasteProcessor);
    }


    public List<WasteProcessorResponseDto> getAllWasteProcessors(){
        return wasteProcessorRepository.findAll().stream()
                .map(wasteProcessorMapper::toDto)
                .toList();
    }

    public List<WasteProcessorResponseDto> getByProcessingType(ProcessingType processingType){
        return wasteProcessorRepository.findByProcessingType(processingType).stream()
                .map(wasteProcessorMapper::toDto)
                .toList();
    }

    public List<WasteProcessorResponseDto> getByName(String name) {
        return wasteProcessorRepository.findByNameContainingIgnoreCase(name).stream()
                .map(wasteProcessorMapper::toDto)
                .toList();
    }

    @Transactional
    public void deleteWasteProcessor(Long id) {
        if (!wasteProcessorRepository.existsById(id)){
            throw new RuntimeException("Waste Processor not found with id: " + id);
        }
        wasteProcessorRepository.deleteById(id);
    }
}
