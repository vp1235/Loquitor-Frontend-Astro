import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Still loading auth state
  if (loading) {
    return null; // Or return a loading spinner component
  }

  // Not authenticated
  if (!isAuthenticated) {
    // Save the attempted location for redirecting after login
    const from = location.pathname + location.search + location.hash;
    return <Navigate to="/login" state={{ from }} replace />;
  }

  // Authenticated - render children
  return children;
}