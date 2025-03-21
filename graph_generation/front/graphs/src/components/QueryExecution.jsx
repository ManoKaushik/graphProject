import React, { useState, useEffect } from "react";
import axios from "axios";
import "./QueryExecution.css"; // Import styling

const API_BASE_URL = "http://localhost:8080";

const QueryExecution = ({ sqlQuery, onQueryResult }) => {
  const [queryResult, setQueryResult] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!sqlQuery) return;

    const runQuery = async () => {
      try {
        const response = await axios.post(
          `${API_BASE_URL}/api/db/run-query`,
          { query: sqlQuery },
          { headers: { "Content-Type": "application/json" } }
        );

        setQueryResult(response.data);
        onQueryResult(response.data); // Send data to App.jsx
        setError("");
      } catch (error) {
        console.error("Error executing SQL query:", error);
        setError("Failed to fetch data from the database.");
      }
    };

    runQuery();
  }, [sqlQuery]);

  return (
    <div className="query-execution">
      <h2>Step 2: Execute SQL Query</h2>

      {sqlQuery && (
        <div className="sql-display">
          <h3>Generated SQL Query:</h3>
          <pre>{sqlQuery}</pre>
        </div>
      )}

      {error && <p className="error">{error}</p>}

      {queryResult.length > 0 && (
        <div className="table-container">
          <h3>Query Results:</h3>
          <table className="styled-table">
            <thead>
              <tr>
                {Object.keys(queryResult[0]).map((column, index) => (
                  <th key={index}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {queryResult.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.values(row).map((value, colIndex) => (
                    <td key={colIndex}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default QueryExecution;
