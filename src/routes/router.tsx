import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RouteConfig } from './types';

const routeConfigs: RouteConfig[] = [{ path: '/inicio', element: <Navigate to="/" />, permission: 'public' }];

export const createRoute = (config: RouteConfig): RouteObject => {
  const {
    path,
    element,
    title,
    permission,
    selectCompanyIsRequired,
    providers,
    children,
    loader,
    action,
    errorElement,
  } = config;

  return {
    path,
    element: wrapElement(element, title, permission, selectCompanyIsRequired, providers, wrapWithMainLayout !== false),
    loader,
    action,
    errorElement: errorElement ? errorElement : <RouteErrorBoundary />,
    children: children?.map(createRoute),
  };
};

export const router = createBrowserRouter(routeConfigs.map(createRoute));
