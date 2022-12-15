import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const MainDashboard = Loadable(lazy(() => import('./mainDashboard')));

const dashboardRoutes = [
	{ path: '/main-dashboard/default', element: <MainDashboard />, auth: authRoles.admin },
];

export default dashboardRoutes;
