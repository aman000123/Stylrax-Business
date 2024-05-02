import {Row, Col } from "react-bootstrap";
import styles from "../upcomingappointment/UpComing.module.css";
import { appointments} from "../../../data/appointment/Appointment";
import { GrFormLocation } from "react-icons/gr";
import Session from "../../../service/session";
import { useEffect, useState } from "react";
import Notify from "../../../utils/notify";

import { pendingAppointments } from "../../../api/appointments.api";
const UpComingAppointment = () => {
  const [pending, setPending] = useState([]);
  const salonId = Session.get('salonId')
  useEffect(()=>{
    const appointments = async()=>{
      try {
        const response = await pendingAppointments(salonId);
        const pending = response.data;
        console.log(" upcoming completed::>",pending)
        setPending(pending);
      } catch (error) {
        Notify.error(error.message);
      }
    };
    appointments();
  }, [salonId])
  return (
    <Row>
         {pending.map((appointment, index) => (
                <Col md={4} sm={6} xs={6} key={index}>
                  <Row className="mb-2">
                    <div className={styles.userInfo}>
                      <Col md={4}>
                        <div>
                          <img
                            src={appointment.user.
                              profileImageUrl}
                            className={styles.userImage}
                            alt="User"
                          />
                        </div>
                      </Col>
                      <Col md={4}>
                        <p className={styles.user}>
                          <span className={styles.userName}>
                            {`${appointment.user.firstName} ${appointment.user.lastName}`}
                          </span>
                          <br />
                          <span>{appointment.serviceType}</span>
                          <br />
                          <span>{appointment.startTime} <span className={styles.gender}></span></span>

                          <br />
                          <span>{appointment.location}</span>
                          <span className={styles.locationDistance}>{appointment.date}</span>

                        </p>
                        {/* <button className={styles.accept}>Accept</button> */}
                      </Col>
                      <Col md={4}>
                        <p className={styles.payment}>
                          {appointment.paymentAmount}
                          <br />
                          <span className={styles.paymentInfo}>{appointment.status}</span>
                          <br />
                          <span className={styles.paymentType}>
                            {appointment.paymentType}
                          </span>
                        </p>
                        {/* <button className={styles.decline}>Decline</button> */}
                      </Col>
                    </div>
                  </Row>
                </Col>
              ))}
            </Row>
  );
}

export default UpComingAppointment;
