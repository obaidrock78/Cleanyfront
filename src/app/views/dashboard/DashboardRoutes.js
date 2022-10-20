import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { authRoles } from '../../auth/authRoles';

const Analytics = Loadable(lazy(() => import('./Analytics')));

const dashboardRoutes = [
  { path: '/dashboard/default', element: <Analytics />, auth: authRoles.admin },
  // { path: '/session/signup', element: <Navigate to="/dashboard/default" />, auth: authRoles.admin },
  // { path: '/session/signin', element: <Navigate to="/dashboard/default" />, auth: authRoles.admin },
  // {
  //   path: '/session/forgot-password',
  //   element: <Navigate to="/dashboard/default" />,
  //   auth: authRoles.admin,
  // },
  // {
  //   path: '/session/new-profile',
  //   element: <Navigate to="/dashboard/default" />,
  //   auth: authRoles.admin,
  // },
];

export default dashboardRoutes;
