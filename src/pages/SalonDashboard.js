import React from 'react'
import SalonClinic from '../Component/salonDashboard/SalonClinic';
import UpcomingAppointment from '../Component/salonDashboard/UpcomingAppointment';
import { Row, Col, Container } from "react-bootstrap";
import arrowIcon from "../assets/image/arrowIcon.png";
import orangeSpecs from "../assets/image/orangeSpecs.png";
import styles from "../assets/scss/pages/home/salonDashboard.module.css";

function SalonDashboard() {
  return (
    <Container className={styles.container}>
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
        <Col md={8}>
          <SalonClinic />
        </Col>

        <Col md={4}>
          <UpcomingAppointment />
        </Col>
      </Row>
    </Container>
  )
}

export default SalonDashboard;
