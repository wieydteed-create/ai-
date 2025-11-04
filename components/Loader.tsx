
import React from 'react';

interface LoaderProps {
  small?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ small = false }) => {
  const sizeClass = small ? 'h-5 w-5 border-2' : 'h-8 w-8 border-4';
  const containerClass = small ? '' : 'py-8';
  return (
    <div className={`flex justify-center items-center ${containerClass}`}>
      <div className={`${sizeClass} rounded-full border-gray-600 border-t-blue-400 animate-spin`}></div>
    </div>
  );
};