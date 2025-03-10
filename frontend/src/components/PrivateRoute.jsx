import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LoadingSpinner } from './LoadingSpinner/index';

const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  console.log('PrivateRoute render:', {
    path: location.pathname,
    user,
    loading,
    allowedRoles
  });

  if (loading) {
    console.log('PrivateRoute: Loading...');
    return <LoadingSpinner />;
  }

  if (!user) {
    console.log('PrivateRoute: No user, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    console.log('PrivateRoute: User not authorized');
    return <Navigate to="/dashboard" replace />;
  }

  console.log('PrivateRoute: Rendering protected content');
  return children;
};

export default PrivateRoute; 