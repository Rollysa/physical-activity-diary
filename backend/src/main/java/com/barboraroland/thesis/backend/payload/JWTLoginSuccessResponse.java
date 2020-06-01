package com.barboraroland.thesis.backend.payload;

import org.springframework.core.style.ToStringCreator;

public class JWTLoginSuccessResponse {

    private boolean success;
    private String token;

    public JWTLoginSuccessResponse(boolean success, String token) {
        this.success = success;
        this.token = token;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    @Override
    public String toString() {
        return new ToStringCreator(this)
                .append("success", success)
                .append("token", token)
                .toString();
    }
}
