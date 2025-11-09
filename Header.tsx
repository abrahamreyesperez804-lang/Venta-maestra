import React from 'react';
import { AppIcon } from './AppIcon';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm sticky top-0 z-10 shadow-lg shadow-black/20">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center space-x-3">
          <AppIcon className="w-8 h-8 text-indigo-400" />
          <span className="text-xl font-semibold text-white">BizManager</span>
        </div>
      </div>
    </header>
  );
};