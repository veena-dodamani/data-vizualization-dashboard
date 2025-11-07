import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    end_year: "",
    topic: "",
    country: "",
  });

  useEffect(() => {
    fetch("http://127.0.0.1:8000/data")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setFilteredData(data);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    let filtered = data;

    if (filters.end_year)
      filtered = filtered.filter((item) => item.end_year === filters.end_year);

    if (filters.topic)
      filtered = filtered.filter((item) =>
        item.topic.toLowerCase().includes(filters.topic.toLowerCase())
      );

    if (filters.country)
      filtered = filtered.filter((item) =>
        item.country.toLowerCase().includes(filters.country.toLowerCase())
      );

    setFilteredData(filtered);
  };

  const uniqueValues = (key) =>
    [...new Set(data.map((item) => item[key]).filter((val) => val))];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#9b59b6"];

  return (
    <div style={{ padding: "20px" }}>
      <h2>🌍 Global Data Visualization Dashboard</h2>

      {/* Filter Section */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <select name="end_year" value={filters.end_year} onChange={handleFilterChange}>
          <option value="">Select End Year</option>
          {uniqueValues("end_year").map((year) => (
            <option key={year}>{year}</option>
          ))}
        </select>

        <select name="topic" value={filters.topic} onChange={handleFilterChange}>
          <option value="">Select Topic</option>
          {uniqueValues("topic").map((topic) => (
            <option key={topic}>{topic}</option>
          ))}
        </select>

        <select name="country" value={filters.country} onChange={handleFilterChange}>
          <option value="">Select Country</option>
          {uniqueValues("country").map((country) => (
            <option key={country}>{country}</option>
          ))}
        </select>

        <button onClick={applyFilters}>Apply Filters</button>
      </div>

      {/* Chart Section */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
        {/* Intensity Bar Chart */}
        <div>
          <h3>Intensity by Sector</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="sector" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="intensity" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Likelihood Line Chart */}
        <div>
          <h3>Likelihood by Topic</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="topic" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="likelihood" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Relevance Pie Chart */}
        <div>
          <h3>Relevance by Country</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={filteredData}
                dataKey="relevance"
                nameKey="country"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {filteredData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
