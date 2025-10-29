package com.example.foodwastesystem.repository;

import com.example.foodwastesystem.model.FoodWasteItem;
import com.example.foodwastesystem.model.WasteType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FoodWasteItemRepository extends JpaRepository<FoodWasteItem, Long> {
    List<FoodWasteItem> findByFoodDonorId(Long foodDonorId);

    List<FoodWasteItem> findByWasteType(WasteType wasteType);
}
