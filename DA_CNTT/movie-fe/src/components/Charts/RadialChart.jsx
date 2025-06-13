import React from "react";

const RadialChart = ({ percentage = 0, subtitle = "" }) => {
  // Clamp percentage từ 0 đến 100
  const percent = Math.max(0, Math.min(100, Number(percentage)));
  const size = 160;
  const strokeWidth = 16;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percent / 100);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <svg width={size} height={size} className="mb-2">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#3b82f6"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.6s" }}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy="0.3em"
          fontSize="2.2rem"
          fontWeight="bold"
          fill="#3b82f6"
        >
          {percent}%
        </text>
      </svg>
      {subtitle && (
        <div className="text-sm text-gray-500 dark:text-gray-300 text-center">{subtitle}</div>
      )}
    </div>
  );
};

export default RadialChart;