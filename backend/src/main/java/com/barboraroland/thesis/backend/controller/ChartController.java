package com.barboraroland.thesis.backend.controller;

import com.barboraroland.thesis.backend.service.ChartService;
import model.Person;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping(path = "/api/chart", produces = MediaType.APPLICATION_JSON_VALUE)
public class ChartController {

    private final ChartService chartService;

    @Autowired
    ChartController(ChartService chartService) {
        this.chartService = chartService;
    }

    @GetMapping("distance")
    public Map<String, Double> getDistanceData(Principal principal) {
        return chartService.getLastMonthTotalDistanceData(((Person) ((UsernamePasswordAuthenticationToken) principal).getPrincipal()).getEmail());
    }

    @GetMapping("calories")
    public Map<String, Integer> getCaloriesData(Principal principal) {
        return chartService.getLastMonthTotalCaloriesData(((Person) ((UsernamePasswordAuthenticationToken) principal).getPrincipal()).getEmail());
    }

    @GetMapping("steps")
    public Map<String, Integer> getStepsData(Principal principal) {
        return chartService.getLastMonthTotalStepsData(((Person) ((UsernamePasswordAuthenticationToken) principal).getPrincipal()).getEmail());
    }
}
