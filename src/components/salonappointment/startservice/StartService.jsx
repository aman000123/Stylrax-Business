import { useState } from 'react';
import OTPInput from 'react-otp-input';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from "./Start.module.css";
import Notify from '../../../utils/notify';
import { startAppointments } from '../../../api/appointments.api';
function Start(props) {
  const { appointmentId ,onOtpSubmit} = props;
    console.log("sss",appointmentId)
  const [show, setShow] = useState(false);
  const [otp, setOtp] = useState('');
  const[isAccepted,setIsAccepted] =useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [otpSubmitted, setOtpSubmitted] = useState(false);
  const handleOtpChange = (otpValue) => {
    setOtp(otpValue);
  };

  // const handleOtpSubmit = () => {
  //   // Handle OTP submission logic here
  //   console.log('Submitted OTP:', otp);
  //   handleClose(); // Close the modal after submitting OTP
  // };

  const renderInput = (props, index) => (
    <input
      {...props}
      key={index}
      autoFocus={index === 0}
      className={styles.inputOtp}
      pattern="[0-9]*"
      onKeyDown={(e) => {
        // Allow only numeric keys
        if (!/^\d$/.test(e.key)) {
          e.preventDefault();
        }
      }}
    />
  );
  const handleOtpSubmit = () => {
    if (otp.length !== 4) {
      Notify.error("Please fill OTP");
      return;
    }
    const otpValue = otp; 
    const requestBody = {
      otp: otpValue
    };
    startAppointment(requestBody);
  };
  const startAppointment = async (otp) => {
    try {
      await startAppointments(appointmentId,otp);
      Notify.success("Appointment Started Successfully");
      setOtpSubmitted(true);
      onOtpSubmit();
     // setIsAccepted(true);
     // handleClose();
    props.onHide();
    } catch (error) {
      Notify.error(error.message);
    }
  };
  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
      </Button> */}

      <Modal
        show={props.show}
        onHide={props.onHide}
        backdrop="static"
        keyboard={false}
        centered
      >
       
        <Modal.Body className={styles.centeredModalBody}>
          <h5>Enter the 4-digit OTP to start service and it take from the user</h5>
          <OTPInput
            value={otp}
            onChange={handleOtpChange}
            numInputs={4}
            renderSeparator={<span></span>}
            isInputNum
            className={styles.inputOtp}
            renderInput={renderInput}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button onClick={handleOtpSubmit} className={styles.submit_otp}>
            Submit OTP
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Start;
