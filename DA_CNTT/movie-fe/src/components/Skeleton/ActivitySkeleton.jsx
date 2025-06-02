import React from 'react';

const ActivitySkeleton = () => {
  return (
    <div className="animate-pulse bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
      
      {[1, 2, 3].map((item) => (
        <div key={item} className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            <div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
            </div>
          </div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
        </div>
      ))}
    </div>
  );
};

export default ActivitySkeleton; 