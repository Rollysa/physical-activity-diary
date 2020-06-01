package com.barboraroland.thesis.backend.exception;

public class InvalidPasswordResetTokenResponse {

    private String token;

    public InvalidPasswordResetTokenResponse(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
