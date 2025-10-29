package com.example.foodwastesystem.repository;

import com.example.foodwastesystem.model.ProcessingType;
import com.example.foodwastesystem.model.WasteProcessor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WasteProcessorRepository extends JpaRepository<WasteProcessor, Long> {
    List<WasteProcessor> findByProcessingType(ProcessingType processingType);

    List<WasteProcessor> findByNameContainingIgnoreCase(String name);
}
