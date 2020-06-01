package com.barboraroland.thesis.backend.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;


@Component
public class EmailServiceImpl implements EmailService {

    private final Logger LOG = LoggerFactory.getLogger(ActivityServiceImpl.class);

    private final JavaMailSender javaMailSender;


    @Autowired
    public EmailServiceImpl(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    @Override
    public void constructEmail(String recipient, String subject, String messageBody) {
        LOG.info("Create an email.");
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(recipient);
        message.setSubject(subject);
        message.setText(messageBody);
        message.setFrom("no-reply@email.com");
        javaMailSender.send(message);
    }
}

