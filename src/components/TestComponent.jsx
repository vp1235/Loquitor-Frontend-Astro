import React from 'react';

export default function TestComponent() {
  return (
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
      <h1>React is Working!</h1>
      <p>If you can see this, React hydration is successful.</p>
    </div>
  );
}
