import React, { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import styles from "../../assets/scss/pages/home/Banner.module.css";
const Banner = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [mobileNumberError, setMobileNumberError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateMobileNumber(mobileNumber)) {
      console.log("Mobile Number:", mobileNumber);
      setMobileNumber("");
    } else {
      setMobileNumberError("Please enter a valid mobile number.");
    }
  };

  const handleMobileNumberChange = (event) => {
    const inputValue = event.target.value;
    // Remove any non-digit characters
    const numericValue = inputValue.replace(/\D/g, "");
    setMobileNumber(numericValue);
    setMobileNumberError("");
  };
  const validateMobileNumber = (number) => {
    // Check if the number is exactly 10 digits long
    return number.length === 10 && /^\d+$/.test(number);
  };
  return (
    <main className={styles.main}>
      <div className={styles.bg}>
        <Container>
          <Row className="align-items-center d-flex">
            <Col md={6} className="d-flex justify-content-center">
              <div className={styles.info}>
                <h3 className={styles.text}>Lorem lpsum</h3>
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
                <h3 className={styles.login}>Login/Register</h3>
                <form className={styles.form} onSubmit={handleSubmit}>
                  <div className={styles.formGroup}>
                    <label className="mb-1">Mobile Number</label>
                    <br />
                    <input
                      type="text"
                      className={styles.input}
                      value={mobileNumber}
                      onChange={handleMobileNumberChange}
                    />
                    {mobileNumberError && (
                      <div className="text-danger">{mobileNumberError}</div>
                    )}
                  </div>
                  <div>
                    <button type="submit" className={styles.btn}>
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </main>
  );
};

export default Banner;
