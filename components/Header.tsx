import React from 'react';
import { ThermometerSnowflakeIcon } from './icons';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  return (
    <header className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm sticky top-0 z-10 p-4 sm:p-5 border-b border-slate-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
            <ThermometerSnowflakeIcon className="h-8 w-8 text-cyan-400" />
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white tracking-wide ml-3">
              Smart AC Control
            </h1>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;