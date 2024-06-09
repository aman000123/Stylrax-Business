import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { RxCross2 } from "react-icons/rx";
import {
  completeAppointments,
  detailsAppointments,
} from "../../../api/appointments.api";
import Notify from "../../../utils/notify";
import { Col, Row } from "react-bootstrap";
import styles from "./ViewDetails.module.css";
const ViewDetails = ({ isOpen, onClose, appointmentId }) => {
  const [completed, setCompleted] = useState({});

  const completeAppointment = async () => {
    try {
      await completeAppointments(appointmentId);
      Notify.success("Appointment Completed Successfully");
    } catch (error) {
      Notify.error(error.message);
    }
  };

  const calculateGrandTotal = (services) => {
    return services.reduce((total, service) => total + service.servicePrice, 0);
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await detailsAppointments(appointmentId);
        const completedData = response.data;
        setCompleted(completedData);
      } catch (error) {
        Notify.error(error.message);
      }
    };
    fetchAppointments();
  }, [appointmentId]);

  const total = completed?.services?.reduce(
    (sum, service) => sum + (service.servicePrice || 0),
    0
  );
  const taxesAndFee = 49;
  const grandTotal = total + taxesAndFee;

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose} className={styles.hh}>
      <Box
       // sx={{ width: 450 }}
       sx={{
        width: { xs: "300px",lg: "450px" } 
      }}        role="presentation"
        onClick={onClose}
        onKeyDown={onClose}
      >
        <List className="d-flex justify-content-start align-items-center ps-5 pe-5 pt-4 fw-bold gap-1">
          <RxCross2 className="fs-5 fw-bold cursor-pointer" onClick={onClose} />
          <div className="">Appointment Details</div>
        </List>
        <hr style={{ borderTop: "2px solid black" }} />
        <Col md={12} className={styles.mainDiv}>
          <Row>
            <h5 className="pb-3">{completed?.salon?.name}</h5><br/>
          </Row>
          <div className="d-flex">
            <Row>
              <Col md={6}>
                <h6>Phone</h6>
                <Col>
                  <p>877883884</p>
                </Col>
              </Col>
              <Col md={6}>
                <h6>Email</h6>
                <Col>
                  <p>amisha123@gmail.com</p>
                </Col>
              </Col>
            </Row>
          </div>
          <Row>
            <h6>Appointment Details</h6>
            <Col>
              <p>Date</p>
            </Col>
            <Col>
              <p>{completed?.date}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>Time</p>
            </Col>
            <Col>
              <p>{completed?.startTime}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>Appointment Number:</p>
            </Col>
            <Col>
              <p>{completed?.appointmentId}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>Address</p>
            </Col>
            <Col>
              <p>
                {completed?.userAddress?.houseNo},{" "}
                {completed?.userAddress?.streetAddress},{" "}
                {completed?.userAddress?.city}
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>Total payment</p>
            </Col>
            <Col>
              <p>₹{total}</p>
            </Col>
          </Row>
        </Col>
        <Row className={styles.mainDiv}>
          <h6>Services</h6>
          {completed.services &&
            completed.services.map((service) => (
              <Row key={service.serviceId}>
                <Col>
                  <p>{service.serviceName}</p>
                </Col>
                <Col>
                  <p>{service.servicePrice}</p>
                </Col>
              </Row>
            ))}
        </Row>
        <Row className={styles.mainDiv}>
          <h6>Payment Method</h6>
          <Col>
            <p>Debit Card</p>
          </Col>
          <Col></Col>
        </Row>
        <Row className={styles.mainDiv}>
          <h6>Payment Summary</h6>
          <Col>
            <p>Item total</p>
          </Col>
          <Col>
            <p>₹{total}</p>
          </Col>
        </Row>
        <Row className={styles.mainDiv}>
          <Col>
            <p>Taxes and Fee</p>
          </Col>
          <Col>
            <p>₹ {taxesAndFee}</p>
          </Col>
        </Row>
        <hr/>
        <Row className={styles.mainDiv}>
          <Col>
            <h6>Total</h6>
          </Col>
          
          <Col>
          
            <p>₹{grandTotal}</p>
          </Col>
        </Row>
        <div className={styles.invoice}>
            <button>Download Invoice</button>
        </div>
      </Box>
    </Drawer>
  );
};

export default ViewDetails;