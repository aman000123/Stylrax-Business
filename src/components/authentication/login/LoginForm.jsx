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
const LoginForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOTPSection, setShowOTPSection] = useState(false);

  const onSubmit = async (values) => {
    try {
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
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.bg}>
        <Container>
          <Row className="align-items-center d-flex">
            <Login />
            <Col md={6} className="d-flex justify-content-center">
              <div className={styles.loginBorder}>
                {!showOTPSection ? (
                  <>
                    <h3 className={styles.login}>Login/Register</h3>
                    <Formik
                      initialValues={initialValues}
                      validationSchema={LoginSchema}
                      onSubmit={onSubmit}
                    >
                      <Form className={styles.form}>
                        <div className={styles.formGroup}>
                          <label className="mb-1">Mobile Number</label>
                          <br />
                          <Field
                            type="tel"
                            name="phoneNumber"
                            className={styles.input}
                            required
                          />
                          <ErrorMessage
                            component="div"
                            name="phoneNumber"
                            className={styles.error}
                          />
                        </div>
                        <div>
                          <button type="submit" className={styles.btn}>
                            Submit
                          </button>
                        </div>
                      </Form>
                    </Formik>
                  </>
                ) : (
                  <Otp phoneNumber={phoneNumber} />
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
