package com.example.demo.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PhoneDto {

    @NotBlank(message = "Phone number is required")
    private String number;

    @NotBlank(message = "Phone label is required")
    private String label;
}
