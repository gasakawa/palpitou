import React from 'react';
import { createBrowserRouter, RouteObject, useNavigate } from 'react-router-dom';
import Home from '../components/Home';
import { SignIn } from '../components/Sigin';

const SignInRoute: React.FC = () => {
  const navigate = useNavigate();
  return <SignIn onBack={() => navigate('/')} />;
};

const routes: RouteObject[] = [
  { path: '/', element: <Home /> },
  { path: '/signin', element: <SignInRoute /> },
];

export const router = createBrowserRouter(routes);
