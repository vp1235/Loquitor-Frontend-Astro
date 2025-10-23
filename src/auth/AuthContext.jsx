import { createContext, useContext, useEffect, useState, useCallback } from "react";

const AuthContext = createContext(null);

const BACKEND_BASE = import.meta.env.PUBLIC_BACKEND_URL || 'http://localhost:8000';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (storedToken && storedUser) {
          // Validate token with backend (optional but recommended)
          try {
            const response = await fetch(`${BACKEND_BASE}/auth/validate`, {
              headers: {
                'Authorization': `Bearer ${storedToken}`
              }
            });

            if (response.ok) {
              setToken(storedToken);
              setUser(JSON.parse(storedUser));
              setIsAuthenticated(true);
            } else {
              // Token is invalid, clear storage
              localStorage.removeItem("token");
              localStorage.removeItem("user");
            }
          } catch (error) {
            console.error("Token validation error:", error);
            // If backend is down, trust local storage for now
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Persist auth data to localStorage
  const persistAuth = useCallback((userData, authToken) => {
    if (userData && authToken) {
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", authToken);
      setUser(userData);
      setToken(authToken);
      setIsAuthenticated(true);
    }
  }, []);

  // Clear auth data
  const clearAuth = useCallback(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  }, []);

  // Login function
  const login = useCallback((userData, authToken) => {
    persistAuth(userData, authToken);
  }, [persistAuth]);

  // Logout function
  const logout = useCallback(async () => {
    try {
      // Notify backend about logout (optional)
      if (token) {
        await fetch(`${BACKEND_BASE}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      clearAuth();
    }
  }, [token, clearAuth]);

  // Check if token is expired (basic implementation)
  const isTokenExpired = useCallback(() => {
    if (!token) return true;
    
    try {
      // If your token is a JWT, you can decode and check expiration
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload.exp * 1000; // Convert to milliseconds
      return Date.now() > expiry;
    } catch {
      // If not a JWT or can't decode, assume it's valid
      return false;
    }
  }, [token]);

  const value = {
    user,
    token,
    loading,
    isAuthenticated,
    login,
    logout,
    isTokenExpired,
    setUser, // Keep for backward compatibility
    setToken // Keep for backward compatibility
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};