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
import { getInvoice } from "../../../api/account.api";

const ViewDetails = ({ isOpen, onClose, appointmentId }) => {
  const [completed, setCompleted] = useState({});
  const [invoice, setInvoice] = useState([]);
  const [cgst, setCgst] = useState(0);
  const [sgst, setSgst] = useState(0);

  // const completeAppointment = async () => {
  //   try {
  //     await completeAppointments(appointmentId);
  //     Notify.success("Appointment Completed Successfully");
  //   } catch (error) {
  //     Notify.error(error.message);
  //   }
  // };

  // const calculateGrandTotal = (services) => {
  //   return services.reduce((total, service) => total + service.servicePrice, 0);
  // };

  function formatDate(dateString) {
    if (!dateString) return '';
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const [day, month, year] = dateString.split('-');
    const monthIndex = parseInt(month, 10) - 1; // Convert month to 0-based index

    const formattedDate = `${day}-${months[monthIndex]}-${year}`;
    return formattedDate;
  }

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await detailsAppointments(appointmentId);
        const completedData = response.data;
        setCompleted(completedData);
        const total = completedData?.services?.reduce(
          (sum, service) => sum + (service.servicePrice || 0),
          0
        );
        setCgst(total * 0.09);
        setSgst(total * 0.09);
      } catch (error) {
        Notify.error(error.message);
      }
    };
    fetchAppointments();
  }, [appointmentId]);

  const grandTotal = completed?.services?.reduce(
    (sum, service) => sum + (service.servicePrice || 0),
    0
  ) + cgst + sgst;

  // Invoice API call
  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await getInvoice(appointmentId);
        setInvoice(res.data); // Assuming getInvoice returns the entire invoice object
      } catch (error) {
        console.error("Error fetching invoice", error);
      }
    };
    fetchInvoice();
  }, [appointmentId]);

  const handleDownloadInvoice = async () => {
    try {
      const invoicePath = invoice.invoicePath;
      const link = document.createElement('a');
      link.href = invoicePath;
      link.setAttribute('download', '');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading invoice", error);
    }
  };

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      className={styles.drawer}
      PaperProps={{
        sx: { marginTop: "100px", height: `calc(100% - 100px)` },
        overflowX: "hidden",
      }}
    >
      <Box
        sx={{
          width: { xs: "300px", lg: "450px", md: "450px" },
        }}
        role="presentation"
        onClick={onClose}
        onKeyDown={onClose}
      >
        <List className="d-flex justify-content-start align-items-center ps-5 pe-5 pt-4 fw-bold gap-1">
          <RxCross2 className="fs-5 fw-bold cancel" style={{ cursor: "pointer" }} onClick={onClose} />
          <div className="">Appointment Details</div>
        </List>
        <hr style={{ borderTop: "2px solid black" }} />
        <Col md={12} className={styles.mainDiv}>
          <Row>
            <h5>Salon Details</h5>
            <Col>
              <p>Salon Name</p>
            </Col>
            <Col>
              <p className="pb-3">{completed?.salon?.name}</p>
            </Col>
          </Row>
          <Row>
            <h5>User Details</h5>
            <Col>
              <p>User</p>
            </Col>
            <Col>
              <p>{completed?.userName}</p>
            </Col>
          </Row>
          <div className={styles.rowDiv}>
            <Row>
              <h5>Appointment Details</h5>
              <Col>
                <p>Date</p>
              </Col>
              <Col>
                <p>{formatDate(completed?.date)}</p>
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
                <p>Service Type</p>
              </Col>
              <Col>
                <p>{completed?.serviceType}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>Home Service:</p>
              </Col>
              <Col>
                <p>{completed?.homeService === true ? "Yes" : "No"}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>Service Start Time</p>
              </Col>
              <Col>
                <p>{completed?.serviceStartTime}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>Service End Time</p>
              </Col>
              <Col>
                <p>{completed?.serviceEndTime}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>Service Date</p>
              </Col>
              <Col>
                <p>{formatDate(completed?.serviceDate)}</p>
              </Col>
            </Row>
            {completed?.homeService === true && (
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
            )}
          </div>
        </Col>
        <Row className={styles.mainDiv}>
          <h5>Services</h5>
          {completed.services &&
            completed.services.map((service) => (
              <Row key={service.serviceId}>
                <Col>
                  <p className={styles.service}>{service.serviceName}</p>
                </Col>
                <Col>
                  <p>{service.servicePrice}</p>
                </Col>
              </Row>
            ))}
        </Row>
        <Row className={styles.mainDiv}>
          <h5>Payment Method</h5>
          <Col>
            <p>Payment Status</p>
          </Col>
          <Col><p>{completed?.paymentStatus?.paymentStatus}</p></Col>
          <Row>
            <Col>
              <p>Payment Mode</p>
            </Col>
            <Col><p className="px-3">{completed?.paymentStatus?.paymentMode}</p></Col>
          </Row>
        </Row>
        <Row className={styles.mainDiv}>
          <h5>Payment Summary</h5>
          <Col>
            <p>Item Total</p>
          </Col>
          <Col>
            <p>₹{completed?.services?.reduce((sum, service) => sum + (service.servicePrice || 0), 0)}</p>
          </Col>
        </Row>
        <Row className={styles.mainDiv}>
          <Col>
            <p className={styles.tax}>GST</p>
          </Col>
          <Col>
            <p className={styles.tax}>₹ {(cgst + sgst).toFixed(2)}</p>
          </Col>
        </Row>
        <hr />
        <Row className={styles.mainDiv}>
          <Col>
            <h5>Grand Total</h5>
          </Col>
          <Col>
            <h5>₹ {grandTotal.toFixed(2)}</h5>
          </Col>
        </Row>
        <div className={styles.invoice}>
          <button onClick={handleDownloadInvoice}>Download Invoice</button>
        </div>
      </Box>
    </Drawer>
  );
};

export default ViewDetails;
