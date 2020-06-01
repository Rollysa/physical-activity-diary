package com.barboraroland.thesis.backend.service;

import com.barboraroland.thesis.backend.exception.EmailAlreadyExistsException;
import com.barboraroland.thesis.backend.exception.EmailNotFoundException;
import com.barboraroland.thesis.backend.exception.InvalidPasswordResetTokenException;
import dto.PasswordResetDto;
import model.Activity;
import model.PasswordResetToken;
import model.Person;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import repository.PasswordResetTokenRepository;
import repository.PersonRepository;

import javax.persistence.EntityNotFoundException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class PersonServiceImpl implements PersonService {

    private final Logger LOG = LoggerFactory.getLogger(PersonServiceImpl.class);

    private final PersonRepository personRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final EmailService emailService;

    @Autowired
    public PersonServiceImpl(PersonRepository personRepository, BCryptPasswordEncoder bCryptPasswordEncoder, PasswordResetTokenRepository passwordResetTokenRepository,
                             EmailService emailService) {
        this.personRepository = personRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.passwordResetTokenRepository = passwordResetTokenRepository;
        this.emailService = emailService;
    }

    @Override
    public Person createPerson(Person newPerson) {
        LOG.info("Request to create a new person: {}", newPerson);
        try {
            newPerson.setPassword(bCryptPasswordEncoder.encode(newPerson.getPassword()));
            newPerson.setEmail(newPerson.getEmail());
            newPerson.setConfirmPassword("");

            return personRepository.save(newPerson);
        } catch (Exception e) {
            throw new EmailAlreadyExistsException("Email '" + newPerson.getEmail() + "' already exists");
        }
    }

    @Override
    public Person getPersonById(Long personId, String email) {
        LOG.info("Request to retrieve a person.");
        Person person = personRepository.findById(personId).orElseThrow(() -> new EntityNotFoundException("Person not found."));
        return person;
    }

    @Override
    public Person updatePersonById(Long personId, Person person, String email) {
        LOG.info("Request to update a person: {}", person);
        Person updatedPerson = personRepository.findById(personId).orElseThrow(() -> new EntityNotFoundException("Person not found."));
        List<Activity> activities = updatedPerson.getActivities();
        updatedPerson = person;
        updatedPerson.setActivities(activities);
        return personRepository.save(updatedPerson);
    }

    @Override
    public void forgotPassword(String email, HttpServletRequest request) {
        LOG.info("Process to forgot password for an email: {}", email);
        Person person = personRepository.findByEmail(email);
        if (person == null) {
            throw new EmailNotFoundException("The provided email address does not exist.");
        }
        String token = UUID.randomUUID().toString();
        createPasswordResetTokenForUser(person, token);
        String messageBody = createUrl(request, token);
        emailService.constructEmail(email, "Reset Password Request", "To reset your password, click this link: " + messageBody);
    }

    @Override
    public void changePassword(String token, HttpServletRequest request, HttpServletResponse response) throws IOException {
        LOG.info("Process to change the password for a token: {}", token);
        validatePasswordResetToken(token);
        response.sendRedirect(createUrl(request, token));
    }

    @Override
    public void savePassword(String token, PasswordResetDto passwordResetDto) {
        LOG.info("Save a new password.");
        validatePasswordResetToken(passwordResetDto.getToken());
        PasswordResetToken passwordResetToken = passwordResetTokenRepository.findByToken(passwordResetDto.getToken());
        Person person = passwordResetToken.getPerson();
        if (person != null) {
            changePersonPassword(person, passwordResetDto.getPassword());
            passwordResetTokenRepository.deleteById(passwordResetToken.getId());
        } else {
            throw new EntityNotFoundException("Person not found.");
        }
    }

    private void createPasswordResetTokenForUser(Person person, String token) {
        PasswordResetToken myToken = new PasswordResetToken(person, token);
        passwordResetTokenRepository.save(myToken);
    }

    private String validatePasswordResetToken(String token) {
        PasswordResetToken resetToken =
                passwordResetTokenRepository.findByToken(token);
        if (resetToken == null) {
            throw new InvalidPasswordResetTokenException("Token not found.");
        }

        LocalDateTime now = LocalDateTime.now();
        if (resetToken.getCreatedAt().plusMinutes(1400).isBefore(now)) {
            throw new InvalidPasswordResetTokenException("The token has expired, please request a new password reset.");
        }
        return token;
    }

    private String createUrl(HttpServletRequest request, String token) {
        String appUrl = request.getScheme() + "://" + request.getServerName() + ":" + 3000;
        return appUrl + "/resetPassword?token=" + token;
    }

    private void changePersonPassword(Person person, String password) {
        person.setPassword(bCryptPasswordEncoder.encode(password));
        personRepository.save(person);
    }
}
