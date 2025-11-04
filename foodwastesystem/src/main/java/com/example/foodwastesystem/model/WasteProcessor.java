package com.example.foodwastesystem.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "waste_processors")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WasteProcessor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    @NotBlank(message = "Name cannot be blank")
    private String name;

    @Column(nullable = false, unique = true)
    @NotBlank(message = "Location cannot be blank")
    private String location;

    @Column(nullable = false, name = "maximum_processing_capacity")
    @NotNull(message = "Maximum processing capacity cannot be null")
    @Positive(message = "Maximum processing capacity cannot be negative")
    private Double maximumProcessingCapacityKg;

    private ProcessingType processingType;

    @OneToMany(mappedBy = "wasteProcessor", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<FoodWasteItem> foodWasteItems = new HashSet<>();

    @OneToMany(mappedBy = "wasteProcessor", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<CollectionCenter> collectionCenters = new HashSet<>();


}
