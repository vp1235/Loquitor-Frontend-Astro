import React from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import { VibeProvider } from '../context/VibeContext';
import { AuthProvider } from '../auth/AuthContext';

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <VibeProvider>
          {children}
        </VibeProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
