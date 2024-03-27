import React from "react";
import { Suspense, lazy } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import Home from "./pages/Home";
import AppLayout from "./layout/AppLayout";

const SalonManagement = lazy(() =>
  import("./components/saloonmanagement/salonmanagement/SalonManagement")
);
const Stepper = lazy(() =>
  import("./components/accountcreation/stepper/Stepper")
);
const DashBoard = lazy(() => import("./dashboard/Dashboard"));
const SalonAppointment = lazy(() =>
  import("./components/salonappointment/newappointment/NewAppointment")
);

const ProtectedRoutes = ({ authToken }) => {
  console.log("authToken:", authToken);
  return authToken !== undefined ? <Outlet /> : <Navigate to="/" />;
};

const AppRoute = (props) => {
  const _routes = [
    {
      path: "",
      element: (
        <Suspense fallback={"Loading"}>
          <ProtectedRoutes {...props} />
        </Suspense>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "salon",
          element: <AppLayout />,
          children: [
            {
              path: "account/create",
              element: <Stepper />,
            },
            {
              path: "dashboard",
              element: <DashBoard />,
            },
            {
              path: "appointment",
              element: <SalonAppointment />,
            },
            {
              path: "management",
              element: <SalonManagement />,
            },
          ],
        },
      ],
    },
  ];

  const routes = useRoutes(_routes);
  return routes;
};

export default AppRoute;
