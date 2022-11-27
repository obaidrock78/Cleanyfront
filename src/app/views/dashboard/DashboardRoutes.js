import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const Analytics = Loadable(lazy(() => import('./Analytics')));

const MainDashboard = Loadable(lazy(() => import('./mainDashboard')));

const dashboardRoutes = [
	{ path: '/dashboard/default', element: <Analytics />, auth: authRoles.admin },

	{ path: '/main-dashboard/default', element: <MainDashboard />, auth: authRoles.admin },
];

export default dashboardRoutes;
