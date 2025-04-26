import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const token = window.localStorage.getItem('token');
  return token ? <Navigate to="/" replace /> : children;
};

export default PublicRoute;