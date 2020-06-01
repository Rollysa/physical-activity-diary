package com.barboraroland.thesis.backend.service;

import model.Activity;
import model.Person;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import repository.ActivityRepository;
import repository.PersonRepository;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class ActivityServiceImpl implements ActivityService {

    private final Logger LOG = LoggerFactory.getLogger(ActivityServiceImpl.class);

    private final ActivityRepository activityRepository;

    private final PersonRepository personRepository;

    @Autowired
    public ActivityServiceImpl(ActivityRepository activityRepository, PersonRepository personRepository) {
        this.activityRepository = activityRepository;
        this.personRepository = personRepository;
    }

    @Override
    public Activity createActivity(Activity activity, String email) {
        LOG.info("Request to create a new activity: {}", activity);
        Person person = personRepository.findByEmail(email);
        activity.setPerformingPerson(person.getEmail());
        person.addActivity(activity);
        return activityRepository.save(activity);
    }

    @Override
    public Activity updateActivityById(Long activityId, Activity activity, String email) {
        LOG.info("Request to update an activity: {}", activity);
        Activity updatedActivity = activityRepository.findById(activityId).orElseThrow(() -> new EntityNotFoundException("Activity not found"));
        Person person = personRepository.findByEmail(email);
        activity.setPerformingPerson(person.getEmail());
        updatedActivity = activity;
        person.addActivity(updatedActivity);
        return activityRepository.save(updatedActivity);
    }

    @Override
    public Activity getActivityById(Long activityId) {
        LOG.info("Request to retrieve an activity: {}", activityId);
        Activity activity = activityRepository.findById(activityId).orElseThrow(() -> new EntityNotFoundException("Activity not found"));
        return activity;
    }

    @Override
    public List<Activity> getAllActivities(String email) {
        LOG.info("Request to retrieve all activities.");
        return activityRepository.findAllByPerformingPerson(email);
    }

    @Override
    public void deleteActivityById(Long activityId) {
        LOG.info("Request to delete an activity: {}", activityId);
        activityRepository.deleteById(activityId);
    }
}
