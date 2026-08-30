package com.example.demo.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmailDto {

    @NotBlank(message = "Email address is required")
    private String email;

    @NotBlank(message = "Email label is required")
    private String label;
}
