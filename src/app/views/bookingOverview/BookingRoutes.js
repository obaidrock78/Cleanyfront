import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const BookingOrders = Loadable(lazy(() => import('./BookingOrders')));
const BookingOrderDetails = Loadable(lazy(() => import('./SubPages/BookingOrderDetails')));

const bookingRoutes = [
  { path: '/dashboard/booking-orders', element: <BookingOrders />, auth: authRoles.admin },
  {
    path: '/dashboard/booking-orders/:id/details/',
    element: <BookingOrderDetails />,
    auth: authRoles.admin,
  },
];

export default bookingRoutes;
