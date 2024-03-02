import React from 'react'
import SalonClinic from '../Component/salonDashboard/SalonClinic';
import UpcomingAppointment from '../Component/salonDashboard/UpcomingAppointment';
import { Row, Col, Container } from "react-bootstrap";
import arrowIcon from "../assets/image/arrowIcon.png";
import orangeSpecs from "../assets/image/orangeSpecs.png";
import styles from "../assets/scss/pages/home/salonDashboard.module.css";
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
