import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/useAuth';
import LoadingSpinner from '../ui/LoadingSpinner';

interface ProtectedRouteProps {
  requireAuth?: boolean;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requireAuth = true,
  allowedRoles = []
}) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  // Case 1: Route requires auth but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/signin" state={{ from: location.pathname }} replace />;
  }

  // Case 2: Route requires specific roles
  if (requireAuth && isAuthenticated && allowedRoles.length > 0) {
    const hasRequiredRole = user?.roleNames.some(role => allowedRoles.includes(role));
    if (!hasRequiredRole) {
      // Redirect to unauthorized page or home
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // Case 3: Auth route that should not be accessible when logged in (like login/register)
  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
