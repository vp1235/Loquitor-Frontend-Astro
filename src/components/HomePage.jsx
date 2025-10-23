import React from 'react';
import Providers from './Providers';
import Navigation from './Navigation';
import LandingPage from './LandingPage';

export default function HomePage() {
  return (
    <Providers>
      <Navigation />
      <main className="relative z-10">
        <LandingPage />
      </main>
    </Providers>
  );
}
