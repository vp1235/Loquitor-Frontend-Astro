import React, { useState, useRef, useEffect } from 'react';
import { Briefcase, BarChart, Globe, Shield, Sparkles, ChevronDown } from 'lucide-react';
import { useVibe, VIBES } from '../context/VibeContext';

const iconMap = {
  Briefcase,
  BarChart,
  Globe,
  Shield,
  Sparkles
};

const VibeDropdown = () => {
  const { vibe, changeVibe, vibes } = useVibe();
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const currentVibe = vibes[vibe];
  const CurrentIcon = iconMap[currentVibe.icon];
  const vibeOptions = Object.values(vibes);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Use click instead of mousedown for better touch support
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'Escape':
          setIsOpen(false);
          buttonRef.current?.focus();
          break;
        case 'ArrowDown':
          event.preventDefault();
          setFocusedIndex((prev) => (prev + 1) % vibeOptions.length);
          break;
        case 'ArrowUp':
          event.preventDefault();
          setFocusedIndex((prev) => (prev - 1 + vibeOptions.length) % vibeOptions.length);
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          handleVibeChange(vibeOptions[focusedIndex].id);
          break;
        case 'Tab':
          setIsOpen(false);
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, focusedIndex, vibeOptions]);

  const handleVibeChange = (vibeId) => {
    changeVibe(vibeId);
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // Find current vibe index when opening
      const currentIndex = vibeOptions.findIndex(v => v.id === vibe);
      setFocusedIndex(currentIndex >= 0 ? currentIndex : 0);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleDropdown();
          }
        }}
        className="flex items-center space-x-2 px-4 py-2.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 rounded-lg transition-all text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
        aria-label="Select website vibe"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls="vibe-dropdown-menu"
      >
        <CurrentIcon className="w-4 h-4" />
        <span className="hidden sm:inline">{currentVibe.name}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          id="vibe-dropdown-menu"
          className="absolute right-0 mt-2 w-72 max-w-[calc(100vw-2rem)] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50"
          role="listbox"
          aria-labelledby="vibe-dropdown-trigger"
        >
          <div className="p-3 border-b border-slate-200 dark:border-slate-700">
            <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Choose Your Vibe
            </h3>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {vibeOptions.map((vibeOption, index) => {
              const Icon = iconMap[vibeOption.icon];
              const isActive = vibe === vibeOption.id;
              const isFocused = index === focusedIndex;

              return (
                <button
                  key={vibeOption.id}
                  onClick={() => handleVibeChange(vibeOption.id)}
                  onMouseEnter={() => setFocusedIndex(index)}
                  className={`w-full text-left px-4 py-3 transition-all flex items-start space-x-3 ${
                    isActive
                      ? 'bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600'
                      : isFocused
                      ? 'bg-slate-50 dark:bg-slate-700/50 border-l-4 border-slate-300 dark:border-slate-600'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-700/50 border-l-4 border-transparent'
                  }`}
                  role="option"
                  aria-selected={isActive}
                  tabIndex={-1}
                >
                  <div className={`mt-0.5 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`font-semibold text-sm ${
                      isActive
                        ? 'text-emerald-900 dark:text-emerald-100'
                        : 'text-slate-900 dark:text-slate-100'
                    }`}>
                      {vibeOption.name}
                    </div>
                    <div className={`text-xs mt-0.5 ${
                      isActive
                        ? 'text-emerald-700 dark:text-emerald-300'
                        : 'text-slate-500 dark:text-slate-400'
                    }`}>
                      {vibeOption.description}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default VibeDropdown;
