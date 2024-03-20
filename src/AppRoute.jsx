import  { lazy } from "react";
const Home =lazy(() => import( "./pages/Home"));
const SalonManagement = lazy(() =>import ("./components/saloonmanagement/salonmanagement/SalonManagement"));
import { useRoutes } from 'react-router-dom';
const Stepper = lazy(() => import( "./components/accountcreation/stepper/Stepper"));
const DashBoardLayout = lazy(()=> import( "../src/dashboardlayout/DashboardLayout"));
const SalonDashBoard = lazy(() => import("./pages/SalonDashboard"));
const SalonAppointment = lazy(() => import("./components/salonappointment/newappointment/NewAppointment"));




// const ProtectedRoutes = ({authToken }) =>{
//      return authToken ? <Outlet /> : <Navigate to="/" />;
//    }
 
// const AppRoute = (props) => {

//   const _routes = [
//     {
//       path: "",
//       element: (
//         <Suspense fallback={"Loading"}>
//           <ProtectedRoutes {...props}/>
//         </Suspense>
//       ),
//       children: [
//         {
//           path: "salon-dashboard",
//           element: <SalonDashBoard />,
//           children: [
//             { path: "", element: <DashBoardLayout /> },
//             { path: "appointment", element: <SalonAppointment /> },
//             { path: "salon-management", element: <SalonManagement /> },
//           ]
//         }

//       ]
//     },

//     {
//       path: "account",
//       element: <Account />
//     },

//     {
//       path: "/",
//       element: <Home />
//     },
  
//   ]
  
//    const routes = useRoutes(_routes);
//   return routes;

// }
// export default AppRoute;









const AppRoute = () => {

const _routes = [
  {
    path: "",
    element: <Home/> 
  },
   {
      path: "salon-dashboard",
      element: <SalonDashBoard />,
      children: [
        {
          path: "",
          element: <DashBoardLayout />
        },
        {
          path: "appointment",
          element: <SalonAppointment />
        },

      {
        path: "salon-management",
        element: <SalonManagement />
      }
    ]
  },
  {
    path: "account",
    element: <Stepper />
  }
];

   const routes = useRoutes(_routes);
  return routes;

}
export default AppRoute;

