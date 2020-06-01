package com.barboraroland.thesis.backend.service;

import dto.PasswordResetDto;
import model.Person;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * CRUD operations over a person and reset a password
 */
public interface PersonService {
    /**
     * Create a new person in the database
     *
     * @param newPerson the person
     * @return the person
     */
    Person createPerson(Person newPerson);

    /**
     * Retrieve a specified person from the database
     *
     * @param personId an id of the person
     * @param email    an email of the person
     * @return the person
     */
    Person getPersonById(Long personId, String email);

    /**
     * Update a specified person in the database
     *
     * @param personId an id of the person
     * @param person   a person
     * @param email    an email of the person
     * @return the updated person
     */
    Person updatePersonById(Long personId, Person person, String email);

    /**
     * Generate a token for a specified person and send an email to the person
     *
     * @param email   an email of the person
     * @param request httpServletRequest
     */
    void forgotPassword(String email, HttpServletRequest request);

    /**
     * Validate a token for resetting a password and redirect on a client
     *
     * @param token    a token
     * @param request  httpServletRequest
     * @param response httpServletResponse
     * @throws IOException
     */
    void changePassword(String token, HttpServletRequest request, HttpServletResponse response) throws IOException;

    /**
     * Save a new password for a specified person
     *
     * @param token            a token
     * @param passwordResetDto passwordResetDto
     */
    void savePassword(String token, PasswordResetDto passwordResetDto);
}
