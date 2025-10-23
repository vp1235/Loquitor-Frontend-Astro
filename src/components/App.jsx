import React from 'react';
import Providers from './Providers';
import Navigation from './Navigation';

export default function App({ children }) {
  return (
    <Providers>
      <Navigation />
      {children}
    </Providers>
  );
}
