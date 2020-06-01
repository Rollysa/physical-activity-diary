package com.barboraroland.thesis.backend.service;

import model.Activity;

import java.util.List;

/**
 * CRUD operations over an physical activity
 */
public interface ActivityService {
    /**
     * Create a new activity for a person
     *
     * @param activity an activity
     * @param email    an email of the person
     * @return the added activity
     */
    Activity createActivity(Activity activity, String email);

    /**
     * Update a specified activity for a person
     *
     * @param activityId an id of the activity
     * @param activity   an activity
     * @param email      an email of the person
     * @return the updated activity
     */
    Activity updateActivityById(Long activityId, Activity activity, String email);

    /**
     * Retrieve a specified activity for a person
     *
     * @param activityId an id of the activity
     * @return the activity
     */
    Activity getActivityById(Long activityId);

    /**
     * Retrieve all activities for a person
     *
     * @param email an email of the person
     * @return the list of all activities
     */
    List<Activity> getAllActivities(String email);

    /**
     * Remove a specified activity for a person
     *
     * @param activityId and id of the activity
     */
    void deleteActivityById(Long activityId);
}
