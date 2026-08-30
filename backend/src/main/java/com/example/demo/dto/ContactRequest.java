package com.example.demo.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class ContactRequest {

    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @NotBlank(message = "Title is required")
    private String title;

    @Valid
    private List<EmailDto> emails;

    @Valid
    private List<PhoneDto> phones;
}
