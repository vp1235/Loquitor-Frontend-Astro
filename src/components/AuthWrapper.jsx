import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

const GOOGLE_CLIENT_ID = import.meta.env.PUBLIC_GOOGLE_OAUTH_CLIENT_ID;

export default function AuthWrapper({ children }) {
  if (!GOOGLE_CLIENT_ID) {
    console.error('Missing PUBLIC_GOOGLE_OAUTH_CLIENT_ID');
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Configuration Error</h1>
          <p>Google OAuth Client ID is not configured.</p>
        </div>
      </div>
    );
  }

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      {children}
    </GoogleOAuthProvider>
  );
}
