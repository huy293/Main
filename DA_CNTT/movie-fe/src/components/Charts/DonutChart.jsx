import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ data = [], title = "" }) => {
  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        data: data.map((item) => item.value),
        backgroundColor: [
          "#3b82f6",
          "#f59e42",
          "#10b981",
          "#ef4444",
          "#6366f1",
          "#fbbf24",
          "#14b8a6",
          "#a21caf",
          "#f472b6",
          "#64748b",
          "#eab308",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    cutout: "70%",
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: "#374151",
          font: { size: 13 },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="w-full flex flex-col items-center">
      {title && (
        <div className="text-base font-semibold text-gray-700 dark:text-gray-200 mb-2">
          {title}
        </div>
      )}
      <div className="w-60 h-60">
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
};

export default DonutChart;