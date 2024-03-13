import React from 'react'
import Navbar from "../Component/Navbar/Navbar";
import {navItems} from '../Component/navData/data';
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
