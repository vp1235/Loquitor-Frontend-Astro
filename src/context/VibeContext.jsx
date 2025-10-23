import React, { createContext, useContext, useState, useEffect } from 'react';

const VibeContext = createContext();

export const useVibe = () => {
  const context = useContext(VibeContext);
  if (!context) {
    throw new Error('useVibe must be used within a VibeProvider');
  }
  return context;
};

// Define the vibe configurations
export const VIBES = {
  professional: {
    id: 'professional',
    name: 'Professional',
    description: 'Enterprise-focused AI solutions',
    icon: 'Briefcase'
  },
  dataScience: {
    id: 'dataScience',
    name: 'Data Science',
    description: 'Statistics, big data, and model optimization',
    icon: 'BarChart'
  },
  globalCommerce: {
    id: 'globalCommerce',
    name: 'Global Commerce',
    description: 'Multilingual and cross-border capabilities',
    icon: 'Globe'
  },
  securityFirst: {
    id: 'securityFirst',
    name: 'Security First',
    description: 'Trust, compliance, and risk mitigation',
    icon: 'Shield'
  },
  innovationLab: {
    id: 'innovationLab',
    name: 'Innovation Lab',
    description: 'Cutting-edge semantic complexity and flexibility',
    icon: 'Sparkles'
  }
};

export const VibeProvider = ({ children }) => {
  const [vibe, setVibe] = useState(() => {
    // Check if we're in the browser before accessing localStorage
    if (typeof window !== 'undefined') {
      const savedVibe = localStorage.getItem('loquitor-vibe');
      return savedVibe || 'professional';
    }
    return 'professional';
  });

  useEffect(() => {
    // Save to localStorage whenever vibe changes
    localStorage.setItem('loquitor-vibe', vibe);
  }, [vibe]);

  const changeVibe = (newVibe) => {
    if (VIBES[newVibe]) {
      setVibe(newVibe);
    }
  };

  return (
    <VibeContext.Provider value={{ vibe, changeVibe, vibes: VIBES }}>
      {children}
    </VibeContext.Provider>
  );
};
