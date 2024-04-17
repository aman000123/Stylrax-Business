import { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/404";
import MainApp from "./MainApp";

const SalonManagement = lazy(() =>
  import("./components/saloonmanagement/salonmanagement/SalonManagement")
);
// const Stepper = lazy(() =>
//   import("./components/accountcreation/stepper/Stepper")
// );
const DashBoard = lazy(() => import("./dashboard/Dashboard"));
const SalonAppointment = lazy(() =>
  import("./components/salonappointment/newappointment/NewAppointment")
);

const CreateAccount = lazy(() => import("./pages/CreateAccount"));


const AppRoute = ({ authToken }) => {
  const _routes = [
    {
      children: [
        { path: "", element: <Navigate to="/salon/dashboard" />, exact: true },
        { path: "/account/create", element: <CreateAccount />},
        { path: "home", element: <Home /> },
        {
          path: "salon", element: <MainApp authToken={authToken} />,
          children: [
            { path: "dashboard", element: <DashBoard /> },
            { path: "appointment", element: <SalonAppointment /> },
            { path: "management", element: <SalonManagement /> },
          ],
        },
        { path: "*", element: <NotFound /> }
      ],
    },
  ];

  const routes = useRoutes(_routes);
  return routes;
};

export default AppRoute;
