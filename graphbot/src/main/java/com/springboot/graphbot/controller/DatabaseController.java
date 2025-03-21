package com.springboot.graphbot.controller;

import com.springboot.graphbot.service.QueryExecutionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/db")
@CrossOrigin(origins = "http://localhost:5173")
public class DatabaseController {

    @Autowired
    private QueryExecutionService queryExecutionService;

    @PostMapping("/run-query")
    public List<Map<String, Object>> runSQL(@RequestBody Map<String, String> request) {
        String query = request.get("query");
        return queryExecutionService.executeQuery(query);
    }
}