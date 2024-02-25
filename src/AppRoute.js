// import React, { Suspense, lazy } from "react";
// import { Navigate, Outlet, useRoutes } from "react-router-dom";
// import LogoLoader from "./Component/LogoLoader";
// const UserManagement = lazy(() => import("./pages/UserManagement"));
// const SalonManagement = lazy(() => import("./pages/SalonManagement"));
// const SaloonDetails = lazy(() => import("./Component/Saloon/SaloonDetails")); 
// const FreelanceManagement = lazy(() => import("./pages/FreelanceManagement"));
// const ServiceTypeMan = lazy(() => import("./pages/ServiceTypeMan"));
// const CouponManagement = lazy(() => import("./pages/CouponManagement"));
// const AppointmentMan = lazy(() => import("./pages/AppointmentMan"));
// const SalesPerson = lazy(() => import("./pages/SalesPerson"));
// const ADSManagement = lazy(() => import("./pages/ADSMangement"));
// const PaymentMan = lazy(() => import("./pages/PaymentMan"));
// const Notification = lazy(() => import("./pages/Notification"));
// const Setting = lazy(() => import("./pages/Settings"));
// const Layout = lazy(() => import("../src/pages/Layout"));
// const DashBoard = lazy(() => import("../src/pages/Dashboard"));
// const Login = lazy(() => import("../src/Component/authentication/Login"));
// const Authentication = lazy(() => import("../src/Component/authentication/Authentication"));
// const ForgetPassword = lazy(() => import("../src/Component/authentication/ForgetPassword"));
// const Verification = lazy(() => import("../src/Component/authentication/Verification"));
// const NewPassword = lazy(() => import("../src/Component/authentication/NewPassword"));
// const ChangedPassword = lazy(() => import("../src/Component/authentication/ChangedPassword"));
// const Error = lazy(() => import("../src/Component/Error"));

// const ProtectedRoutes = ({ authToken }) =>{
//   return authToken ? <Outlet /> : <Navigate to="/login" />;
// }

// const AppRoute = (props) => {
//   const _routes = [
//     {
//       path: "",
//       element: <Suspense fallback={<LogoLoader />}><ProtectedRoutes {...props} /></Suspense>,
//       children: [
//         {
//           path: "",
//           element: <Layout />,
//           children: [
//              { path: "dashboard", element: <DashBoard /> },
//              { path: "user-management", element: <UserManagement /> },
//              { 
//                path: "salon-management", element: <SalonManagement /> , 
//               children: [
//                 {path:"details", 
//                  element: <SaloonDetails/>},
//                ],
//             },
//              { path: "freelance-management", element: <FreelanceManagement /> },
//              { path: "service-type-management", element: <ServiceTypeMan /> },
//              { path: "coupon-management", element: <CouponManagement /> },
//              { path: "appointment-management", element: <AppointmentMan /> },
//              { path: "sales-person", element: <SalesPerson /> },
//              { path: "ads-management", element: <ADSManagement /> },
//              { path: "payment-management", element: <PaymentMan /> },
//              { path: "notification", element: <Notification /> },
//              { path: "setting", element: <Setting /> },
            
//           ],
//         },
//       ],
//     },
//     {
//       path: "",
//       element: <Suspense fallback={<LogoLoader />}><Authentication /></Suspense> ,
//       children: [
//         { path: "login", element: <Login /> },
//         { path: "forget-password", element: <ForgetPassword /> },
//         { path: "verification", element: <Verification /> },
//         { path: "new-password", element: <NewPassword /> },
//         { path: "changed-password", element: <ChangedPassword /> },
//       ],
//     },
//     { path: "*", element: <Error /> },
//   ];
//   const routes = useRoutes(_routes);
//   return routes;
// };

// export default AppRoute;


import React from 'react';
import Home from "./pages/Home";
import { useRoutes } from 'react-router-dom';
const AppRoute = (props) => {
  const _routes = [
    {
      path:"",
      element:<Home/>
    }
  ]
  const routes = useRoutes(_routes);
   return routes;
}

export default AppRoute;
