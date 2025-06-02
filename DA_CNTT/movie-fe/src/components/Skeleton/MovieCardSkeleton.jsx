import React from 'react';

const MovieCardSkeleton = () => {
  return (
    <div className="animate-pulse bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      {/* Thumbnail */}
      <div className="aspect-video bg-gray-200 dark:bg-gray-700"></div>
      
      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
        
        {/* Genre & Year */}
        <div className="flex justify-between mb-3">
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
        </div>
        
        {/* Rating */}
        <div className="flex items-center space-x-1">
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/5"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/5"></div>
        </div>
      </div>
    </div>
  );
};

export default MovieCardSkeleton; 