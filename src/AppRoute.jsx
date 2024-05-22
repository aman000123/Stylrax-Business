import { lazy, Suspense } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/404';
import MainApp from './MainApp';
import Privacy from './pages/Privacy';
import About from './pages/About';
import TermsAndCondition from './pages/TermsAndCondition';
import CodeOfConduct from './components/privacypolicy/codeOfConduct/CodeOfConduct';

const SalonManagement = lazy(() =>
  import('./components/saloonmanagement/salonmanagement/SalonManagement')
);
const DashBoard = lazy(() => import('./dashboard/Dashboard'));
const SalonAppointment = lazy(() =>
  import('./components/salonappointment/newappointment/NewAppointment')
);
const CreateAccount = lazy(() => import('./pages/CreateAccount'));

const AppRoute = ({ authToken }) => {
  // const isAuthTokenValid = authToken && authToken !== 'expired';
  const _routes = [
    {
      children: [
        {
          path: '',
          element: <Navigate to="/salon/dashboard" />,
        },
        {
          path: '/account/create',
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <CreateAccount />
            </Suspense>
          ),
        },
        { path: 'home', element: <Home /> },
        { path: 'home/privacy', element: <Privacy /> },
        { path: 'home/terms-condition', element: <TermsAndCondition /> },
        { path: 'home/codeofconduct', element: <CodeOfConduct /> },
        { path: 'home/aboutus', element: <About /> },
        {
          path: 'salon',
          element: <MainApp authToken={authToken} />,
          children: [
            {
              path: 'dashboard',
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <DashBoard />
                </Suspense>
              ),
            },
            {
              path: 'appointment',
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <SalonAppointment />
                </Suspense>
              ),
            },
            {
              path: 'management',
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <SalonManagement />
                </Suspense>
              ),
            },
          ],
        },
        { path: '*', element: <NotFound /> },
      ],
    },
  ];

  const routes = useRoutes(_routes);
  return routes;
};

export default AppRoute;