import React from 'react'
import Navbar from "../components/Navbar/Navbar";
import { navItems } from '../components/navData/data';
import { Outlet } from 'react-router-dom';


function SalonDashboard() {
  return (

    <>
    <Navbar data={navItems}/>
    <Outlet/>
    </>

  )
}

export default SalonDashboard;
