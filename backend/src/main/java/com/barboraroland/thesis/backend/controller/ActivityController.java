package com.barboraroland.thesis.backend.controller;

import com.barboraroland.thesis.backend.service.ActivityService;
import com.barboraroland.thesis.backend.validator.FieldValidator;
import model.Activity;
import model.Person;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.EntityNotFoundException;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping(path = "/api/activity", produces = MediaType.APPLICATION_JSON_VALUE)
public class ActivityController {

    private final ActivityService activityService;
    private final FieldValidator fieldValidator;

    @Autowired
    ActivityController(ActivityService activityService, FieldValidator fieldValidator) {
        this.activityService = activityService;
        this.fieldValidator = fieldValidator;
    }

    @PostMapping()
    public ResponseEntity<?> addActivity(@Valid @RequestBody Activity activity, BindingResult result, Principal principal) {
        ResponseEntity<?> errorMap = fieldValidator.validateFields(result);
        if (errorMap != null) return errorMap;

        Activity createdActivity = activityService.createActivity(activity, ((Person) ((UsernamePasswordAuthenticationToken) principal).getPrincipal()).getEmail());
        return new ResponseEntity<>(createdActivity, HttpStatus.CREATED);
    }

    @PutMapping("/{activityId}")
    public ResponseEntity<?> updateActivity(@PathVariable Long activityId, @Valid @RequestBody Activity activity, BindingResult result, Principal principal) {
        ResponseEntity<?> errorMap = fieldValidator.validateFields(result);
        if (errorMap != null) return errorMap;

        Activity updatedActivity = activityService.updateActivityById(activityId, activity, ((Person) ((UsernamePasswordAuthenticationToken) principal).getPrincipal()).getEmail());
        return new ResponseEntity<>(updatedActivity, HttpStatus.OK);
    }

    @GetMapping("/{activityId}")
    public ResponseEntity<?> getActivity(@PathVariable Long activityId) {
        Activity activity = activityService.getActivityById(activityId);
        return new ResponseEntity<>(activity, HttpStatus.OK);
    }

    @GetMapping()
    public List<Activity> getAllActivities(Principal principal) {
        return activityService.getAllActivities(((Person) ((UsernamePasswordAuthenticationToken) principal).getPrincipal()).getEmail());
    }

    @DeleteMapping("/{activityId}")
    public ResponseEntity<?> deleteActivity(@PathVariable Long activityId) {
        activityService.deleteActivityById(activityId);
        return new ResponseEntity<>("Activity with ID: '" + activityId + "' has been deleted!", HttpStatus.OK);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public void handleEntityNotFound(Exception ex, HttpServletResponse response) throws IOException {
        response.setStatus(HttpStatus.NOT_FOUND.value());
        response.getOutputStream().write(ex.getMessage().getBytes());
    }
}
