package com.barboraroland.thesis.backend.validator;

import model.Person;
import org.springframework.stereotype.Service;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;


@Service
public class PasswordValidator implements Validator {

    @Override
    public boolean supports(Class<?> clazz) {
        return Person.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {

        Person person = (Person) target;

        if (person.getPassword().length() < 8) {
            errors.rejectValue("password", "Length", "Password must be at least 8 characters");
        }

        if (!person.getPassword().equals(person.getConfirmPassword())) {
            errors.rejectValue("confirmPassword", "Match", "Passwords do not match");
        }
    }
}
