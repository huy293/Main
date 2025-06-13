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

// Plugin để hiển thị giá trị trên đầu cột
const barValuePlugin = {
  id: "barValuePlugin",
  afterDatasetsDraw(chart) {
    const { ctx } = chart;
    chart.data.datasets.forEach((dataset, i) => {
      const meta = chart.getDatasetMeta(i);
      meta.data.forEach((bar, index) => {
        const value = dataset.data[index];
        ctx.save();
        ctx.font = "bold 13px sans-serif";
        ctx.fillStyle = "#374151";
        ctx.textAlign = "center";
        ctx.fillText(value, bar.x, bar.y - 8);
        ctx.restore();
      });
    });
  },
};

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = ({ data = [], title = "", total, subtitle }) => {
  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: "",
        data: data.map((item) => item.value),
        backgroundColor: "rgba(59, 130, 246, 0.85)",
        borderRadius: 8,
        maxBarThickness: 36,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
      barValuePlugin: {},
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: "#374151",
          font: { size: 13, weight: "bold" },
          maxRotation: 40,
          minRotation: 0,
        },
      },
      y: {
        grid: { color: "#e5e7eb" },
        ticks: {
          color: "#374151",
          font: { size: 13 },
          beginAtZero: true,
          precision: 0,
        },
      },
    },
  };

  return (
    <div className="w-full">
      <div className="mb-2">
        {title && (
          <div className="text-base font-semibold text-gray-700 dark:text-gray-200">
            {title}
          </div>
        )}
        {typeof total !== "undefined" && (
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {total}
          </div>
        )}
        {subtitle && (
          <div className="text-xs text-gray-400 mt-1">{subtitle}</div>
        )}
      </div>
      <div className="h-72">
        <Bar data={chartData} options={options} plugins={[barValuePlugin]} />
      </div>
    </div>
  );
};

export default BarChart;