import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

export const ProtectedRoute: React.FC = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#121212] text-white">
        <div className="animate-pulse">Carregando...</div>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};
