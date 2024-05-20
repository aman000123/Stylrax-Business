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

const initialValues = {
  phoneNumber: "",
};


const LoginForm = ({  setActiveStep  }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOTPSection, setShowOTPSection] = useState(false);

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true); 
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
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.data && error.response.data.message) {
        setFieldError("phoneNumber", error.response.data.message);
      } else {
        Notify.error(error.message);
      }
    }
  };

  const [submittingText, setSubmittingText] = useState("Submit"); 

  return (
    <main className={styles.main}>
      <div className={styles.bg}>
        <Container>
          <Row className="align-items-center d-flex">
            <Login />
            <Col md={6} className={`${styles.LoginForm} d-flex justify-content-center`}>
              <div className={`${styles.loginBorder} text-white d-flex`}>
                {!showOTPSection ? (
                  <>
                    <h3 className={`${styles.login} text-white text-center`}>
                      Please provide your number to login/register with us.
                    </h3>
                    <Formik
                      initialValues={initialValues}
                      validationSchema={LoginSchema}
                      onSubmit={(values, { setSubmitting }) => {
                        setSubmitting(true); 
                        setSubmittingText("Submitting..."); 
                        onSubmit(values, { setSubmitting }); 
                      }}
                    >
                      {({ handleSubmit }) => (
                        <Form className={styles.form} onSubmit={handleSubmit}>
                          <div className={styles.formGroup}>
                            <PhoneInputComponent />
                            <ErrorMessage
                              component="div"
                              name="phoneNumber"
                              className={styles.error}
                            />
                          </div>
                          <div className="d-flex justify-content-center">
                            <button
                              type="submit"
                              className={`${styles.btn} text-black bg-white`}
                            >
                              Submit
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </>
                ) : (
                  <Otp
                    phoneNumber={phoneNumber}
                    setActiveStep={setActiveStep}
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
