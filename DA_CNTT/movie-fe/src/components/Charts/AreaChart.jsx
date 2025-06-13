import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Filler, Legend);

const AreaChart = ({ data = [], title = "" }) => {
  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: title || "",
        data: data.map((item) => item.value),
        fill: true,
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        borderColor: "#3b82f6",
        pointBackgroundColor: "#3b82f6",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
      title: {
        display: !!title,
        text: title,
        color: "#374151",
        font: { size: 16, weight: "bold" },
      },
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
      <Line data={chartData} options={options} />
    </div>
  );
};

export default AreaChart;