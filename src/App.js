import React, { useEffect } from 'react';
import {Navigate, Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import AppRoute from './AppRoute';
import "../src/assets/scss/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import { getFeature } from './api/account.api';
import userInfo from './features/userInfo';
//import { setFeature } from './features/feature';
// import Notify from "./utils/notify";

function App() {
   
   //const authToken = useSelector(state => state.userInfo.token);
 
   const authToken = useSelector(state => state.userInfo.authToken);
    const location = useLocation();
   // const authToken = res.data.data.authToken;
   // console.log("token data:", authToken);
   // if (!authToken && location.pathname !== "/") {
      //return <Navigate to="/" />;
   // }
  // const feature = useSelector(state => state.feature.value);
  // const dispatch = useDispatch();

  // const getFeatureList = async () => {
  //   try {
  //     const features = await getFeature();
  //     dispatch(setFeature(features.data.data));
  //   } catch (error) {
  //     Notify.error(error.message);
  //   }
  // };

  //If user is already logged in redirect to dashboard
   //if(authToken && location.pathname === "/"){
  //   return <Navigate to={"/"} />;}
  // } else if(authToken && feature.length === 0){
  //   getFeatureList();
  // }

     return (
     <>
      <AppRoute  authToken={authToken}/> 
     
     <ToastContainer />
     </> 
  );
}

export default App;

