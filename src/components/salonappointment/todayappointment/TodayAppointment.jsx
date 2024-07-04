import { useEffect } from "react";
import Session from "../../../service/session";
import Notify from "../../../utils/notify";
import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import styles from "../upcomingappointment/UpComing.module.css";
import { ongoingAppointments } from "../../../api/appointments.api";
import { Link } from "react-router-dom";
import Popup from "../appointmentdetails/Popup";
import maleImage from '../../../assets/image/male-placeholder.svg';
import femaleImage from '../../../assets/image/female-placeholder.svg';

const TodayAppointment = () => {
    const currentDate = new Date();

    // Format it as "yyyy-mm-dd"
    const formattedDate = currentDate.toISOString().split('T')[0];

    // Function to format date as dd/mmm/yyyy
    const formatDate = (date) => {
      const d = new Date(date);
      const year = d.getFullYear();
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const month = monthNames[d.getMonth()];
      const day = String(d.getDate()).padStart(2, '0');
      return `${day}-${month}-${year}`;
    };
  
    const [ongoing, setOngoing] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
    const salonId = Session.get('salonId');

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await ongoingAppointments(salonId, formattedDate);
                const ongoingAppointment = response.data;
                setOngoing(ongoingAppointment);
            } catch (error) {
                Notify.error(error.message);
            }
        };
        fetchAppointments();
    }, [salonId, formattedDate]);

    const handleViewDetails = (appointmentId) => {
        setSelectedAppointmentId(appointmentId);
        setShowPopup(true);
    };

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
                    <Col md={4} sm={6} xs={12} key={index}>
                        <Row className={`${styles.mainDiv} mb-2`}>
                            <div className={styles.userInfo}>
                                <Col md={4}>
                                    <div>
                                        <img
                                            src={appointment.serviceType.toLowerCase() === 'male' ? maleImage : femaleImage}
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
                                        <span>{appointment.service}</span>
                                        <br />
                                        <span className={styles.appointTime}>
                                            {appointment.startTime} &nbsp;
                                            <span className={styles.gender}>{appointment.serviceType}</span>
                                        </span>
                                        <br />
                                        <span>{appointment.location}</span>
                                        <span className={styles.locationDistance}>{formatDate(appointment.date)}</span>
                                    </p>
                                </Col>
                                <Col md={4}>
                                    <p className={`${styles.status} ${getStatusClass(appointment.status)}`}>
                                        {appointment.status}
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
        </>
    );
}

export default TodayAppointment;
