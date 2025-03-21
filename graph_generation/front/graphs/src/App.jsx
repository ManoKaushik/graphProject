import React, { useState } from "react";
import QueryInput from "./components/QueryInput";
import QueryExecution from "./components/QueryExecution";
import DataVisualization from "./components/DataVisualization";

const App = () => {
  const [generatedSQL, setGeneratedSQL] = useState(""); // Store SQL query
  const [queryResult, setQueryResult] = useState([]);   // Store DB results

  return (
    <div className="app">
      <h1>SQL Query Bot</h1>

      {/* Step 1: Generate SQL */}
      <QueryInput onSQLGenerated={setGeneratedSQL} />

      {/* Step 2: Execute SQL */}
      <QueryExecution sqlQuery={generatedSQL} onQueryResult={setQueryResult} />

      {/* Step 3: Visualize Data */}
      <DataVisualization data={queryResult} />
    </div>
  );
};

export default App;
