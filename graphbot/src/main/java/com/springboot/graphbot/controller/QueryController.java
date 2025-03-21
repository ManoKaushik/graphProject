package com.springboot.graphbot.controller;

import com.springboot.graphbot.service.GeminiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

import java.util.Map;

@RestController
@RequestMapping("/api/query")
@CrossOrigin(origins = "http://localhost:5173")
public class QueryController {
    private static final Logger logger = LoggerFactory.getLogger(QueryController.class);

    @Autowired
    private GeminiService geminiService;


    // Generate SQL Query
    @PostMapping("/generate")
    public Map<String, String> generateSQL(@RequestBody Map<String, String> request) {
        logger.info("Request received: {}", request); // Correct way to log

        String userInput = request.get("userInput");
        String sqlQuery = geminiService.generateSQLQuery(userInput);

        Map<String, String> response = new HashMap<>();
        response.put("sqlQuery", sqlQuery);
        return response;
    }
}
