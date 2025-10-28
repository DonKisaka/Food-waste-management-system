package com.example.foodwastesystem.Controller;

import com.example.foodwastesystem.Dto.AuthenticationResponseDto;
import com.example.foodwastesystem.Dto.CreateUserDto;
import com.example.foodwastesystem.Dto.LoginUserDto;
import com.example.foodwastesystem.Service.AuthenticationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping
    public ResponseEntity<AuthenticationResponseDto> SignUp(
            @Valid @RequestBody CreateUserDto dto
    ) {
        AuthenticationResponseDto responseDto = authenticationService.SignUp(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
    }

    @PostMapping
    public ResponseEntity<AuthenticationResponseDto> authenticate(
            @Valid @RequestBody LoginUserDto dto
    ) {
        AuthenticationResponseDto responseDto = authenticationService.Login(dto);
        return ResponseEntity.ok(responseDto);
    }
}
