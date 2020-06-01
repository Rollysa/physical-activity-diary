package com.barboraroland.thesis.backend.security;

public class SecurityConstants {
    public static final String PERSON_URL = "/api/person/*";
    public static final String SECRET_KEY = "SecretKeyToGenJWTs";
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final long EXPIRATION_TIME = 864_000_00;
}
