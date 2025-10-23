import React from 'react';
import Providers from './Providers';
import Navigation from './Navigation';
import AuthWrapper from './AuthWrapper';
import LoginPage from './LoginPage';

export default function LoginPageWrapper() {
  return (
    <Providers>
      <Navigation />
      <main className="relative z-10">
        <AuthWrapper>
          <LoginPage />
        </AuthWrapper>
      </main>
    </Providers>
  );
}
