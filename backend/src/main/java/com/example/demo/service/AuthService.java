package com.example.demo.service;

import com.example.demo.dto.ChangePasswordRequest;
import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.LoginResponse;
import com.example.demo.dto.RegisterRequest;
import com.example.demo.exception.CustomException;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
public class AuthService {

    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, TokenService tokenService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenService = tokenService;
    }

    public void register(RegisterRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new CustomException("Username already exists");
        }
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(user);
        logger.info("User registered: {}", request.getUsername());
    }

    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new CustomException("Invalid username or password"));
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new CustomException("Invalid username or password");
        }
        String token = UUID.randomUUID().toString();
        tokenService.createToken(token, user.getUsername());
        logger.info("User logged in: {}", request.getUsername());
        return new LoginResponse(token, user.getUsername());
    }

    public void changePassword(String username, ChangePasswordRequest request) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new CustomException("User not found"));
        if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
            throw new CustomException("Invalid old password");
        }
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
        logger.info("Password changed for user: {}", username);
    }

    public void logout(String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            String username = tokenService.getUsernameByToken(token);
            if (username != null) {
                tokenService.removeToken(token);
                logger.info("User logged out: {}", username);
            }
        }
    }
}
