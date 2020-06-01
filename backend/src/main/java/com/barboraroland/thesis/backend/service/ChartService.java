package com.barboraroland.thesis.backend.service;

import java.util.Map;

/**
 * Provides statistics about total distance passed, calories burned and steps for the last 30 days
 */
public interface ChartService {
    /**
     * Retrieve a total distance passed for the last 30 days
     *
     * @param email an email of the user
     * @return a map of the number of distance passed for a specific date
     */
    Map<String, Double> getLastMonthTotalDistanceData(String email);

    /**
     * Retrieve a total calories burned for the last 30 days
     *
     * @param email an email of the user
     * @return a map of the number of calories burned for a specific date
     */
    Map<String, Integer> getLastMonthTotalCaloriesData(String email);

    /**
     * Retrieve a total steps for the last 30 days
     *
     * @param email an email of the user
     * @return a map of the number of steps for a specific date
     */
    Map<String, Integer> getLastMonthTotalStepsData(String email);
}
