package com.barboraroland.thesis.backend.service;

import model.Person;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import repository.PersonRepository;

@Service
public class CustomPersonDetailsService implements UserDetailsService {

    private final PersonRepository personRepository;

    @Autowired
    CustomPersonDetailsService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return personRepository.findByEmail(email);
    }

    @Transactional
    public Person loadPersonById(Long id) {
        Person person = personRepository.getById(id);
        if (person == null) new UsernameNotFoundException("Person not found");
        return person;
    }
}
