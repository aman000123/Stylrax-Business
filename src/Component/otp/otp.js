import React, { useState } from "react";
import styles from "../../assets/scss/pages/home/otp.module.css";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
const Otp = ({ mobileNumber }) => {
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isRegistered, setIsRegistered] = useState(false); 
  const navigate = useNavigate(); 
  const handleOtpChange = (otpValue) => {
    setOtp(otpValue);
    if (otpValue.length === 4) {
      setErrorMessage("");
    }
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.trim() === "" || otp.length !== 4) {
      setErrorMessage("Please enter a valid OTP.");
    } else {
      setErrorMessage("");
      console.log("Submitting OTP:", otp);

      // Perform OTP verification here
      const isRegisteredUser = true; 
      if (isRegisteredUser) {
        setIsRegistered(true); 
        navigate("/account"); 
      } else {
        setIsRegistered(false); 
      }

      setOtp("");
    }
  };

  return (
    <div className={styles.loginBorder}>
      
        <>
          <h3 className={styles.login}>Login/Register</h3>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label className="mb-1">Mobile Number</label>
              <br />
              <input
                type="text"
                className={styles.input}
                value={mobileNumber}
                readOnly
              />
            </div>
            <div className="otp-box d-flex justify-content-center  my-3">
              <OtpInput
                value={otp}
                onChange={handleOtpChange}
                numInputs={4}
                renderSeparator={<span></span>}
                isInputNum
                shouldAutoFocus
                renderInput={renderInput}
              />
            </div>
            {errorMessage && (
              <div className="text-danger">{errorMessage}</div>
            )}
            <div>
              <button type="submit" className={styles.btn}>
                Submit
              </button>
            </div>
          </form>
        </>
     
    </div>
  );
};

export default Otp;
