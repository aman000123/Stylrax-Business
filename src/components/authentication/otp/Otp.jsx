import { useState } from "react";
import styles from "../otp/Otp.module.css";
import OTPInput from "react-otp-input";
import Notify from "../../../utils/notify";
import { useNavigate } from "react-router-dom";
import { resendOtp, verifyOtp } from "../../../api/account.api";
import { useDispatch } from "react-redux";
import { storeToken } from "../../../store/auth.slice";
import PropTypes from "prop-types";
import { Field, Formik, Form,ErrorMessage } from "formik";
import { OTPSchema } from "../../../utils/schema";

const initialValues = {
  otp: "",
};

const Otp = ({ phoneNumber }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
  const clearOtp = (formikProps) => {
    formikProps.setFieldValue("otp", "");
  };

  const onSubmit = async (values) => {
    try {
      const verifyData = {
        countryCode: "91",
        phoneNumber: phoneNumber,
        otp: values.otp,
      };

      const { data } = await verifyOtp(verifyData);

      const authData = {
        token: data.authToken,
        email: data.email,
        phoneNumber: data.phoneNumber,
        role: data.role,
      };
      dispatch(storeToken(authData));
      if (data.profileStatus === 0) {
        navigate("/salon/account/create");
      } else {
        navigate("/salon/dashboard");
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
      console.log("Resend OTP response:", res.data);
    } catch (error) {
      Notify.error("Failed to resend OTP. Please try again later.");
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
                <Field
                  type="text"
                  className={styles.input}
                  value={phoneNumber}
                  readOnly
                />
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
              <p type="button" onClick={handleResend} className={styles.resend}>
                Resend
              </p>
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
                <button type="submit" className={styles.btn}>
                  Submit
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
};

export default Otp;
