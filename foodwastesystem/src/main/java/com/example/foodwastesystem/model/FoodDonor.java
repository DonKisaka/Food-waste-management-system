package com.example.foodwastesystem.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "food_donors")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FoodDonor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false, unique = true)
    private String address;

    @Column(nullable = false, unique = true)
    private String contactInfo;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime registrationDate;


    @OneToMany(mappedBy = "foodDonor", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<FoodWasteItem> foodWasteItems = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "donor_collection_center",
            joinColumns = @JoinColumn(name = "donor_id"),
            inverseJoinColumns = @JoinColumn(name = "collection_center_id")
    )
    @Builder.Default
    private Set<CollectionCenter> collectionCenters = new HashSet<>();
}
