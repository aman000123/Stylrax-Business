import { useState } from "react";
import OTPInput from "react-otp-input";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from "./Start.module.css";
import Notify from "../../../utils/notify";
import { startAppointments } from "../../../api/appointments.api";
function Start(props) {
  const { appointmentId, onOtpSubmit, updatedData } = props;
  const [otp, setOtp] = useState("");
  const [otpSubmitted, setOtpSubmitted] = useState(false);
  const handleOtpChange = (otpValue) => {
    setOtp(otpValue);
  };

  const renderInput = (props, index) => (
    <input
      {...props}
      key={index}
      autoFocus={index === 0}
      className={styles.inputOtp}
      pattern="[0-9]*"
      onKeyDown={(e) => {
        // Allow backspace, tab, enter, and numbers
        if (
          !(
            e.key === "Backspace" ||
            e.key === "Tab" ||
            e.key === "Enter" ||
            /^\d$/.test(e.key)
          )
        ) {
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
      otp: otpValue,
    };
    startAppointment(requestBody);
  };

  const startAppointment = async (otp) => {
    try {
      await startAppointments(appointmentId, otp);
      Notify.success("Appointment Started Successfully");
      setOtpSubmitted(true);
      props.onHide();
      onOtpSubmit();
      updatedData();
    } catch (error) {
      Notify.error(error.message);
    }
  };
  return (
    <>
      <Modal
        show={props.show}
        onHide={props.onHide}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Body className={styles.centeredModalBody}>
          <h5>
            Enter the 4-digit OTP to start service and it take from the user
          </h5>
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
          <button onClick={handleOtpSubmit} className={styles.submit_otp}>
            Submit OTP
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Start;
