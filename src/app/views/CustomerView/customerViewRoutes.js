import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const AllBookings = Loadable(lazy(() => import('./AllBookings/allBookings')));
const ApprecisteUs = Loadable(lazy(() => import('./apprecisteUs')));

const customerViewRoutes = [
  { path: '/dashboard/customer-booking', element: <AllBookings />, auth: authRoles.admin },
  { path: '/dashboard/appreciate', element: <ApprecisteUs />, auth: authRoles.admin },
];

export default customerViewRoutes;
