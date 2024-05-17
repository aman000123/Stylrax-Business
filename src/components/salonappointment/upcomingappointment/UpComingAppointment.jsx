import {Row, Col } from "react-bootstrap";
import styles from "../upcomingappointment/UpComing.module.css";

import Session from "../../../service/session";
import { useEffect, useState } from "react";
import Notify from "../../../utils/notify";

import { pendingAppointments } from "../../../api/appointments.api";
import { Link } from "react-router-dom";
import Popup from "../appointmentdetails/Popup";
const UpComingAppointment = () => {
  const [pending, setPending] = useState([]);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

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

  
  const handleViewDetails = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
    console.log("ara id",appointmentId)
    setShowPopup(true);
  };
  return (
    <>
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
                       
                          <div className={styles.status}>{appointment.status}
                          <br />
                          <Link onClick={() => handleViewDetails(appointment.id)}>View Details</Link>
                         </div>
                       
                        {/* <button className={styles.decline}>Decline</button> */}
                      </Col>
                    </div>
                  </Row>
                </Col>
              ))}
            </Row>
            {showPopup && (
        <Popup
          data={selectedAppointmentId}
          show={showPopup}
          onHide={() => setShowPopup(false)}
        />
      )}                
     </>
  );
}

export default UpComingAppointment;
