package com.example.demo.repository;

import com.example.demo.model.EmailAddress;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmailAddressRepository extends JpaRepository<EmailAddress, Long> {
}
