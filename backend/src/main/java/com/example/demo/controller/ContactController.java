package com.example.demo.controller;

import com.example.demo.dto.ContactRequest;
import com.example.demo.model.Contact;
import com.example.demo.service.ContactService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contacts")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @GetMapping
    public ResponseEntity<Page<Contact>> getContacts(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String search) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("firstName").ascending());
        return ResponseEntity.ok(contactService.getContacts(userDetails.getUsername(), search, pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Contact> getContact(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id) {
        return ResponseEntity.ok(contactService.getContact(userDetails.getUsername(), id));
    }

    @PostMapping
    public ResponseEntity<Contact> createContact(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody ContactRequest request) {
        return ResponseEntity.ok(contactService.createContact(userDetails.getUsername(), request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Contact> updateContact(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id,
            @Valid @RequestBody ContactRequest request) {
        return ResponseEntity.ok(contactService.updateContact(userDetails.getUsername(), id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContact(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id) {
        contactService.deleteContact(userDetails.getUsername(), id);
        return ResponseEntity.ok().build();
    }
}
