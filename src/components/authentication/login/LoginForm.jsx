import Login from "../../home/loginpage/Login";
import styles from "../../home/loginpage/Login.module.css";
import { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Otp from "../../authentication/otp/Otp";
import { doLogin } from "../../../api/account.api";
import Notify from "../../../utils/notify";
import { Field, Formik, ErrorMessage, Form } from "formik";
import { LoginSchema } from "../../../utils/schema";

const initialValues = {
  phoneNumber: "",
};

const LoginForm = ({ setActiveStep }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOTPSection, setShowOTPSection] = useState(false);

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true); 
      console.log(values);
      const { phoneNumber } = values;
      const data = {
        countryCode: "91",
        phoneNumber: phoneNumber,
        deviceType: 1,
        deviceToken: "staff3deviceid",
      };
      const res = await doLogin(data);
      console.log("response ::>", res.data);
      setPhoneNumber(phoneNumber);
      setShowOTPSection(true);
    } catch (error) {
      Notify.error(error.message);
    } finally {
      setSubmitting(false); 
      setSubmittingText(false);
    }
  };

  const [submittingText, setSubmittingText] = useState("Submit"); 

  return (
    <main className={styles.main}>
      <div className={styles.bg}>
        <Container>
          <Row className="align-items-center d-flex">
            <Login />
            <Col md={6} className="d-flex justify-content-center">
              <div className={`${styles.loginBorder} text-white d-flex`}>
                {!showOTPSection ? (
                  <>
                    <h3 className={`${styles.login} text-white text-center`}>Please provide your number to login/register with us.</h3>
                    <Formik
                      initialValues={initialValues}
                      validationSchema={LoginSchema}
                      onSubmit={(values, { setSubmitting }) => {
                        setSubmitting(true); 
                        setSubmittingText("Submitting..."); 
                        onSubmit(values, { setSubmitting }); 
                      }}
                    >
                      {({ isSubmitting }) => (
                        <Form className={styles.form}>
                          <div className={styles.formGroup}>
                            <br />
                            <Field
                              type="tel"
                              name="phoneNumber"
                              placeholder="Your phone number"
                              className={styles.input}
                              onKeyPress={(e) => {
                                // Allow only digits (0-9)
                                const charCode = e.which ? e.which : e.keyCode;
                                if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                                  e.preventDefault();
                                }
                              }}
                              required
                            />
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
                              disabled={isSubmitting} 
                            >
                              {submittingText} 
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </>
                ) : (
                  <Otp phoneNumber={phoneNumber} setActiveStep={setActiveStep}/>
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
