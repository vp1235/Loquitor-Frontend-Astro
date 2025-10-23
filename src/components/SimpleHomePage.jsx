import React from 'react';
import Providers from './Providers';
import Navigation from './Navigation';

export default function SimpleHomePage() {
  return (
    <Providers>
      <Navigation />
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '2rem',
        background: 'white',
        color: 'black',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        zIndex: 9999
      }}>
        <h1>Navigation Added!</h1>
        <p>You should see the navigation bar at the top.</p>
      </div>
    </Providers>
  );
}
