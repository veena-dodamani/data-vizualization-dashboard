// src/components/IntensityChart.jsx
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function IntensityChart({ data }) {
  // data: array of documents from backend
  // group average intensity by year
  const years = Array.from(new Set(data.map(d => d.year).filter(Boolean))).sort();
  const avgIntensity = years.map(year => {
    const items = data.filter(d => d.year === year && typeof d.intensity === "number");
    const sum = items.reduce((s, it) => s + (it.intensity || 0), 0);
    return items.length ? +(sum / items.length).toFixed(2) : 0;
  });

  const chartData = {
    labels: years,
    datasets: [
      {
        label: "Average Intensity",
        data: avgIntensity,
        backgroundColor: "rgba(75,192,192,0.6)"
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Intensity vs Year" }
    }
  };

  return <Bar data={chartData} options={options} />;
}
