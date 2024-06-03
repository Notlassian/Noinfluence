import React from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  const code = localStorage.getItem('code');

  if (!code) {
    return <Navigate to="/login" />;
  }

  return children;
};
