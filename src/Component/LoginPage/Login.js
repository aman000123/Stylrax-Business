import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import styles from "../../assets/scss/pages/home/login.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { doLogin } from "../../api/account.api";
import { storeToken } from "../../features/authInfo";
import Notify from "../../utils/notify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { LoginSchema } from "../../utils/schema";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      const response = await doLogin(values);
      const { authToken, userInfo } = response.data;
      dispatch(storeToken({ token: authToken, userInfo }));
      // Redirect to the home page after successful login
      navigate("/");
    } catch (error) {
      Notify.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.bg}>
        <Container>
          <Row className="align-items-center d-flex">
            <Col md={6} className="d-flex justify-content-center">
              <div className={styles.info}>
                <h3 className={styles.text}>Lorem Ipsum</h3>
                <h4 className={styles.textOne}>
                  Increase your earnings,
                  <br /> gain respect, and rest
                  <br /> assured of your safety.
                </h4>
                <p className={styles.pra}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing <br />
                  elit, sed do eiusmod tempor incididunt ut labore <br />
                  Lorem ipsum dolor sit amet.{" "}
                </p>
              </div>
            </Col>
            <Col md={6} className="d-flex justify-content-center">
              <div className={styles.loginBorder}>
                <Formik
                  initialValues={{ phoneNumber: "" }}
                  validationSchema={LoginSchema}
                  onSubmit={onSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form className={styles.form}>
                      <h3 className={styles.login}>Login/Register</h3>
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
                          name="phoneNumber"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={styles.btn}
                        >
                          {isSubmitting ? "Submitting..." : "Submit"}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </main>
  );
};

export default Login;