import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useVibe } from '../context/VibeContext';
import VibeDropdown from './VibeDropdown';

const Navigation = () => {
  const { theme, toggleTheme } = useTheme();
  const { vibe } = useVibe();

  return (
    <nav className="relative z-50 px-6 lg:px-12 py-6 flex justify-between items-center backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="flex items-center space-x-3">
        <span className="text-2xl font-bold tracking-tight">Loquitor</span>
      </div>

      {/* Desktop links + CTA */}
      <div className="hidden md:flex items-center space-x-8">
        <a href="/#capabilities" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Capabilities</a>
        <a href="/#consultation" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Consultation</a>
        <a href="/#research" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Research</a>
        <a href="/#architecture" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Architecture</a>

        {/* Vibe Dropdown */}
        <VibeDropdown />

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-all"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-yellow-500" />
          ) : (
            <Moon className="w-5 h-5 text-slate-700" />
          )}
        </button>

        <a
          href="/login"
          className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg hover:from-emerald-500 hover:to-teal-500 transition-all shadow-lg hover:shadow-emerald-500/25 text-white">
          Get Started
        </a>
      </div>

      {/* Mobile CTA + Theme Toggle + Vibe */}
      <div className="md:hidden flex items-center space-x-2">
        <VibeDropdown />
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-all"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-yellow-500" />
          ) : (
            <Moon className="w-5 h-5 text-slate-700" />
          )}
        </button>
        <a
          href="/login"
          className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg hover:from-emerald-500 hover:to-teal-500 transition-all shadow-lg hover:shadow-emerald-500/25 text-white">
          Get Started
        </a>
      </div>
    </nav>
  );
};

export default Navigation;
