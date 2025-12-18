import React from 'react';
import { createBrowserRouter, RouteObject, useNavigate } from 'react-router-dom';
import Home from '../components/Home';
import { SignIn } from '../components/Sigin';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { Dashboard } from '../components/Dashboard';

const SignInRoute: React.FC = () => {
  const navigate = useNavigate();
  return <SignIn onBack={() => navigate('/')} />;
};

const routes: RouteObject[] = [
  { path: '/', element: <Home /> },
  { path: '/signin', element: <SignInRoute /> },
  {
    element: <ProtectedRoute />,
    children: [{ path: '/dashboard', element: <Dashboard /> }],
  },
];

export const router = createBrowserRouter(routes);
