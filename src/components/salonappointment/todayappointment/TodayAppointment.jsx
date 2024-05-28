import { useEffect } from "react";
import Session from "../../../service/session";
import Notify from "../../../utils/notify";
import { useState } from "react";
import {Row, Col } from "react-bootstrap";
import styles from "../upcomingappointment/UpComing.module.css";
import { ongoingAppointments } from "../../../api/appointments.api";
import { Link } from "react-router-dom";
import Popup from "../appointmentdetails/Popup";
const TodayAppointment = () => {
    const currentDate = new Date();

    // Format it as "yyyy-mm-dd"
    const formattedDate = currentDate.toISOString().split('T')[0];
    console.log("date::>",formattedDate)
  
    const [ongoing, setOngoing] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
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

    const handleViewDetails = (appointmentId) => {
        setSelectedAppointmentId(appointmentId);
        console.log("ara id",appointmentId)
        setShowPopup(true);
      };
      if(!ongoing || ongoing.length===0){
        return <div className={styles.noContent}>
          No todays&apos; appointments
        </div>
       }
       const getStatusClass = (status) => {
        switch (status) {
          case "PENDING":
            return styles.pending;
          case "ACCEPTED":
            return styles.accepted;
          case "REJECTED":
            return styles.rejected;
          case "COMPLETED":
            return styles.completed;
          case "CONFIRMED":
            return styles.confirmed;
            case "CANCELLED":
              return styles.cancelled;
          case "IN_SERVICE":
            return styles.inService;
          case "IN_PROGRESS":
            return styles.inProgress;
          default:
            return "";
        }
      };
  return (
    <>
    <Row className={styles.today}>
        {ongoing?.map((appointment, index) => (
                <Col md={4} sm={6} xs={6} key={index}>
                  <Row className="mb-2">
                    <div className={styles.userInfo}>
                      <Col md={4}>
                        <div>
                          <img
                            src={appointment.user.profileImageUrl}
                            className={styles.userImage}
                            alt="User"
                          />
                        </div>
                      </Col>
                      <Col md={4}>
                        <p className={styles.user}>
                          <span className={styles.userName}>
                          {`${appointment.user.firstName} ${appointment.user.lastName}`}                          </span>
                          <br />
                          <span>{appointment.service}</span>
                          <br />
                          <span className={styles.appointTime}>{appointment.startTime} &nbsp;<span className={styles.gender}>{appointment.serviceType}</span></span>

                          <br />
                          <span>{appointment.location}</span>
                          <span className={styles.locationDistance}>{appointment.date}</span>

                        </p>
                        {/* <button className={styles.accept}>Accept</button> */}
                      </Col>
                      <Col md={4}>
                      <p className={`${styles.status} ${getStatusClass(appointment?.status)}`}>                    {appointment.status}
                          <br />
                          <Link onClick={() => handleViewDetails(appointment.id)}>View Details</Link>

                        </p>
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

export default TodayAppointment;
