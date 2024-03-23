import  { lazy } from "react";


import { useRoutes } from 'react-router-dom';
import Home from "./pages/Home";
import AppLayout from "./layout/AppLayout";

const SalonManagement = lazy(() =>import ("./components/saloonmanagement/salonmanagement/SalonManagement"));
const Stepper = lazy(() => import( "./components/accountcreation/stepper/Stepper"));
const DashBoard = lazy(()=> import( "./dashboard/Dashboard"));
const SalonDashBoard = lazy(() => import("./pages/SalonDashboard"));
const SalonAppointment = lazy(() => import("./components/salonappointment/newappointment/NewAppointment"));


const AppRoute = () => {

const _routes = [
  {
    path: "",
    element: <Home/> 
  },
  {
    path:"salon",
    element:<AppLayout/>,
    children: [
      {
        path: "account/create",
        element: <Stepper />
      },
      {
        path: "dashboard",
        element: <DashBoard />
      },
      {
        path: "appointment",
        element: <SalonAppointment />
      },
      {
        path: "management",
        element: <SalonManagement />
      }
    ]
  }
];

   const routes = useRoutes(_routes);
  return routes;

}
export default AppRoute;

