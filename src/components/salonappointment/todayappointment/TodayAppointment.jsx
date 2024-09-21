import { useEffect, useState } from "react";
import Session from "../../../service/session";
import Notify from "../../../utils/notify";
import { Row, Col } from "react-bootstrap";
import styles from "../upcomingappointment/UpComing.module.css";
import { ongoingAppointments } from "../../../api/appointments.api";
import { Link } from "react-router-dom";
import Popup from "../appointmentdetails/Popup";
import maleImage from '../../../assets/image/male-placeholder.svg';
import femaleImage from '../../../assets/image/female-placeholder.svg';

const TodayAppointment = () => {
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, '0');
    const monthIndex = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    //const monthName = months[monthIndex];
    const apiFormattedDate = `${day}-${(monthIndex + 1).toString().padStart(2, '0')}-${year}`;
    // const displayFormattedDate = `${day}-${monthName}-${year}`;
    // console.log("API Formatted Date ::", apiFormattedDate);
    // console.log("Display Formatted Date ::", displayFormattedDate);

    const [ongoing, setOngoing] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
    const salonId = Session.get('salonId');

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await ongoingAppointments(salonId, apiFormattedDate);
                const ongoingAppointment = response.data;
                setOngoing(ongoingAppointment);
            } catch (error) {
                Notify.error(error.message);
            }
        };
        fetchAppointments();
    }, [salonId, apiFormattedDate]);

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

    const formatAppointmentDate = (dateString) => {
        if (!dateString) return '';

        const parts = dateString.split('-');
        if (parts.length !== 3) return '';

        const [day, month, year] = parts.map(part => parseInt(part, 10));
        const appointmentDate = new Date(year, month - 1, day);

        if (isNaN(appointmentDate)) return '';

        const dayFormatted = appointmentDate.getDate().toString().padStart(2, '0');
        const monthIndexFormatted = appointmentDate.getMonth();
        const yearFormatted = appointmentDate.getFullYear();
        const monthNameFormatted = months[monthIndexFormatted];

        return `${dayFormatted}-${monthNameFormatted}-${yearFormatted}`;
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
                                            src={appointment.serviceType?.toLowerCase() === 'male' ? maleImage : femaleImage}
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
                                        <span className={styles.locationDistance}>{formatAppointmentDate(appointment.date)}</span>
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