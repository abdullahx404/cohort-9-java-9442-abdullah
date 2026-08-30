package com.example.demo.service;

import com.example.demo.dto.ContactRequest;
import com.example.demo.dto.EmailDto;
import com.example.demo.dto.PhoneDto;
import com.example.demo.exception.CustomException;
import com.example.demo.model.Contact;
import com.example.demo.model.User;
import com.example.demo.repository.ContactRepository;
import com.example.demo.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import java.util.Collections;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class ContactServiceTest {

    @Mock
    private ContactRepository contactRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private ContactService contactService;

    private User user;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        user = new User();
        user.setUsername("testuser");
    }

    @Test
    void getContactsWithoutSearch() {
        Pageable pageable = PageRequest.of(0, 10);
        Page<Contact> expectedPage = new PageImpl<>(Collections.emptyList());

        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        when(contactRepository.findByUser(user, pageable)).thenReturn(expectedPage);

        Page<Contact> result = contactService.getContacts("testuser", null, pageable);

        assertNotNull(result);
        verify(contactRepository, times(1)).findByUser(user, pageable);
    }

    @Test
    void getContactsWithSearch() {
        Pageable pageable = PageRequest.of(0, 10);
        Page<Contact> expectedPage = new PageImpl<>(Collections.emptyList());

        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        when(contactRepository.searchContacts(user, "john", pageable)).thenReturn(expectedPage);

        Page<Contact> result = contactService.getContacts("testuser", "john", pageable);

        assertNotNull(result);
        verify(contactRepository, times(1)).searchContacts(user, "john", pageable);
    }

    @Test
    void getContactSuccess() {
        Contact contact = new Contact();
        contact.setUser(user);

        when(contactRepository.findById(1L)).thenReturn(Optional.of(contact));

        Contact result = contactService.getContact("testuser", 1L);

        assertNotNull(result);
        assertEquals(user, result.getUser());
    }

    @Test
    void getContactUnauthorized() {
        User otherUser = new User();
        otherUser.setUsername("otheruser");

        Contact contact = new Contact();
        contact.setUser(otherUser);

        when(contactRepository.findById(1L)).thenReturn(Optional.of(contact));

        assertThrows(CustomException.class, () -> contactService.getContact("testuser", 1L));
    }

    @Test
    void createContactSuccess() {
        ContactRequest request = new ContactRequest();
        request.setFirstName("John");
        request.setLastName("Doe");
        request.setTitle("Manager");

        EmailDto email = new EmailDto();
        email.setEmail("john.doe@example.com");
        email.setLabel("work");
        request.setEmails(Collections.singletonList(email));

        PhoneDto phone = new PhoneDto();
        phone.setNumber("1234567890");
        phone.setLabel("home");
        request.setPhones(Collections.singletonList(phone));

        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        when(contactRepository.save(any(Contact.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Contact result = contactService.createContact("testuser", request);

        assertNotNull(result);
        assertEquals("John", result.getFirstName());
        assertEquals(1, result.getEmails().size());
        assertEquals("john.doe@example.com", result.getEmails().get(0).getEmail());
        assertEquals(1, result.getPhones().size());
        assertEquals("1234567890", result.getPhones().get(0).getNumber());
    }

    @Test
    void updateContactSuccess() {
        Contact contact = new Contact();
        contact.setUser(user);
        contact.setFirstName("OldName");

        ContactRequest request = new ContactRequest();
        request.setFirstName("NewName");
        request.setLastName("NewLastName");
        request.setTitle("NewTitle");

        when(contactRepository.findById(1L)).thenReturn(Optional.of(contact));
        when(contactRepository.save(any(Contact.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Contact result = contactService.updateContact("testuser", 1L, request);

        assertNotNull(result);
        assertEquals("NewName", result.getFirstName());
        verify(contactRepository, times(1)).save(contact);
    }

    @Test
    void deleteContactSuccess() {
        Contact contact = new Contact();
        contact.setUser(user);

        when(contactRepository.findById(1L)).thenReturn(Optional.of(contact));

        contactService.deleteContact("testuser", 1L);

        verify(contactRepository, times(1)).delete(contact);
    }
}
