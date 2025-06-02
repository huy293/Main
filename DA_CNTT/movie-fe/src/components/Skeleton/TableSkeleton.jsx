import React from 'react';

const TableSkeleton = ({ rows = 5, columns = 4 }) => {
  return (
    <div className="animate-pulse bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-{columns} gap-4 p-4">
          {[...Array(columns)].map((_, index) => (
            <div key={`header-${index}`} className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
      
      {/* Rows */}
      {[...Array(rows)].map((_, rowIndex) => (
        <div 
          key={`row-${rowIndex}`}
          className="border-b border-gray-200 dark:border-gray-700 last:border-0"
        >
          <div className="grid grid-cols-{columns} gap-4 p-4">
            {[...Array(columns)].map((_, colIndex) => (
              <div 
                key={`cell-${rowIndex}-${colIndex}`}
                className="h-3 bg-gray-200 dark:bg-gray-700 rounded"
                style={{ width: `${Math.floor(Math.random() * 40 + 60)}%` }}
              ></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableSkeleton; 