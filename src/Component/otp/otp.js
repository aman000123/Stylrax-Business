import React, { useState, useEffect } from "react";
import styles from "../../assets/scss/pages/home/otp.module.css";
import OtpInput from "react-otp-input";
import Notify from "../../utils/notify";
import { useNavigate } from "react-router-dom";
import { resendOtp, verifyOtp } from "../../api/account.api";
import { useDispatch } from "react-redux";
import { storeToken } from "../../features/authInfo";


const Otp = ({ phoneNumber }) => {
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialValues = {
    otp: "",
  };
  const validateOtp = (otp) => {
    return /^\d{4}$/.test(otp);
  };
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateOtp(otp)) {
      console.log("Otp" + otp);
      try {
        setIsSubmitting(true);
        const verifyData = {
          countryCode: "91",
          phoneNumber: phoneNumber,
          otp: otp,
        };




        
        const res = await verifyOtp(verifyData);
        console.log("response ::", res.data.statusCode);
        if (res.data.statusCode == "200") {
          const authToken = res.data.data.authToken;
          console.log("Received token:", authToken);
          dispatch(storeToken({ token: authToken }));
          console.log("Received token:", authToken);
          console.log("Phone number:", phoneNumber);

          if (authToken === phoneNumber) {
            console.log("Token matches phone number.");
            navigate("/salon-dashboard");
          } else {
            console.log("Token matches not phone number.");
            navigate("/account");
          }
        }
      } catch (error) {
        Notify.error(error.message);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleResend = async (event) => {
    event.preventDefault();
    try {
      setIsSubmitting(true);
      const resendData = {
        countryCode: "91",
        phoneNumber: phoneNumber,
      };
      const res = await resendOtp(resendData);
      console.log("Resend OTP response:", res.data);
      if (res.data.statusCode == "200") {
        Notify.success("OTP has been resent successfully.");
      } else {
        Notify.error("Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      Notify.error("Failed to resend OTP. Please try again later.");
    } finally {
      setIsSubmitting(false);
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
              value={phoneNumber}
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
          <p onClick={handleResend} type="button" className={styles.resend}>
            Resend
          </p>
          {errorMessage && <div className="text-danger">{errorMessage}</div>}
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
