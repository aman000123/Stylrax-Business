import { useEffect, useState } from "react";
import styles from "../otp/Otp.module.css";
import OTPInput from "react-otp-input";
import Notify from "../../../utils/notify";
import { useNavigate } from "react-router-dom";
import { resendOtp, verifyOtp } from "../../../api/account.api";
import { useDispatch, useSelector } from "react-redux";
import { storeSalons, storeToken } from "../../../store/auth.slice";
import PropTypes from "prop-types";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { OTPSchema } from "../../../utils/schema";
import PhoneInputComponent from "../login/PhoneInputComponent";

const initialValues = {
  otp: "",
};

const Otp = ({ phoneNumber, timer, setTimer, isTimerActive, setIsTimerActive }) => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();

  const renderInput = (props, index) => (
    <input
      {...props}
      key={index}
      autoFocus={index === 0}
      className={styles.inputOtp}
      pattern="[0-9]*"
      inputMode="numeric"
      onInput={(e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
      }}
      onKeyDown={(e) => {
        if (!/^\d$/.test(e.key)) {
          e.preventDefault();
        }
      }}
    />
  );

  const clearOtp = (formikProps) => {
    formikProps.setFieldValue("otp", "");
  };

  useEffect(() => {
    let interval;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timer, setTimer, setIsTimerActive]);

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true); 
      const verifyData = {
        countryCode: "91",
        phoneNumber: phoneNumber,
        otp: values.otp,
      };

      const { data} = await verifyOtp(verifyData);
      const salons = data.salons;
      // console.log("salons::>",salons)

      const ProfileStatus = data.profileStatus;
      // console.log("status::>", ProfileStatus)
      const authData = {
        token: data.authToken,
        email: data.email,
        phoneNumber: data.phoneNumber,
        role: data.role,
        profileStatus:data.profileStatus,
        userType:data.userType,
        profileImageUrl:data.profile.profileImageUrl,
        firstName:data.profile.firstName,
      };
      if(data.profileStatus===2 || 0){
        dispatch(storeSalons({ salons: data.salons }));

      }

      dispatch(storeToken(authData));
      // console.log(authData)
      if (data.profileStatus === 3 && data.verified) {
        navigate("/salon/dashboard");
      }
     // if (data.profileStatus === 2) {
        //navigate("/account/create" ,{ state: { token: data.authToken } });
       // handleBankDetails()
     // }
      else {
        navigate("/account/create" ,{ state: { token: data.authToken } });
     }
    } catch (error) {
      Notify.error(error.message);
    }
  };

  const handleResend = async (event) => {
    event.preventDefault();
    try {
      const resendData = {
        countryCode: "91",
        phoneNumber: phoneNumber,
      };
      const res = await resendOtp(resendData);
      Notify.success(res.message)
      setTimer(30); // Reset the timer
      setIsTimerActive(true); // Start the timer
    } catch (error) {
      Notify.error(error.message);
    }
  };

  return (
    <div className={styles.loginBorder}>
      <>
        <h3 className={styles.login}>Login/Register</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={OTPSchema}
          onSubmit={onSubmit}
        >
          {(props) => (
            <Form className={styles.form}>
              <div className={styles.formGroup}>
                <label className="mb-1">Mobile Number</label>
                <br />
                <PhoneInputComponent value={phoneNumber}
                  readOnly  style={{
                    borderRadius: "20px",
                    boxShadow: "none",
                    outlineColor: "none",
                  }}/>
              </div>
              <div className="otp-box d-flex justify-content-center my-3">
                <OTPInput
                  value={props.values.otp}
                  onChange={(otp) => {
                    props.handleChange({ target: { name: "otp", value: otp } });
                  }}
                  numInputs={4}
                  renderSeparator={<span></span>}
                  isInputNum
                  className={styles.inputOtp}
                  renderInput={renderInput}
                />
              </div>
              {submitting && timer < 30 && (
              <div>Resend OTP in {30 - timer} seconds</div>
            )}
              {isTimerActive ? (
                <div className={styles.timerDiv}>{`Resend OTP in ${timer} seconds`}</div>
              ) : (
                <p
                  type="button"
                  onClick={handleResend}
                  className={`${styles.resend}`}
                >
                  Resend
                </p>
              )}
              <p
                type="button"
                className={styles.clear}
                onClick={() => clearOtp(props)}
              >
                Clear
              </p>
              <ErrorMessage
                        component="div"
                        name="otp"
                        className={styles.error}
                    />
              <div>
              <button
                  type="submit"
                  className={styles.btn}
                  disabled={props.isSubmitting}
                >
                  {props.isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </>
    </div>
  );
};

Otp.propTypes = {
  phoneNumber: PropTypes.string.isRequired,
  timer: PropTypes.number.isRequired,
  setTimer: PropTypes.func.isRequired,
  isTimerActive: PropTypes.bool.isRequired,
  setIsTimerActive: PropTypes.func.isRequired,
};

export default Otp;