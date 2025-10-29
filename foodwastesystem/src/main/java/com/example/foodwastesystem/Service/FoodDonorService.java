package com.example.foodwastesystem.Service;

import com.example.foodwastesystem.dto.FoodDonorResponseDto;
import com.example.foodwastesystem.model.User;
import com.example.foodwastesystem.repository.FoodDonorRepository;
import com.example.foodwastesystem.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class FoodDonorService {

    private final FoodDonorRepository foodDonorRepository;
    private final UserRepository userRepository;

    public FoodDonorService(FoodDonorRepository foodDonorRepository) {
        this.foodDonorRepository = foodDonorRepository;
    }

    @Transactional
    public FoodDonorResponseDto createFoodDonor(FoodDonorResponseDto dto) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User currentUser = userRepository.findByEmail(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }
}
