import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const Reports = Loadable(lazy(() => import('./reports')));
const PendingReports = Loadable(lazy(() => import('./pending-reports')));

const ReportsRoutes = [
	{ path: '/dashboard/reports', element: <Reports />, auth: authRoles.admin },
	{ path: '/dashboard/pending-reports', element: <PendingReports />, auth: authRoles.admin },
];

export default ReportsRoutes;
