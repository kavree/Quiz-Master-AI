import React from 'react';
import { T } from '../localization';
import { LightbulbIcon } from './icons';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 my-10">
      <div className="relative">
        <LightbulbIcon className="w-16 h-16 text-[#9b59b6] opacity-50" />
        <LightbulbIcon className="w-16 h-16 text-[#50bfe6] absolute top-0 left-0 animate-ping opacity-75" />
        <LightbulbIcon className="w-16 h-16 text-yellow-400 absolute top-0 left-0 animate-pulse delay-200" />
      </div>
      <p className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-[#50bfe6] to-[#9b59b6] font-medium">{T.loadingQuestion}</p>
    </div>
  );
};

export default LoadingSpinner;