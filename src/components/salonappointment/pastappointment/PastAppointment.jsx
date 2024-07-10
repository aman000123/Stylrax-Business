import { Row, Col } from "react-bootstrap";
import { FiDownload } from "react-icons/fi";
import { useEffect, useState } from "react";
import { completedAppointments } from "../../../api/appointments.api";
import Session from "../../../service/session";
import Notify from "../../../utils/notify";
import styles from "../upcomingappointment/UpComing.module.css";
import ViewDetails from "./ViewDetails";
import maleImage from '../../../assets/image/male-placeholder.svg';
import femaleImage from '../../../assets/image/female-placeholder.svg';
import { toLower } from "lodash";
import { getInvoice } from "../../../api/account.api";

const PastAppointment = () => {
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [completed, setCompleted] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [invoice, setInvoice] = useState(null); // Initialize invoice state

  const salonId = Session.get("salonId");

  // Fetch completed appointments on component mount or salonId change
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await completedAppointments(salonId);
        const completedAppointmentsData = response.data;
        setCompleted(completedAppointmentsData);
      } catch (error) {
        Notify.error(error.message);
      }
    };
    fetchAppointments();
  }, [salonId]);

  // Fetch invoice when selectedAppointmentId changes
  const fetchInvoice = async (appointmentId) => {
    try {
      const res = await getInvoice(appointmentId);
      setInvoice(res.data); // Assuming getInvoice returns the entire invoice object
      downloadInvoice(res.data.invoicePath); // Trigger download after fetching invoice
    } catch (error) {
      console.error("Error fetching invoice", error);
      Notify.error(error.message);
    }
  };

  // Function to handle download of invoice
  const downloadInvoice = (invoicePath) => {
    const link = document.createElement('a');
    link.href = invoicePath;
    link.setAttribute('download', '');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle click on "Download Invoice"
  const handleDownloadInvoice = async (appointmentId) => {
    try {
      setSelectedAppointmentId(appointmentId); // Update selectedAppointmentId
      fetchInvoice(appointmentId); // Fetch invoice based on selected appointmentId
    } catch (error) {
      Notify.error("Error downloading invoice");
    }
  };

  const handleViewDetails = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedAppointmentId(null);
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[d.getMonth()];
    const day = String(d.getDate()).padStart(2, '0');
    return `${day}-${month}-${year}`;
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
          <Col md={6} sm={6} lg={6} xs={12} key={index}>
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
                      <span className={styles.gender}>
                        {appointment.serviceType}
                      </span>
                    </span>
                    <br />
                    <span className={styles.locationDistance}>
                      {formatDate(appointment.date)}
                    </span>
                  </p>
                </Col>
                <Col md={4}>
                  <p
                    className={`${styles.status} ${getStatusClass(appointment?.status)}`}
                  >
                    {appointment.status}
                  </p>
                </Col>
              </div>
              <Col className={styles.invoice}>
                <div className={styles.invoiceDiv}>
                  <p
                    onClick={() => handleViewDetails(appointment.id)}
                    className={styles.viewDetailsLink}
                  >
                    View Details
                  </p>
                  <div className={styles.iconDiv} onClick={() => handleDownloadInvoice(appointment.id)} style={{ cursor: "pointer" }}>
                    <FiDownload className={styles.loadIcon} />
                    <p>Download Invoice</p>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        ))}
      </Row>
      {showDetails && (
        <ViewDetails
          isOpen={showDetails}
          onClose={handleCloseDetails}
          appointmentId={selectedAppointmentId}
        />
      )}
    </div>
  );
};

export default PastAppointment;
