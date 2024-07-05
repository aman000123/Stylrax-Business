import { Row, Col } from "react-bootstrap";
import styles from "../upcomingappointment/UpComing.module.css";
import { useEffect, useState } from "react";
import Session from "../../../service/session";
import { cancelledAppointments } from "../../../api/appointments.api";
import Notify from "../../../utils/notify";
import { Link } from "react-router-dom";
import Popup from "../appointmentdetails/Popup";
import maleImage from '../../../assets/image/male-placeholder.svg';
import femaleImage from '../../../assets/image/female-placeholder.svg';

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
        // console.log("cancelled completed::>", pending);
        setPending(pending);
      } catch (error) {
        Notify.error(error.message);
      }
    };
    appointments();
  }, [salonId]);

  const handleViewDetails = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
    // console.log("id", appointmentId);
    setShowPopup(true);
  };
  if(!pending || pending.length===0){
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
      case "CONFIRMED":
        return styles.confirmed;
      case "IN_SERVICE":
        return styles.inService;
      case "IN_PROGRESS":
        return styles.inProgress;
        case "CANCELLED":
          return styles.cancelled;
      default:
        return "";
    }
  };
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[d.getMonth()];
    const day = String(d.getDate()).padStart(2, '0');
    return `${day}-${month}-${year}`;
  };
  return (
    <>
      <Row className={styles.today}>
        {pending?.map((appointment, index) => (
          <Col md={4} sm={6} xs={12} key={index}>
            <Row className={`${styles.mainDiv} mb-2`}>
              <div className={styles.userInfo}>
                <Col md={4}>
                  <div>
                    <img
                     src={appointment.serviceType.toLowerCase() === 'male' ? maleImage : femaleImage }
                      // src={appointment.user.profileImageUrl}
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
                    <span className={styles.appointTime}>
                      {appointment.startTime}{" "}&nbsp;
                      <span className={styles.gender}>
                        {appointment.serviceType}
                      </span>
                    </span>

                    <br />
                    <span>{appointment.location}</span>
                    <span className={styles.locationDistance}>
                      {formatDate(appointment.date)}
                    </span>
                  </p>
                  {/* <button className={styles.accept}>Accept</button> */}
                </Col>
                <Col md={4}>
                <p className={`${styles.status} ${getStatusClass(appointment?.status)}`}>                    {appointment.status}
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
