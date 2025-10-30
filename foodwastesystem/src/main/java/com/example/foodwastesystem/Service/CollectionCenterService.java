package com.example.foodwastesystem.Service;

import com.example.foodwastesystem.dto.CollectionCenterRequestDto;
import com.example.foodwastesystem.dto.CollectionCenterResponseDto;
import com.example.foodwastesystem.mapper.CollectionCenterMapper;
import com.example.foodwastesystem.model.CollectionCenter;
import com.example.foodwastesystem.repository.CollectionCenterRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CollectionCenterService {

    private final CollectionCenterRepository collectionCenterRepository;
    private final CollectionCenterMapper collectionCenterMapper;


    public CollectionCenterService(CollectionCenterRepository collectionCenterRepository, CollectionCenterMapper collectionCenterMapper) {
        this.collectionCenterRepository = collectionCenterRepository;
        this.collectionCenterMapper = collectionCenterMapper;
    }

    @Transactional
    public CollectionCenterResponseDto createCollection(CollectionCenterRequestDto dto) {

        CollectionCenter collectionCenter = collectionCenterMapper.toEntity(dto);
        CollectionCenter savedCollectionCenter = collectionCenterRepository.save(collectionCenter);
        return collectionCenterMapper.toDto(savedCollectionCenter);
    }

    public CollectionCenterResponseDto getCollectionCenterById(Long id) {
        CollectionCenter collectionCenter = collectionCenterRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Collection Center not found with id: " + id));
        return collectionCenterMapper.toDto(collectionCenter);
    }

    public CollectionCenterResponseDto getAllCollectionCenters() {
        return collectionCenterRepository.findAll().stream()
                .map(collectionCenterMapper::toDto)
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Collection Center not found"));
    }

    public List<CollectionCenterResponseDto> getByWasteProcessorId(Long wasteProcessorId) {
        return collectionCenterRepository.findByWasteProcessorId(wasteProcessorId).stream()
                .map(collectionCenterMapper::toDto)
                .toList();
    }

    public List<CollectionCenterResponseDto> getByLocation(String location) {
        return collectionCenterRepository.findByLocationContainingIgnoreCase(location).stream()
                .map(collectionCenterMapper::toDto)
                .toList();
    }

    @Transactional
    public CollectionCenterResponseDto updateCollectionCenter(Long id, CollectionCenterRequestDto dto) {
        CollectionCenter collectionCenter = collectionCenterRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Collection Center not found with id: " + id));
        collectionCenterMapper.updateCollectionCenter(dto, collectionCenter);
        CollectionCenter savedCollectionCenter = collectionCenterRepository.save(collectionCenter);
        return collectionCenterMapper.toDto(savedCollectionCenter);
    }

    @Transactional
    public void deleteCollectionCenter(Long id) {
        if (!collectionCenterRepository.existsById(id)){
            throw new RuntimeException("Collection Center not found with id: " + id);
        }
        collectionCenterRepository.deleteById(id);
    }
}
