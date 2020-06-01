package com.barboraroland.thesis.backend.service;

import model.Activity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import repository.ActivityRepository;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;
import java.util.TreeMap;

@Service
public class ChartServiceImpl implements ChartService {

    private static final Logger LOG = LoggerFactory.getLogger(ActivityServiceImpl.class);

    private final ActivityRepository activityRepository;

    @Autowired
    public ChartServiceImpl(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }

    @Override
    public Map<String, Double> getLastMonthTotalDistanceData(String email) {
        LOG.info("Retrieving the last month data of the total distance");
        LocalDate currentDate = getCurrentDate();
        LocalDate lowerBound = getMonthAgoDate();
        LocalDate upperBound = LocalDate.from(currentDate.plusDays(1).atStartOfDay());
        HashMap<String, Double> totalDailyDistanceMap = new HashMap<>();

        for (Activity activity : activityRepository.findByPerformingPersonAndDateBetweenOrderByDateAsc(email, lowerBound, upperBound)) {
            String date = String.valueOf(activity.getDate());
            if (!totalDailyDistanceMap.containsKey(date) && activity.getDistance() != null) {
                totalDailyDistanceMap.put(date, activity.getDistance());
            } else if (totalDailyDistanceMap.containsKey(date) && activity.getDistance() != null) {
                Double currentDistance = totalDailyDistanceMap.get(date);
                totalDailyDistanceMap.put(date, activity.getDistance() + currentDistance);
            }
        }
        return sortHashMapByKeyDouble(totalDailyDistanceMap);
    }

    @Override
    public Map<String, Integer> getLastMonthTotalCaloriesData(String email) {
        LOG.info("Retrieving the last month data of the total calories");
        LocalDate currentDate = getCurrentDate();
        LocalDate lowerBound = getMonthAgoDate();
        LocalDate upperBound = LocalDate.from(currentDate.plusDays(1).atStartOfDay());
        HashMap<String, Integer> totalDailyCaloriesMap = new HashMap<>();

        for (Activity activity : activityRepository.findByPerformingPersonAndDateBetweenOrderByDateAsc(email, lowerBound, upperBound)) {
            String date = String.valueOf(activity.getDate());
            if (!totalDailyCaloriesMap.containsKey(date) && activity.getCalories() != null) {
                totalDailyCaloriesMap.put(date, activity.getCalories());
            } else if (totalDailyCaloriesMap.containsKey(date) && activity.getCalories() != null) {
                Integer currentCalories = totalDailyCaloriesMap.get(date);
                totalDailyCaloriesMap.put(date, activity.getCalories() + currentCalories);
            }
        }
        return sortHashMapByKeyInteger(totalDailyCaloriesMap);
    }

    @Override
    public Map<String, Integer> getLastMonthTotalStepsData(String email) {
        LOG.info("Retrieving the last month data of the total steps");
        LocalDate currentDate = getCurrentDate();
        LocalDate lowerBound = getMonthAgoDate();
        LocalDate upperBound = LocalDate.from(currentDate.plusDays(1).atStartOfDay());
        HashMap<String, Integer> totalDailyStepsMap = new HashMap<>();

        for (Activity activity : activityRepository.findByPerformingPersonAndDateBetweenOrderByDateAsc(email, lowerBound, upperBound)) {
            String date = String.valueOf(activity.getDate());
            if (!totalDailyStepsMap.containsKey(date) && activity.getSteps() != null) {
                totalDailyStepsMap.put(date, activity.getSteps());
            } else if (totalDailyStepsMap.containsKey(date) && activity.getSteps() != null) {
                Integer currentSteps = totalDailyStepsMap.get(date);
                totalDailyStepsMap.put(date, activity.getSteps() + currentSteps);
            }
        }
        return sortHashMapByKeyInteger(totalDailyStepsMap);
    }

    private Map<String, Double> sortHashMapByKeyDouble(HashMap<String, Double> totalDailyDistanceMap) {
        TreeMap<String, Double> sorted = new TreeMap<>();
        sorted.putAll(totalDailyDistanceMap);
        return sorted;
    }

    private Map<String, Integer> sortHashMapByKeyInteger(HashMap<String, Integer> totalDailyDistanceMap) {
        TreeMap<String, Integer> sorted = new TreeMap<>();
        sorted.putAll(totalDailyDistanceMap);
        return sorted;
    }

    private LocalDate getCurrentDate() {
        return LocalDate.now();
    }

    private LocalDate getMonthAgoDate() {
        return LocalDate.now().minusMonths(1);
    }
}
