import React from 'react';
import { createBrowserRouter, RouteObject, useNavigate } from 'react-router-dom';
import Home from '../components/Home';
import { SignIn } from '../components/Sigin';
import { SignUp } from '../components/Signup';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { Dashboard } from '../components/Dashboard';

const SignInRoute: React.FC = () => {
  const navigate = useNavigate();
  return <SignIn onBack={() => navigate('/')} />;
};

const SignUpRoute: React.FC = () => {
  const navigate = useNavigate();
  return <SignUp onBack={() => navigate('/')} />;
};

const routes: RouteObject[] = [
  { path: '/', element: <Home /> },
  { path: '/signin', element: <SignInRoute /> },
  { path: '/signup', element: <SignUpRoute /> },
  {
    element: <ProtectedRoute />,
    children: [{ path: '/dashboard', element: <Dashboard /> }],
  },
];

export const router = createBrowserRouter(routes);
