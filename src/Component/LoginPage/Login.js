import React, { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import styles from "../../assets/scss/pages/home/login.module.css";
import Otp from "../otp/otp";

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [mobileNumberError, setMobileNumberError] = useState("");
  const [showOTPSection, setShowOTPSection] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateMobileNumber(mobileNumber)) {
      try {
        const response = await fetch("https://devapi.stylrax.com/b2b/account/otp/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            countryCode: "91",
            deviceType: 1,
            phoneNumber: mobileNumber.replace(/\s/g, ""),
            deviceToken: "staff3deviceid",
          }),
        });
        const data = await response.json(); 
        if (response.ok) {
       
          setShowOTPSection(true);
          console.log("Response Data:", data); 
        } else {
        
          console.error("Failed to send OTP:", data);
        }
      } catch (error) {
        console.error("Failed to send OTP:", error); 
      }
    } else {
      setMobileNumberError("Please enter a valid mobile number.");
    }
  };

  const handleMobileNumberChange = (event) => {
    const inputValue = event.target.value;
    // Remove any non-digit characters
    const numericValue = inputValue.replace(/\D/g, "");
    let formattedMobileNumber = "";
    for (let i = 0; i < numericValue.length; i++) {
      formattedMobileNumber += numericValue[i];
      if ((i + 1) % 3 === 0 && i + 1 < numericValue.length - 3) {
        formattedMobileNumber += " ";
      }
    }
    formattedMobileNumber = "   " + formattedMobileNumber.trim();
    setMobileNumber(formattedMobileNumber);
    setMobileNumberError("");
  };

  const validateMobileNumber = (number) => {
    // Remove spaces from the number
    const numericValue = number.replace(/\s/g, "");

    // Check if the numericValue consists only of digits and if it's exactly 10 digits long
    return /^\d+$/.test(numericValue) && numericValue.length === 10;
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
                {!showOTPSection ? (
                  <>
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
                          <div className="text-danger">
                            {mobileNumberError}
                          </div>
                        )}
                      </div>
                      <div>
                        <button type="submit" className={styles.btn}>
                          Submit
                        </button>
                      </div>
                    </form>
                  </>
                ) : (
                  <Otp mobileNumber={mobileNumber} />
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </main>
  );
};

export default Login;
