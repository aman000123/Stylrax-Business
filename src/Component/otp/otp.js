import React, { useState, useEffect } from "react";
import styles from "../../assets/scss/pages/home/otp.module.css";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";

const Otp = ({ mobileNumber }) => {
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.trim() === "" || otp.length !== 4) {
      setErrorMessage("Please enter a valid OTP.");
    } else {
      setErrorMessage("");
      try {
        const response = await fetch(
          "https://devapi.stylrax.com/b2b/account/otp/verify",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              countryCode: "91",
              phoneNumber: mobileNumber.replace(/\s/g, ""),
              otp: otp,
            }),
          }
        );
        const data = await response.json();
        if (response.ok) {
          console.log("OTP Verified:", data);
          setIsRegistered(true);
          navigate("/salon-dashboard");
        } else {
          console.error("Failed to verify OTP:", data);
          navigate('/account')
          setErrorMessage("Failed to verify OTP.");
        }
      } catch (error) {
        console.error("Failed to verify OTP:", error);
        setErrorMessage("Failed to verify OTP.");
      }
    }
  };
  const handleResendOTP = async () => {
    try {
      setResendDisabled(true);
      setResendTimer(15);

      const response = await fetch(
        "https://devapi.stylrax.com/b2b/account/otp/resend",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            countryCode: "91",
            phoneNumber: mobileNumber.replace(/\s/g, ""),
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log("OTP Resent:", data);
      } else {
        console.error("Failed to resend OTP:", data);
        setErrorMessage("Failed to resend OTP");
      }
    } catch (error) {
      console.error("Failed to resend OTP:", error);
      setErrorMessage("Failed to resend OTP.");
    } finally {
      setTimeout(() => {
        setResendDisabled(false);
      }, 15000);
    }
  };

  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

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
          <p
            type="button"
            className={`${styles.resend} ${
              resendDisabled ? styles.disabled : ""
            }`}
            onClick={handleResendOTP}
          >
            Resend {resendTimer > 0 ? `(${resendTimer}s)` : ""}
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
