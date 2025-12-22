import React from 'react';
import { createBrowserRouter, RouteObject, useNavigate } from 'react-router-dom';
import Home from '../components/Home';
import { SignIn } from '../components/Sigin';
import { SignUp } from '../components/Signup';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { Dashboard } from '../components/Dashboard';
import { LeagueDetail } from '../components/LeagueDetail';
import { InvitePage } from '../components/InvitePage';

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
  { path: '/invite/:code', element: <InvitePage /> },
  {
    element: <ProtectedRoute />,
    children: [
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/leagues/:leagueId', element: <LeagueDetail /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
