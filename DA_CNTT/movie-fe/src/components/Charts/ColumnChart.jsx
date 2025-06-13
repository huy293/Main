import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ColumnChart = ({ data = [], title = "" }) => {
  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: title || "",
        data: data.map((item) => item.value),
        backgroundColor: "rgba(16, 185, 129, 0.85)",
        borderRadius: 8,
        maxBarThickness: 36,
      },
    ],
  };

  const options = {
    indexAxis: "x", // Cột đứng
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#374151", font: { size: 13 } },
      },
      y: {
        grid: { color: "#e5e7eb" },
        ticks: { color: "#374151", font: { size: 13 }, beginAtZero: true, precision: 0 },
      },
    },
  };

  return (
    <div className="w-full">
      {title && (
        <div className="text-base font-semibold text-gray-700 dark:text-gray-200 mb-2">
          {title}
        </div>
      )}
      <div className="h-64">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ColumnChart;