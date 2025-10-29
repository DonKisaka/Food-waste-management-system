package com.example.foodwastesystem.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Getter
@Setter
@Table
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FoodWasteItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "food_donor_id")
    @NotNull(message = "Food donor cannot be null")
    private FoodDonor foodDonor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "waste_processor_id")
    private WasteProcessor processor;

    @Column(nullable = false)
    @Positive(message = "Weight cannot be negative")
    @NotNull(message = "Weight cannot be null")
    private Double weightKg;

    @Column(nullable = false)
    @NotNull(message = "Expiration date cannot be null")
    private LocalDate expirationDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private WasteType wasteType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private ProcessingStatus status;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;


}
