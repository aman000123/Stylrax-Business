import { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/404";
import MainApp from "./MainApp";
import Privacy from "./pages/Privacy";
import About from "./pages/About";
import TermsAndCondition from "./pages/TermsAndCondition";
import CodeOfConduct from "./components/privacypolicy/codeOfConduct/CodeOfConduct";

const SalonManagement = lazy(() =>
  import("./components/saloonmanagement/salonmanagement/SalonManagement")
);


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
        { path: "home", element: <Home />
       
      },
      { path: "/home/privacy", element: <Privacy/>},
      { path: "/home/terms-condition", element: <TermsAndCondition/>},
      { path: "/home/aboutus", element: <About/>},

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
