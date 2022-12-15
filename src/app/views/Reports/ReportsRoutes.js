import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const Reports = Loadable(lazy(() => import('./reports')));

const ReportsRoutes = [{ path: '/dashboard/reports', element: <Reports />, auth: authRoles.admin }];

export default ReportsRoutes;
