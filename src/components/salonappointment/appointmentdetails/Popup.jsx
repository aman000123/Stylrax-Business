import Modal from "react-bootstrap/Modal";
import styles from "./Popup.module.css";
import { Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import Notify from "../../../utils/notify";
import {
  acceptAppointments,
  completeAppointments,
  detailsAppointments,
  rejectAppointments,
} from "../../../api/appointments.api";
import { useState } from "react";
import { Paper } from "@mui/material";
import Start from "../startservice/StartService";
export default function Popup(props) {
  const appointmentId = props.data;
  const [appointmentDetails, setAppointmentDetails] = useState({});
  const [isAccepted, setIsAccepted] = useState(false);
  const [startServiceClicked, setStartServiceClicked] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const [otpSubmitted, setOtpSubmitted] = useState(false);
  const appointments = async () => {
    try {
      const response = await detailsAppointments(appointmentId);
      const ongoing = response.data;
      console.log(" ongoing completed::>", ongoing);
      setAppointmentDetails(ongoing);
    } catch (error) {
      Notify.error(error.message);
    }
  };
  useEffect(() => {
   
    appointments();
  }, []);

  const acceptAppointment = async () => {
    try {
      await acceptAppointments(appointmentId);
      Notify.success("Appointment Accepted Successfully");
      setIsAccepted(true);
      appointments();
    } catch (error) {
      Notify.error(error.message);
    }
  };

  const rejectAppointment = async () => {
    try {
      await rejectAppointments(appointmentId);
      Notify.success("Appointment Rejected Successfully");
      setStartServiceClicked(false);
      appointments();
    } catch (error) {
      Notify.error(error.message);
    }
  };
  const completeAppointment = async () => {
    try {
      await completeAppointments(appointmentId);
      Notify.success("Appointment Completed Successfully");
      setStartServiceClicked(false);
      appointments();
    } catch (error) {
      Notify.error(error.message);
    }
  };
  const handleStartService = () => {
    setStartServiceClicked(true);
    console.log("startServiceClicked:", startServiceClicked);
  };
  useEffect(() => {
    console.log("startServiceClicked:", startServiceClicked);
  }, [startServiceClicked]);
  const calculateGrandTotal = (services) => {
    return services.reduce((total, service) => total + service.servicePrice, 0);
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
        return styles.accepted;
      case "CONFIRMED":
        return styles.completed;
      case "IN_SERVICE":
        return styles.completed;
      case "IN_PROGRESS":
        return styles.completed;
      default:
        return "";
    }
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.centered}>
        <Row className="d-flex">
          <Col md={12}>
            <Paper elevation={3} className="p-3 rounded">
              <Row>
                <h6>Appointment Details</h6>

                <Col>
                  <p>Appointment Id:</p>
                </Col>
                <Col>
                  <p>{appointmentDetails?.appointmentId}</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p>Status:</p>
                </Col>
                <Col>
                  <p
                    className={`${styles.status} ${getStatusClass(
                      appointmentDetails?.status
                    )}`}
                  >
                    {appointmentDetails?.status}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p>Appointment Date:</p>
                </Col>
                <Col>
                  <p>{appointmentDetails?.date}</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p>Appointment Time:</p>
                </Col>
                <Col>
                  <p>{appointmentDetails?.startTime}</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p>Customer Identity:</p>
                </Col>
                <Col>
                  <p>{appointmentDetails?.serviceType}</p>
                </Col>
              </Row>
            </Paper>
          </Col>
        </Row>
        <Row className="pt-2">
          <Col md={6}>
            <Paper elevation={3} className="p-3">
              <h6>User Details</h6>
              <Row>
                <Col>
                  <p>Pincode:</p>
                </Col>
                <Col>
                  <p>{appointmentDetails?.userAddress?.pincode}</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p>UserId:</p>
                </Col>
                <Col>
                  <p>{appointmentDetails?.userAddress?.userId}</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p>County:</p>
                </Col>
                <Col>
                  <p>{appointmentDetails?.userAddress?.country}</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p>Address:</p>
                </Col>
                <Col>
                  <p>{`${appointmentDetails?.userAddress?.city} , ${appointmentDetails?.userAddress?.streetAddress}  , ${appointmentDetails?.userAddress?.houseNo}`}</p>
                </Col>
              </Row>
            </Paper>
          </Col>
          <Col md={6}>
            <Paper elevation={3} className="p-3">
              <h6>Payment Details</h6>
              {appointmentDetails.services &&
                appointmentDetails.services.map((service) => (
                  <Row key={service.serviceId}>
                    <Col>
                      <p>{service.serviceName}</p>
                    </Col>
                    <Col>
                      <p>{service.servicePrice}</p>
                    </Col>
                  </Row>
                  
                ))}
                <hr/>
                 <Row>
                <Col>
                  <p>Grand Total:</p>
                </Col>
                <Col>
                <p>
                    {appointmentDetails.services
                      ? calculateGrandTotal(appointmentDetails.services)
                      : 0}
                  </p> </Col>
              </Row>
            </Paper>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
      {appointmentDetails.status === "PENDING" && (
  <>
    {!isAccepted && !isRejected && (
      <>
        <button className={styles.accept} onClick={acceptAppointment}>
          Accept
        </button>
        <button className={styles.accept} onClick={rejectAppointment}>
          Reject
        </button>
      </>
    )}
    {isAccepted && !startServiceClicked && (
      <button className={styles.accept} onClick={handleStartService}>
        Start Service
      </button>
    )}
    {startServiceClicked && (
      <Start
        show={startServiceClicked}
        onHide={() => setStartServiceClicked(false)}
        appointmentId={appointmentId}
        onOtpSubmit={() => {}}
        updatedData={setAppointmentDetails}
      />
    )}
  </>
)}
  {appointmentDetails.status === "CONFIRMED" && (
    <>
      <button className={styles.accept} onClick={handleStartService}>
        Start Service
      </button>
      {startServiceClicked && (
        <Start
          show={startServiceClicked}
          onHide={() => setStartServiceClicked(false)}
          appointmentId={appointmentId}
          onOtpSubmit={() => setOtpSubmitted(true)}
          updatedData={appointments}
        />
      )}
    </>
  )}
  {(appointmentDetails.status === "IN_PROGRESS" ||
    appointmentDetails.status === "IN_SERVICE") && (
    <button className={styles.accept} onClick={completeAppointment}>
      Complete Service
    </button>
  )}
  {appointmentDetails.status === "COMPLETED" && (
    <button className={styles.accept} >
      Invoice
    </button>
  )}
</Modal.Footer>
    </Modal>
  );
}
