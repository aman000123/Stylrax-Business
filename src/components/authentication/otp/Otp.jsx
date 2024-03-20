import  { useState} from "react";
import styles from "../otp/Otp.module.css";
import OtpInput from "react-otp-input";
import Notify from "../../../utils/notify";
import { useNavigate } from "react-router-dom";
import { resendOtp, verifyOtp } from "../../../api/account.api";
import { useDispatch } from "react-redux";
import { storeToken } from "../../../store/auth.slice";


const Otp = ({ phoneNumber }) => {
  const [otp, setOtp] = useState("");
  const [ setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
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
    if (!validateOtp(otp)) {
      setErrorMessage("Please enter a valid OTP.");
      return;
    }
    try {
      setIsSubmitting(true);
      const verifyData = {
        countryCode: "91",
        phoneNumber: phoneNumber,
        otp: otp,
      };

      const { data } = await verifyOtp(verifyData);

      const authData = {
        token: data.authToken,
        email: data.email,
        phoneNumber: data.phoneNumber,
        role: data.role,
      }
      dispatch(storeToken(authData));
      if (data.profileStatus === 0) {
        navigate("/account");
      }
      else {
        navigate("/salon-dashboard");
      }
    } catch (error) {
      Notify.error(error.message);
    } finally {
      setIsSubmitting(false);
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
