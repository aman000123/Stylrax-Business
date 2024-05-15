import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles  from "../salonappointment/upcomingappointment/UpComing.module.css";
import { Row,Col } from 'react-bootstrap';
import { useEffect } from 'react';
import Notify from "../../utils/notify";

import { detailsAppointments } from '../../api/appointments.api';
import { useState } from 'react';
 export default function Popup(props) {

    const appointmentId = props.data;
   // console.log("app id",appointmentId)
    const [appointmentDetails, setAppointmentDetails] = useState({});

 useEffect(()=>{
        const appointments = async()=>{
          try {
            const response = await detailsAppointments(appointmentId);
            console.log("aradhya::>",response)
            const ongoing = response.data;
            console.log(" ongoing completed::>",ongoing)
            setAppointmentDetails(ongoing);
          } catch (error) {
            Notify.error(error.message);
          }
        };
        appointments();
      }, [appointmentId])
   
  return (

    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.centered}>
      <div >

        <Row>
        <Col md={6}>
       <h6> Appointment Id: </h6>
      {/* <h6>  Date:</h6> */}
      <h6>  Status:</h6>
      <h6> Salon Address:</h6>
      <h6>Salon Name:</h6>
      <h6>Salon Id:</h6>
      <h6>Salon State:</h6>
      <h6>Salon City:</h6>
      <h6>Salon pincode:</h6>

        </Col>
        <Col lg={6}>
      <p> {appointmentDetails?.appointmentId}</p>
      {/* <p> {appointmentDetails?.date}</p> */}
      <p> {appointmentDetails?.status}</p>
      <p> {appointmentDetails?.userAddress?.streetAddress}</p>
      <p> {appointmentDetails?.salon?.name}</p>
      <p> {appointmentDetails?.salon?.id}</p>
      <p> {appointmentDetails?.salon?.state}</p>
      <p> {appointmentDetails?.salon?.city}</p>
      <p> {appointmentDetails?.salon?.pincode}</p>


        </Col>
        </Row>
      

        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}


