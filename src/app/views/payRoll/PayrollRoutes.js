import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const PayRoll = Loadable(lazy(() => import('./payroll')));

const dashboardRoutes = [
  { path: '/dashboard/payroll', element: <PayRoll />, auth: authRoles.admin },
];

export default dashboardRoutes;
