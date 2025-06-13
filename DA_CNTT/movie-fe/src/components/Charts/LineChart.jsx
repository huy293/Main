import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const LineChart = ({ data = [], title = "" }) => {
  const chartData = {
    labels: data.map((item) => `Tháng ${item.month}`),
    datasets: [
      {
        label: "Lượt xem",
        data: data.map((item) => item.views),
        fill: false,
        borderColor: "#3b82f6",
        backgroundColor: "#3b82f6",
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 7,
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

export default LineChart;