package com.example.foodwastesystem.repository;

import com.example.foodwastesystem.model.CollectionCenter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CollectionCenterRepository extends JpaRepository<CollectionCenter, Long> {

    List<CollectionCenter> findByWasteProcessorId(Long wasteProcessorId);

    List<CollectionCenter> findByLocationContainingIgnoreCase(String location);
}
