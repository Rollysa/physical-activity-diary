package com.barboraroland.thesis.backend.exception;

public class EmailResponse {

    private String email;

    public EmailResponse(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
