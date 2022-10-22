import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';
import Tax from './Tax';

const Company = Loadable(lazy(() => import('./Company')));

const dashboardRoutes = [
  { path: '/dashboard/company', element: <Company />, auth: authRoles.admin },
  { path: '/dashboard/tax', element: <Tax />, auth: authRoles.admin },
];

export default dashboardRoutes;
