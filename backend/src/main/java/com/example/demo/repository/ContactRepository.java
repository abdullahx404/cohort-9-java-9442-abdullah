package com.example.demo.repository;

import com.example.demo.model.Contact;
import com.example.demo.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ContactRepository extends JpaRepository<Contact, Long> {
    @Query("SELECT c FROM Contact c WHERE c.user = :user AND (LOWER(c.firstName) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(c.lastName) LIKE LOWER(CONCAT('%', :query, '%')))")
    Page<Contact> searchContacts(@Param("user") User user, @Param("query") String query, Pageable pageable);

    Page<Contact> findByUser(User user, Pageable pageable);
}
