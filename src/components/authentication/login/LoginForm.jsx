import Login from "../../home/loginpage/Login";
import styles from "../../home/loginpage/Login.module.css";
import  {useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Otp from "../../authentication/otp/Otp";
import { doLogin } from "../../../api/account.api";
import Notify from "../../../utils/notify";

const LoginForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [mobileNumberError, setMobileNumberError] = useState("");
  const [showOTPSection, setShowOTPSection] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateMobileNumber(phoneNumber)) {
      try {
        setIsSubmitting(true);
        const data = {
          countryCode: "91",
          deviceType: 1,
          phoneNumber: phoneNumber,
          deviceToken: "staff3deviceid",
        };
        const res = await doLogin(data);
        setShowOTPSection(true);
      } catch (error) {
        Notify.error(error.message);
      } 
    } 
  };

  const handleMobileNumberChange = (event) => {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/\D/g, "");
    setPhoneNumber(numericValue);
    setMobileNumberError("");
  };

  const validateMobileNumber = (number) => {
    return /^\d{10}$/.test(number);
  };

  return (
    <main className={styles.main}>
      <div className={styles.bg}>
        <Container>
          <Row className="align-items-center d-flex">
            <Login/>
            <Col md={6} className="d-flex justify-content-center">
              <div className={styles.loginBorder}>
                {!showOTPSection ? (
                  <>
                    <h3 className={styles.login}>Login/Register</h3>
                    <form className={styles.form} onSubmit={handleSubmit}>
                      <div className={styles.formGroup}>
                        <label className="mb-1">Mobile Number</label>
                        <br />
                        <input
                          type="tel"
                          name="phoneNumber"
                          className={styles.input}
                          value={phoneNumber}
                          onChange={handleMobileNumberChange}
                          required
                        />
                        {mobileNumberError && (
                          <div className="text-danger">{mobileNumberError}</div>
                        )}
                      </div>
                      <div>
                        <button
                          type="submit"
                          disabled={!phoneNumber || isSubmitting}
                          className={styles.btn}
                        >
                          {isSubmitting ? "Submitting..." : "Submit"}
                        </button>
                      </div>
                    </form>
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

