import React from 'react';

const Loader: React.FC<{ message?: string }> = ({ message = "Analyzing Scenario..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
      <p className="text-gray-600 dark:text-gray-300 font-medium animate-pulse">{message}</p>
    </div>
  );
};

export default Loader;