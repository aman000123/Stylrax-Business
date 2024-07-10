import { lazy, Suspense } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/404";
import MainApp from "./MainApp";
import Privacy from "./pages/Privacy";
import About from "./pages/About";
import TermsAndCondition from "./pages/TermsAndCondition";
import CodeOfConduct from "./components/privacypolicy/codeOfConduct/CodeOfConduct";
import ContactUs from "./components/privacypolicy/contactUs/ContactUs";
import NewSalon from "./components/saloondashboard/addNewSalon/NewSalon";
import BusinessDetails from "./components/account/Salon";

const SalonManagement = lazy(() =>
  import('./components/saloonmanagement/salonmanagement/SalonManagement')
);
const DashBoard = lazy(() => import('./dashboard/Dashboard'));
const SalonAppointment = lazy(() =>
  import('./components/salonappointment/newappointment/NewAppointment')
);
const CreateAccount = lazy(() => import('./pages/CreateAccount'));


const AppRoute = ({authToken}) => {
  const _routes = [
    {
      children: [
        // { path: "", element: isAuthTokenValid ? <Navigate to="/salon/dashboard" /> : <Navigate to="/home" />, exact: true },
        { path: "", element: <Navigate to="/salon/dashboard" />, exact: true },
        { path: "/account/create", element: <CreateAccount /> },
        {
          path: "home", element: <Home />

        },
        { path: "/home/privacy", element: <Privacy /> },
        { path: "/home/terms-condition", element: <TermsAndCondition /> },
        { path: "/home/codeofconduct", element: <CodeOfConduct /> },
        { path: "/home/aboutus", element: <About /> },
        { path: "/home/contactUs", element: <ContactUs /> },


        {
          path: "salon", element: <MainApp authToken={authToken} />,
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
              path: 'dashboard/newsalon',
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <NewSalon />
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

export default AppRoute;