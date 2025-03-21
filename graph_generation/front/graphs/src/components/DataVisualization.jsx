import React, { useState } from "react";
import Plot from "react-plotly.js";

const DataVisualization = ({ data }) => {
  const [graphType, setGraphType] = useState("bar");
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");

  if (!data || data.length === 0) {
    return <p>No data available. Run a query first.</p>;
  }

  const columns = Object.keys(data[0]); // Extract column names

  return (
    <div className="data-visualization">
      <h2>Step 3: Visualize Data</h2>

      {/* Graph Type Selection */}
      <label>Graph Type:</label>
      <select value={graphType} onChange={(e) => setGraphType(e.target.value)}>
        <option value="bar">Bar Chart</option>
        <option value="line">Line Chart</option>
        <option value="pie">Pie Chart</option>
      </select>

      {/* X-Axis Selection */}
      <label>X-Axis:</label>
      <select value={xAxis} onChange={(e) => setXAxis(e.target.value)}>
        <option value="">Select Column</option>
        {columns.map((col) => (
          <option key={col} value={col}>
            {col}
          </option>
        ))}
      </select>

      {/* Y-Axis Selection */}
      {graphType !== "pie" && (
        <>
          <label>Y-Axis:</label>
          <select value={yAxis} onChange={(e) => setYAxis(e.target.value)}>
            <option value="">Select Column</option>
            {columns.map((col) => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
          </select>
        </>
      )}

      {/* Generate Graph */}
      {xAxis && yAxis && graphType !== "pie" && (
        <Plot
          data={[
            {
              x: data.map((row) => row[xAxis]),
              y: data.map((row) => row[yAxis]),
              type: graphType,
              mode: "lines+markers",
              marker: { color: "blue" },
            },
          ]}
          layout={{ title: `${graphType.toUpperCase()} Chart` }}
        />
      )}

      {/* Pie Chart */}
      {xAxis && graphType === "pie" && (
        <Plot
          data={[
            {
              labels: data.map((row) => row[xAxis]),
              values: data.map((row) => row[yAxis]),
              type: "pie",
            },
          ]}
          layout={{ title: "Pie Chart" }}
        />
      )}
    </div>
  );
};

export default DataVisualization;
