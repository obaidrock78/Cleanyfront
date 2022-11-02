import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const ServiceProvider = Loadable(lazy(() => import('./ServiceProvider')));
const CreateProvider = Loadable(lazy(() => import('./CRUD/CreateProvider')));
const UpdateProvider = Loadable(lazy(() => import('./CRUD/UpdateProvider')));

const servicesProviderRoutes = [
  { path: '/dashboard/service-providers', element: <ServiceProvider />, auth: authRoles.admin },
  {
    path: '/dashboard/service-providers/create',
    element: <CreateProvider />,
    auth: authRoles.admin,
  },
  {
    path: '/dashboard/service-providers/update',
    element: <UpdateProvider />,
    auth: authRoles.admin,
  },
];

export default servicesProviderRoutes;
