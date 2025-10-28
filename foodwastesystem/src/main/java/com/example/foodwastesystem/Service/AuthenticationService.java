package com.example.foodwastesystem.Service;

import com.example.foodwastesystem.Dto.AuthenticationResponseDto;
import com.example.foodwastesystem.Dto.CreateUserDto;
import com.example.foodwastesystem.Dto.LoginUserDto;
import com.example.foodwastesystem.config.JwtService;
import com.example.foodwastesystem.model.User;
import com.example.foodwastesystem.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthenticationService(JwtService jwtService, UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
    }

    public AuthenticationResponseDto SignUp(CreateUserDto dto) {
        if (userRepository.findByEmail(dto.email()).isPresent()) {
            throw new IllegalArgumentException("Email already exists");
        }

        User user = User.builder()
                .email(dto.email())
                .username(dto.username())
                .password(passwordEncoder.encode(dto.password()))
                .enabled(true)
                .build();
        userRepository.save(user);

        String token = jwtService.generateToken(user);
        return new AuthenticationResponseDto(
                token,
                user.getEmail(),
                user.getUsername()
        );
    }

    public AuthenticationResponseDto Login(LoginUserDto dto) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        dto.email(),
                        dto.password()
                )
        );

        User user = userRepository.findByEmail(dto.email())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        String token = jwtService.generateToken(user);
        return new AuthenticationResponseDto(
                token,
                user.getEmail(),
                user.getUsername()
        );

    }
}
