import React from 'react';
import { createBrowserRouter, RouteObject, useNavigate } from 'react-router-dom';
import Home from '../components/Home';
import { SignIn } from '../components/Sigin';
import { SignUp } from '../components/Signup';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { Dashboard } from '../components/Dashboard';
import { LeagueDetail } from '../components/LeagueDetail';
import { InvitePage } from '../components/InvitePage';
import Regulamento from '../pages/Regulamento';
import TermosDeUso from '../pages/TermosUso';
import PoliticaDePrivacidade from '../pages/PoliticaPrivacidade';

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
  { path: '/regulamento', element: <Regulamento /> },
  { path: '/signin', element: <SignInRoute /> },
  { path: '/signup', element: <SignUpRoute /> },
  { path: '/invite/:code', element: <InvitePage /> },
  { path: '/termos/', element: <TermosDeUso /> },
  { path: '/politica-privacidade/', element: <PoliticaDePrivacidade /> },
  {
    element: <ProtectedRoute />,
    children: [
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/leagues/:leagueId', element: <LeagueDetail /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
