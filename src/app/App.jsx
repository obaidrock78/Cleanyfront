import '../fake-db';
import { Provider } from 'react-redux';
import { useRoutes, Outlet } from 'react-router-dom';

import { MatxTheme } from './components';
import { AuthProvider } from './contexts/JWTAuthContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { Store } from './redux/Store';
import AuthGuard from 'app/auth/AuthGuard';
import chartsRoute from 'app/views/charts/ChartsRoute';
import dashboardRoutes from 'app/views/dashboard/DashboardRoutes';
import settings from 'app/views/Setting/SettingRoutes';
import materialRoutes from 'app/views/material-kit/MaterialRoutes';
import NotFound from 'app/views/sessions/NotFound';
import sessionRoutes from 'app/views/sessions/SessionRoutes';
import { Navigate } from 'react-router-dom';
import MatxLayout from './components/MatxLayout/MatxLayout';

const App = () => {
  const token = localStorage.getItem('accessToken');
  const content = useRoutes([
    {
      element: (
        <AuthGuard>
          <MatxLayout />
        </AuthGuard>
      ),
      children: [...dashboardRoutes, ...chartsRoute, ...materialRoutes, ...settings],
    },
    {
      path: '/',

      element: !token ? <Outlet /> : <Navigate replace to="/dashboard/default" />,
      children: [...sessionRoutes],
    },
    ...sessionRoutes,
    { path: '*', element: <NotFound /> },
  ]);

  return (
    <Provider store={Store}>
      <SettingsProvider>
        <MatxTheme>
          <AuthProvider>{content}</AuthProvider>
        </MatxTheme>
      </SettingsProvider>
    </Provider>
  );
};

export default App;
