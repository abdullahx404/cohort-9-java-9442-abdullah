package com.example.demo.service;

import com.example.demo.dto.ContactRequest;
import com.example.demo.dto.EmailDto;
import com.example.demo.dto.PhoneDto;
import com.example.demo.exception.CustomException;
import com.example.demo.model.Contact;
import com.example.demo.model.EmailAddress;
import com.example.demo.model.PhoneNumber;
import com.example.demo.model.User;
import com.example.demo.repository.ContactRepository;
import com.example.demo.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ContactService {

    private static final Logger logger = LoggerFactory.getLogger(ContactService.class);

    private final ContactRepository contactRepository;
    private final UserRepository userRepository;

    public ContactService(ContactRepository contactRepository, UserRepository userRepository) {
        this.contactRepository = contactRepository;
        this.userRepository = userRepository;
    }

    public Page<Contact> getContacts(String username, String search, Pageable pageable) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new CustomException("User not found"));
        if (search != null && !search.trim().isEmpty()) {
            return contactRepository.searchContacts(user, search.trim(), pageable);
        }
        return contactRepository.findByUser(user, pageable);
    }

    public Contact getContact(String username, Long id) {
        Contact contact = contactRepository.findById(id)
                .orElseThrow(() -> new CustomException("Contact not found"));
        if (!contact.getUser().getUsername().equals(username)) {
            throw new CustomException("Unauthorized access to contact");
        }
        return contact;
    }

    public Contact createContact(String username, ContactRequest request) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new CustomException("User not found"));
        Contact contact = new Contact();
        contact.setUser(user);
        contact.setFirstName(request.getFirstName());
        contact.setLastName(request.getLastName());
        contact.setTitle(request.getTitle());

        if (request.getEmails() != null) {
            for (EmailDto emailDto : request.getEmails()) {
                EmailAddress email = new EmailAddress();
                email.setEmail(emailDto.getEmail());
                email.setLabel(emailDto.getLabel());
                email.setContact(contact);
                contact.getEmails().add(email);
            }
        }

        if (request.getPhones() != null) {
            for (PhoneDto phoneDto : request.getPhones()) {
                PhoneNumber phone = new PhoneNumber();
                phone.setNumber(phoneDto.getNumber());
                phone.setLabel(phoneDto.getLabel());
                phone.setContact(contact);
                contact.getPhones().add(phone);
            }
        }

        Contact savedContact = contactRepository.save(contact);
        logger.info("Contact created: ID={}, Owner={}", savedContact.getId(), username);
        return savedContact;
    }

    public Contact updateContact(String username, Long id, ContactRequest request) {
        Contact contact = contactRepository.findById(id)
                .orElseThrow(() -> new CustomException("Contact not found"));
        if (!contact.getUser().getUsername().equals(username)) {
            throw new CustomException("Unauthorized access to contact");
        }
        contact.setFirstName(request.getFirstName());
        contact.setLastName(request.getLastName());
        contact.setTitle(request.getTitle());

        contact.getEmails().clear();
        if (request.getEmails() != null) {
            for (EmailDto emailDto : request.getEmails()) {
                EmailAddress email = new EmailAddress();
                email.setEmail(emailDto.getEmail());
                email.setLabel(emailDto.getLabel());
                email.setContact(contact);
                contact.getEmails().add(email);
            }
        }

        contact.getPhones().clear();
        if (request.getPhones() != null) {
            for (PhoneDto phoneDto : request.getPhones()) {
                PhoneNumber phone = new PhoneNumber();
                phone.setNumber(phoneDto.getNumber());
                phone.setLabel(phoneDto.getLabel());
                phone.setContact(contact);
                contact.getPhones().add(phone);
            }
        }

        Contact updatedContact = contactRepository.save(contact);
        logger.info("Contact updated: ID={}, Owner={}", updatedContact.getId(), username);
        return updatedContact;
    }

    public void deleteContact(String username, Long id) {
        Contact contact = contactRepository.findById(id)
                .orElseThrow(() -> new CustomException("Contact not found"));
        if (!contact.getUser().getUsername().equals(username)) {
            throw new CustomException("Unauthorized access to contact");
        }
        contactRepository.delete(contact);
        logger.info("Contact deleted: ID={}, Owner={}", id, username);
    }
}
