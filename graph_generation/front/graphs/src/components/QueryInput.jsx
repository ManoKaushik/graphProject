// // import React, { useState } from "react";
// // import axios from "axios";

// // const API_BASE_URL = "http://localhost:8080"; // Backend API URL

// // const QueryInput = ({ onSQLGenerated }) => {
// //   const [query, setQuery] = useState("");
// //   const [sqlQuery, setSQLQuery] = useState("");

// //   const handleGenerateSQL = async () => {
// //     if (!query.trim()) return;

// //     try {
// //       const response = await axios.post(`${API_BASE_URL}/api/query`, { question: query });
// //       setSQLQuery(response.data.query);
// //       onSQLGenerated(response.data.query); // Send SQL query to parent component
// //     } catch (error) {
// //       console.error("Error generating SQL query:", error);
// //     }
// //   };

// //   return (
// //     <div className="query-input">
// //       <h2>Step 1: Enter Query</h2>
// //       <input
// //         type="text"
// //         placeholder="Ask a question about the data..."
// //         value={query}
// //         onChange={(e) => setQuery(e.target.value)}
// //       />
// //       <button onClick={handleGenerateSQL}>Generate SQL</button>

// //       {sqlQuery && (
// //         <div className="sql-display">
// //           <h3>Generated SQL Query:</h3>
// //           <pre>{sqlQuery}</pre>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default QueryInput;
// import React, { useState } from "react";
// import axios from "axios";

// const API_BASE_URL = "http://localhost:8080"; // Backend API URL

// const QueryInput = ({ onSQLGenerated }) => {
//   const [query, setQuery] = useState("");
//   const [sqlQuery, setSQLQuery] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleGenerateSQL = async () => {
//     if (!query.trim()) return;

//     setLoading(true);
//     setError(null);

//     try {
//       const response = await axios.post(`${API_BASE_URL}/api/query/generate`, { userInput: query });
//       setSQLQuery(response.data.query);
//       console.log(response.data.query);
//       onSQLGenerated(response.data.query); // Send SQL query to parent component
//     } catch (error) {
//       console.error("Error generating SQL query:", error);
//       setError("Failed to generate SQL. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="query-input">
//       <h2>Step 1: Enter Query</h2>
//       <input
//         type="text"
//         placeholder="Ask a question about the data..."
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//       />
//       <button onClick={handleGenerateSQL} disabled={!query.trim() || loading}>
//         {loading ? "Generating..." : "Generate SQL"}
//       </button>

//       {error && <p className="error-message">{error}</p>}

//       {sqlQuery && (
//         <div className="sql-display">
//           <h3>Generated SQL Query:</h3>
//           <pre>{sqlQuery}</pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default QueryInput;
import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080"; // Backend API URL

const QueryInput = ({ onSQLGenerated }) => {
  const [userInput, setUserInput] = useState("");
  const [sqlQuery, setSQLQuery] = useState("");

  const handleGenerateSQL = async () => {
    if (!userInput.trim()) return;

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/query/generate`, // Updated API endpoint
        { userInput }, // Request body
        { headers: { "Content-Type": "application/json" } }
      );

      setSQLQuery(response.data.sqlQuery);
      onSQLGenerated(response.data.sqlQuery); // Send SQL query to parent component
    } catch (error) {
      console.error("Error generating SQL query:", error);
    }
  };

  return (
    <div className="query-input">
      <h2>Step 1: Enter Query</h2>
      <input
        type="text"
        placeholder="Enter a question about the data..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <button onClick={handleGenerateSQL}>Generate SQL</button>

      {sqlQuery && (
        <div className="sql-display">
          <h3>Generated SQL Query:</h3>
          <pre>{sqlQuery}</pre>
        </div>
      )}
    </div>
  );
};

export default QueryInput;
