import React from 'react';

const ChartSkeleton = () => {
  return (
    <div className="animate-pulse bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <div className="flex justify-between mb-4">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/6"></div>
      </div>
      <div className="h-[350px] bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>
  );
};

export default ChartSkeleton; 