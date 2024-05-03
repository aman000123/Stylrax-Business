import {Row, Col } from "react-bootstrap";
import styles from "../upcomingappointment/UpComing.module.css";
import { appointments} from "../../../data/appointment/Appointment";
import { GrFormLocation } from "react-icons/gr";
import { useEffect, useState } from "react";
import Session from "../../../service/session";
import { ongoingAppointments } from "../../../api/appointments.api";
import Notify from "../../../utils/notify";

const Ongoing = () => {
  const currentDate = new Date();

  // Format it as "yyyy-mm-dd"
  const formattedDate = currentDate.toISOString().split('T')[0];
  console.log("date::>",formattedDate)

  const [ongoing, setOngoing] = useState([]);
  const salonId = Session.get('salonId')
  useEffect(()=>{
    const appointments = async()=>{
      try {
        const response = await ongoingAppointments(salonId,formattedDate);
        const ongoing = response.data;
        console.log(" ongoing completed::>",ongoing)
        setOngoing(ongoing);
      } catch (error) {
        Notify.error(error.message);
      }
    };
    appointments();
  }, [salonId])
  return (
    
    
    <Row>
        {appointments.slice(0, 10).map((appointment, index) => (
                <Col md={4} sm={6} xs={6} key={index}>
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
                          <span>{appointment.time} <span className={styles.gender}>Male</span></span>

                          <br />
                          <span>{appointment.location}</span>
                          <span className={styles.locationDistance}><GrFormLocation className={styles.location}/>1.5km</span>

                        </p>
                        {/* <button className={styles.accept}>Accept</button> */}
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
                        {/* <button className={styles.decline}>Decline</button> */}
                      </Col>
                    </div>
                  </Row>
                </Col>
              ))}
            </Row>
  );
}

export default Ongoing;
