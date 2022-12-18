import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const Invoice = Loadable(lazy(() => import('./payrollSubpages/invoices')));
const ServicesProviderPayroll = Loadable(
	lazy(() => import('./payrollSubpages/servicesProviderPayroll'))
);

const payrollRoutes = [
	{ path: '/dashboard/invoice', element: <Invoice />, auth: authRoles.admin },
	{
		path: '/dashboard/service-provider-payroll',
		element: <ServicesProviderPayroll />,
		auth: authRoles.admin,
	},
];

export default payrollRoutes;
