package com.springboot.graphbot.service;

import org.json.JSONObject;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class GeminiService {
    
    private static final String GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent";
    private static final String API_KEY = "AIzaSyDyQKaqHOwwXmpek5nVhDp4dg9uCrLUWYk";

    public String generateSQLQuery(String userInput) {
        RestTemplate restTemplate = new RestTemplate();
        
        // Constructing the AI prompt
        String prompt = "You are an advanced SQL Query Generator Bot specializing in generating SQL queries for dynamic report and graph generation based on user inputs. Your goal is to accurately translate user instructions into optimized SQL queries for retrieving data from a structured relational database. User Input Expectations: Users will provide natural language instructions, specifying whether they need a report (detailed tabular data) or a graph (concise, structured data for visualization). Based on their input, generate the most appropriate SQL query. Database Schema Reference students_data Table: Stores student details Key fields: roll_number, name, department, section, FA, email, password technical_events_data Table: Stores student participation in technical events Key fields: event_id, student_roll_number, category, event_name, event_date, location, awards, description, proof, approved cultural_events_data Table: Stores student participation in cultural events Key fields: cultural_event_id, student_roll_number, category, event_name, event_date, location, awards, description, proof, approved internship_data Table: Stores student internships Key fields: internship_id, student_roll_number, company, role, description, start_date, end_date, location, stipend, offer_letter, approved placements_data Table: Stores student placements Key fields: placement_id, student_roll_number, company, location, role, ctc, description, joining_date, core, hiring_mode, offer_letter, approved research_papers Table: Stores student research papers Key fields: paper_id, student_roll_number, title, authors, affiliations, orcid_id, abstract, intro, review, methodology, result, discussion, conclusions, journal_name, volume_issue, doi, license, bibliography, approved societies_clubs Table: Stores student membership in societies/clubs Key fields: club_id, student_roll_number, category, name, membership_type, description, proof, approved sports_events Table: Stores student participation in sports events Key fields: sport_id, student_roll_number, category, participation_type, location, date, awards, description, proof, approved Each table references roll_number in students_data Query Generation Logic: Identify Intent: If the user asks for a report, retrieve all relevant columns. If the user asks for a graph, return only the necessary fields for visualization. Recognize Filters: Users may request data by year, program, salary range, company, or percentage. Ensure the query applies relevant WHERE clauses. Determine Aggregations (if applicable): If the user requests statistics like average salary trends or total placements, generate GROUP BY and AVG(), SUM(), or COUNT() functions as needed. Sort Data: If the user specifies ranking (e.g., \\\"Top 5 highest paying companies\\\"), generate ORDER BY with LIMIT.\n"
                +
                "Strictly adhere to the schema provided. Follow only MYSQL functions. Return only the SQL query without any markdown formatting or explanations.\n" +
                "Make sure to confirm the presence of the columns you choose in the database schema provided.\n" +
                "Example Input: Generate a report of all students who participated in technical events with their event details.\n" +
                "Example Output: SELECT students_data.roll_number, students_data.name, technical_events_data.event_name, technical_events_data.event_date, technical_events_data.location FROM students_data JOIN technical_events_data ON students_data.roll_number = technical_events_data.student_roll_number;\n\n" +
                "Example Input: Show a bar chart of the number of students participating in each category of cultural events.\n" +
                "Example Output: SELECT category, COUNT(student_roll_number) FROM cultural_events_data GROUP BY category;\n\n" +
                "Example Input: Get the top 5 companies that provided the highest placement offers.\n" +
                "Example Output: SELECT company, COUNT(placement_id) AS total_offers FROM placements_data GROUP BY company ORDER BY total_offers DESC LIMIT 5;\n\n" +
                "User Input: " + userInput;
        
        // Creating request payload
        JSONObject requestBody = new JSONObject();
        requestBody.put("contents", new org.json.JSONArray().put(new JSONObject().put("parts", new org.json.JSONArray().put(new JSONObject().put("text", prompt)))));
        requestBody.put("generationConfig", new JSONObject().put("temperature", 1).put("topP", 0.95).put("topK", 40).put("maxOutputTokens", 8192));
        
        // Setting request headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("x-goog-api-key", API_KEY);
        
        // Sending request
        HttpEntity<String> entity = new HttpEntity<>(requestBody.toString(), headers);
        ResponseEntity<String> response = restTemplate.exchange(GEMINI_API_URL, HttpMethod.POST, entity, String.class);
        
        try {
            // Extracting response
            JSONObject jsonResponse = new JSONObject(response.getBody());
            org.json.JSONArray candidates = jsonResponse.optJSONArray("candidates");
            
            if (candidates != null && candidates.length() > 0) {
                JSONObject firstCandidate = candidates.getJSONObject(0);
                org.json.JSONArray contentParts = firstCandidate.optJSONObject("content").optJSONArray("parts");
                
                if (contentParts != null && contentParts.length() > 0) {
                    String sqlQuery = contentParts.getJSONObject(0).optString("text", "Failed to generate SQL query.");
                    return sqlQuery.replaceAll("```sql|```", "").trim().replace("\n", " ");
                }
            }
        } catch (Exception e) {
            System.err.println("Error parsing Gemini API response: " + e.getMessage());
        }
        
        return "Failed to generate SQL query.";
    }
}
