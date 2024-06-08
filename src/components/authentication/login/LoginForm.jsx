import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Login from "../../home/loginpage/Login";
import styles from "../../home/loginpage/Login.module.css";
import { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Otp from "../../authentication/otp/Otp";
import { doLogin } from "../../../api/account.api";
import Notify from "../../../utils/notify";
import { Field, Formik, ErrorMessage, Form } from "formik";
import { LoginSchema } from "../../../utils/schema";
import PhoneInputComponent from "./PhoneInputComponent";
import { Link } from "react-router-dom";

const initialValues = {
  phoneNumber: "",
};

const LoginForm = ({ setActiveStep }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOTPSection, setShowOTPSection] = useState(false);
  const [submitting, setSubmitting] = useState("Submit");

  const [timer, setTimer] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [submittingText, setSubmittingText] = useState("Submit");

  const onSubmit = async (values, { setFieldError }) => {
    try {
      setSubmitting(true);
      setSubmittingText("Submitting...");
      console.log("Submitting form with values:", values);
      const { phoneNumber } = values;
      console.log("Values ::", values);
      const data = {
        countryCode: "91",
        phoneNumber: phoneNumber,
        deviceType: 1,
        deviceToken: "staff3deviceid",
      };
      const res = await doLogin(data);
      console.log("Response:", res.data);
      setPhoneNumber(phoneNumber);
      setShowOTPSection(true);
      setTimer(30);
      setIsTimerActive(true);
    } catch (error) {
      console.error("Error:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setFieldError("phoneNumber", error.response.data.message);
      } else {
        Notify.error(error.message);
      }
    } finally {
      setSubmitting(false);
      setSubmittingText("Submit");
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.bg}>
        <Container>
          <Row className="align-items-center d-flex">
            <Login />
            <Col
              md={6}
              className={`${styles.LoginForm} d-flex justify-content-center`}
            >
              <div className={`${styles.loginBorder} text-white d-flex`}>
                {!showOTPSection ? (
                  <>
                    <h3 className={`${styles.login} text-white text-center`}>
                      Please provide your number to login/register with us.
                    </h3>
                    <Formik
                      initialValues={initialValues}
                      validationSchema={LoginSchema}
                      onSubmit={(values, { setSubmitting, setFieldError }) => {
                        setSubmitting(true);
                        setSubmittingText("Submitting...");
                        onSubmit(values, { setSubmitting, setFieldError });
                      }}
                    >
                      {({ handleSubmit }) => (
                        <Form className={styles.form} onSubmit={handleSubmit}>
                          <div className={styles.formGroup}>
                            <PhoneInputComponent
                              style={{
                                borderRadius: "20px",
                                boxShadow: "none",
                                outlineColor: "none",
                              }}
                            />
                            <ErrorMessage
                              component="div"
                              name="phoneNumber"
                              className={styles.error}
                            />
                          </div>
                          <div className="justify-content-center">
                            <div
                              className={`${styles.agreementText} text-center mt-2`}
                            >
                              By continuing, you agree to Stylrax's{" "}
                              <Link to="/home/terms-condition">
                                Terms of use&nbsp;
                              </Link>
                              and <Link to="/home/privacy">Privacy Policy</Link>
                              .
                            </div>
                            <div className={styles.btnDiv}>
                              <button
                                type="submit"
                                className={`${styles.btn} text-black bg-white`}
                               // disabled={submitting}
                              >
                                {submitting ? submittingText : "Continue"}
                              </button>
                            </div>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </>
                ) : (
                  <Otp
                    phoneNumber={phoneNumber}
                    setActiveStep={setActiveStep}
                    timer={timer}
                    setTimer={setTimer}
                    isTimerActive={isTimerActive}
                    setIsTimerActive={setIsTimerActive}
                  />
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </main>
  );
};

export default LoginForm;
