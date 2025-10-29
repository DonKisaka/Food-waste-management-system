package com.example.foodwastesystem.repository;

import com.example.foodwastesystem.model.FoodDonor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FoodDonorRepository extends JpaRepository<FoodDonor, Long> {
    List<FoodDonor> findByNameContainingIgnoreCase(String name);

    @Query("SELECT fd FROM FoodDonor fd JOIN fd.collectionCenters cc WHERE cc.id = :collectionCenterId")
    List<FoodDonor> findByCollectionCenterId(@Param("collectionCenterId") Long collectionCenterId);
}
