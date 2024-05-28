import { Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
import styles from "../upcomingappointment/UpComing.module.css";
import { useEffect, useState } from 'react';
import { completedAppointments } from "../../../api/appointments.api";
import Session from "../../../service/session";
import Notify from "../../../utils/notify";
import Popup from "../appointmentdetails/Popup";

const PastAppointment = () => {
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [completed, setCompleted] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const salonId = Session.get('salonId');

 
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await completedAppointments(salonId);
        const completed = response.data;
        console.log("completed::>", completed);
        setCompleted(completed);
      } catch (error) {
        Notify.error(error.message);
      }
    };
    fetchAppointments();
  }, [salonId]);

  const handleViewDetails = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
    setShowPopup(true);
  };
  if(!completed || setCompleted.length===0){
    return <div className={styles.noContent}>
      No cancelled appointments
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
      case "CANCELLED":
        return styles.cancelled;
        case "CONFIRMED":
        return styles.confirmed;
      case "IN_SERVICE":
        return styles.inService;
      case "IN_PROGRESS":
        return styles.inProgress;
      default:
        return "";
    }
  };
  
  return (
    <div>
      <Row className={styles.today}>
        {completed?.map((appointment, index) => (
          <Col md={6} sm={6} lg={4} xs={12} key={index}>
            <Row className={`${styles.mainDiv} mb-2`}>
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
                      {`${appointment.user.firstName} ${appointment.user.lastName}`}
                    </span>
                    <br />
                    <span >{appointment.service}</span>
                    <br />
                    <span className={styles.appointTime}>{appointment.startTime} &nbsp;<span className={styles.gender}>{appointment.serviceType}</span></span>
                    <br />
                    <span className={styles.locationDistance}>{appointment.date}</span>
                  </p>
                </Col>
                <Col md={4}>
                <p className={`${styles.status} ${getStatusClass(appointment?.status)}`}>                    {appointment.status}
                    <br />
                    <Link onClick={() => handleViewDetails(appointment.id)}>View Details</Link>
                  </p>
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
    </div>
  );
}

export default PastAppointment;
