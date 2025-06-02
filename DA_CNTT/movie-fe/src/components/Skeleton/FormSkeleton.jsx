import React from 'react';

const FormSkeleton = ({ fields = 6 }) => {
  return (
    <div className="animate-pulse bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      {/* Form Title */}
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6"></div>
      
      {/* Form Fields */}
      <div className="space-y-4">
        {[...Array(fields)].map((_, index) => (
          <div key={index} className="space-y-2">
            {/* Label */}
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
            {/* Input */}
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          </div>
        ))}
      </div>
      
      {/* Submit Button */}
      <div className="mt-6">
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
      </div>
    </div>
  );
};

export default FormSkeleton; 