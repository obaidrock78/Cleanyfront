import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const AllBookings = Loadable(lazy(() => import('./AllBookings/allBookings')));
const ApprecisteUs = Loadable(lazy(() => import('./apprecisteUs')));
const Profile = Loadable(lazy(() => import('./Profile/profile')));

const customerViewRoutes = [
  { path: '/dashboard/customer-booking', element: <AllBookings />, auth: authRoles.admin },
  { path: '/dashboard/appreciate', element: <ApprecisteUs />, auth: authRoles.admin },
  { path: '/dashboard/settings/profile', element: <Profile />, auth: authRoles.admin },
];

export default customerViewRoutes;
