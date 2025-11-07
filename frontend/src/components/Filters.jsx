// src/components/Filters.jsx
import React from "react";

export default function Filters({ filters, setFilters, options }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value === "All" ? undefined : value,
    }));
  };

  return (
    <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
      {/* Year Dropdown */}
      <select name="end_year" onChange={handleChange} value={filters.end_year || "All"}>
        <option>All</option>
        {options.years.map(year => <option key={year}>{year}</option>)}
      </select>

      {/* Topic Dropdown */}
      <select name="topic" onChange={handleChange} value={filters.topic || "All"}>
        <option>All</option>
        {options.topics.map(topic => <option key={topic}>{topic}</option>)}
      </select>

      {/* Country Dropdown */}
      <select name="country" onChange={handleChange} value={filters.country || "All"}>
        <option>All</option>
        {options.countries.map(country => <option key={country}>{country}</option>)}
      </select>

      {/* Reset Button */}
      <button onClick={() => setFilters({})}>Reset</button>
    </div>
  );
}
