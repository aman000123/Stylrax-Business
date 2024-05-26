import { Row, Col } from "react-bootstrap";
import styles from "../upcomingappointment/UpComing.module.css";
import { useEffect, useState } from "react";
import Session from "../../../service/session";
import { cancelledAppointments } from "../../../api/appointments.api";
import Notify from "../../../utils/notify";
import { Link } from "react-router-dom";
import Popup from "../appointmentdetails/Popup";
const Ongoing = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);

  const [pending, setPending] = useState([]);
  const salonId = Session.get("salonId");
  useEffect(() => {
    const appointments = async () => {
      try {
        const response = await cancelledAppointments(salonId);
        const pending = response.data;
        console.log("cancelled completed::>", pending);
        setPending(pending);
      } catch (error) {
        Notify.error(error.message);
      }
    };
    appointments();
  }, [salonId]);

  const handleViewDetails = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
    console.log("ara id", appointmentId);
    setShowPopup(true);
  };
  if(!pending || pending.length===0){
    return <div className={styles.noContent}>
      No pending appointments
    </div>
   }
  return (
    <>
      <Row>
        {pending?.map((appointment, index) => (
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
                      {`${appointment.user.firstName} ${appointment.user.lastName}`}{" "}
                    </span>
                    <br />
                    <span>{appointment.service}</span>
                    <br />
                    <span>
                      {appointment.startTime}{" "}
                      <span className={styles.gender}>
                        {appointment.serviceType}
                      </span>
                    </span>

                    <br />
                    <span>{appointment.location}</span>
                    <span className={styles.locationDistance}>
                      {appointment.date}
                    </span>
                  </p>
                  {/* <button className={styles.accept}>Accept</button> */}
                </Col>
                <Col md={4}>
                  <p className={styles.status}>
                    {appointment.status}
                    <br />
                    <Link onClick={() => handleViewDetails(appointment.id)}>
                      View Details
                    </Link>
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
};

export default Ongoing;
