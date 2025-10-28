package com.example.foodwastesystem.Dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record CreateUserDto(
        @NotBlank(message = "Email cannot be blank")
        @Email(message = "Email is not valid")
        String email,

        @NotBlank(message = "Username cannot be blank")
        String username,

        @NotBlank(message = "Password cannot be blank")
        String password
) {}
