import React from 'react';

const CardSkeleton = () => {
  return (
    <div className="animate-pulse bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
    </div>
  );
};

export default CardSkeleton; 