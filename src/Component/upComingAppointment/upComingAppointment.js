import React from 'react';
import {Row, Col } from "react-bootstrap";
import styles from "../../assets/scss/pages/home/salonAppointment.module.css";
import { appointments} from "../salonAppointment/apointmentData";
const UpComingAppointment = () => {
  return (
    <Row>
             
              {appointments.slice(0, 10).map((appointment, index) => (
                <Col md={4} key={index}>
                  <Row className="mb-2">
                    <div className={styles.userInfo}>
                      <Col md={4}>
                        <div>
                          <img
                            src={appointment.userImage}
                            className={styles.userImage}
                            alt="User"
                          />
                        </div>
                      </Col>
                      <Col md={4}>
                        <p className={styles.user}>
                          <span className={styles.userName}>
                            {appointment.name}
                          </span>
                          <br />
                          <span>{appointment.service}</span>
                          <br />
                          <span>{appointment.time}</span>
                          <br />
                          <span>{appointment.location}</span>
                        </p>
                        <button className={styles.accept}>Accept</button>
                      </Col>
                      <Col md={4}>
                        <p className={styles.payment}>
                          {appointment.paymentAmount}
                          <br />
                          <span>Payment</span>
                          <br />
                          <span className={styles.paymentType}>
                            {appointment.paymentType}
                          </span>
                        </p>
                        <button className={styles.decline}>Decline</button>
                      </Col>
                    </div>
                  </Row>
                </Col>
              ))}
            </Row>
  );
}

export default UpComingAppointment;
