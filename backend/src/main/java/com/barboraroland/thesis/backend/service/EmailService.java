package com.barboraroland.thesis.backend.service;

public interface EmailService {

    /**
     * Create an email and send it to a specified recipient
     *
     * @param recipient   a recipient
     * @param subject     a subject of the email
     * @param messageBody a body of the email
     */
    void constructEmail(String recipient, String subject, String messageBody);
}
