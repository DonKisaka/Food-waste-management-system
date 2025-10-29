package com.example.foodwastesystem.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "collection_centers")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CollectionCenter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @NotBlank(message = "Name cannot be blank")
    private String location;

    @Column(nullable = false, name = "maximum_capacity")
    @NotNull(message = "Maximum capacity cannot be null")
    @Positive(message = "Maximum capacity cannot be negative")
    private Double maximumCapacityKg;

    @ManyToMany(mappedBy = "collectionCenters")
    @Builder.Default
    private Set<FoodDonor> foodDonors = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "waste_processor_id", nullable = false)
    private WasteProcessor wasteProcessor;


}

