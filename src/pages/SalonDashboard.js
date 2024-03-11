import React from 'react'
import SalonClinic from '../Component/salonDashboard/SalonClinic';
import UpcomingAppointment from '../Component/salonDashboard/UpcomingAppointment';
import { Row, Col } from "react-bootstrap";
import arrowIcon from "../assets/image/arrowIcon.png";
import orangeSpecs from "../assets/image/orangeSpecs.png";
import styles from "../assets/scss/pages/home/salonDashboard.module.css";
import Navbar from "../Component/Navbar/Navbar";
import {navItems} from '../Component/navData/data';
import { Outlet } from 'react-router-dom';
function SalonDashboard() {
  return (
<<<<<<< HEAD
    <div className={styles.container}>
      <div className={styles.mainDiv}>
        <div>
          <img src={orangeSpecs} alt=''/>
        </div>

        <div className={styles.secDiv}>
            <ul>
              <li className={styles.listOne}><img src={arrowIcon} alt=''/><span className={styles.spanOne}>Switch or add salon here</span></li>
              <li><span className={styles.span}>Hair Clinic</span> <span className={styles.spanOne}>Lorem this website is for saloon users and very helpful for freelancers</span></li>
            </ul>
        </div>
      </div>
      <Row className='mt-2'>
        <Col md={9}>
          <SalonClinic />
        </Col>

        <Col md={3}>
          <UpcomingAppointment />
        </Col>
      </Row>
    </div>
=======
    <>
    <Navbar data={navItems}/>
    <Outlet/>
   
    </>
>>>>>>> 301187c0a347a5fbbc09cc2a02b5b8642374118a
  )
}

export default SalonDashboard;
