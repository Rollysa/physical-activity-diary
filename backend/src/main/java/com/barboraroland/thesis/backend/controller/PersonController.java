package com.barboraroland.thesis.backend.controller;

import com.barboraroland.thesis.backend.payload.JWTLoginSuccessResponse;
import com.barboraroland.thesis.backend.payload.LoginRequest;
import com.barboraroland.thesis.backend.security.JwtTokenProvider;
import com.barboraroland.thesis.backend.service.PersonService;
import com.barboraroland.thesis.backend.validator.FieldValidator;
import com.barboraroland.thesis.backend.validator.PasswordValidator;
import dto.PasswordResetDto;
import model.Person;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.security.Principal;

import static com.barboraroland.thesis.backend.security.SecurityConstants.TOKEN_PREFIX;


@RestController
@RequestMapping(path = "/api/person", produces = MediaType.APPLICATION_JSON_VALUE)
public class PersonController {

    private final FieldValidator fieldValidator;
    private final PersonService personService;
    private final PasswordValidator passwordValidator;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public PersonController(FieldValidator fieldValidator, PersonService personService, PasswordValidator passwordValidator,
                            JwtTokenProvider jwtTokenProvider, AuthenticationManager authenticationManager) {
        this.fieldValidator = fieldValidator;
        this.personService = personService;
        this.passwordValidator = passwordValidator;
        this.jwtTokenProvider = jwtTokenProvider;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerPerson(@Valid @RequestBody Person person, BindingResult result) {
        passwordValidator.validate(person, result);
        ResponseEntity<?> errorMap = fieldValidator.validateFields(result);
        if (errorMap != null) return errorMap;

        Person newPerson = personService.createPerson(person);
        return new ResponseEntity<Person>(newPerson, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticatePerson(@Valid @RequestBody LoginRequest loginRequest, BindingResult result) {
        ResponseEntity<?> errorMap = fieldValidator.validateFields(result);
        if (errorMap != null) return errorMap;

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = TOKEN_PREFIX + jwtTokenProvider.generateToken(authentication);
        return ResponseEntity.ok(new JWTLoginSuccessResponse(true, jwt));
    }

    @GetMapping("/{personId}")
    public ResponseEntity<?> getPerson(@PathVariable Long personId, Principal principal) {
        Person person = personService.getPersonById(personId,
                ((Person) ((UsernamePasswordAuthenticationToken) principal).getPrincipal()).getEmail());
        return new ResponseEntity<>(person, HttpStatus.OK);
    }

    @PutMapping("/{personId}")
    public ResponseEntity<?> updatePerson(@PathVariable Long personId, @Valid @RequestBody Person person,
                                          BindingResult result, Principal principal) {
        ResponseEntity<?> errorMap = fieldValidator.validateFields(result);
        if (errorMap != null) return errorMap;

        Person updatedPerson = personService.updatePersonById(personId, person,
                ((Person) ((UsernamePasswordAuthenticationToken) principal).getPrincipal()).getEmail());
        return new ResponseEntity<>(updatedPerson, HttpStatus.OK);
    }

    @PostMapping("/forgotPassword")
    public void forgotPassword(HttpServletRequest request, @RequestParam("email") String email) {
        personService.forgotPassword(email, request);
    }

    @GetMapping("/resetPassword")
    public void changePassword(@RequestParam("token") String token, HttpServletRequest request, HttpServletResponse response) throws IOException {
        personService.changePassword(token, request, response);
    }

    @PostMapping("/resetPassword")
    public void savePassword(@RequestBody PasswordResetDto passwordResetDto) {
        personService.savePassword(passwordResetDto.getToken(), passwordResetDto);
    }
}
