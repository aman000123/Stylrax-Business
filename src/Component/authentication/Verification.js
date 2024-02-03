import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Dlogo from "../../assets/image/DLogo.png";
import OtpInput from "react-otp-input";
function Verification() {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const handleOtpChange = (otpValue) => {
    setOtp(otpValue);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  console.log("Rendering with OTP:", otp);

  const renderInput = (props, index) => (
    <input
      {...props}
      key={index}
      autoFocus={index === 0}
      className="input-otp"
      pattern="[0-9]*"
      onKeyDown={(e) => {
        // Allow only numeric keys
        if (!/^\d$/.test(e.key)) {
          e.preventDefault();
        }
      }}
    />
  );

  return (
    <>
      <Container className="p-0">
        <Row className=" m-0 p-0">
          <Col sm={8} className="p-0 mt-4">
            <img
              className="d-logo"
              src={Dlogo}
              type="d-logo.png"
              alt="stylrax-logo"
            />
          </Col>
          <Col
            sm={4}
            className="p-0 d-flex justify-content-center align-items-center mt-4"
          >
            <h6 className="sign-account back-sign">
              <Link to="/login" className="link-style">
                Back to Sign In
              </Link>
            </h6>
          </Col>
          <Col className="p-0 mt-4">
            <h2 className="for-password">Verification</h2>
          </Col>
        </Row>
      </Container>
      <div className="main-form d-flex justify-content-center align-items-center">
        <form className="form  w-100">
          <label className="otp-input mt-3 m-auto">
            Enter the 4 digit code that is send on your <br />
            registered email address.
            <br />
          </label>
          <div className="otp-box d-flex justify-content-center  my-3">
            <OtpInput
              value={otp}
              onChange={handleOtpChange}
              numInputs={4}
              separator={<span>-</span>}
              isInputNum
              shouldAutoFocus
              renderInput={renderInput}
            />
          </div>
          <h6 className="v-timer text-center mt-2 text-danger">00:{timer}</h6>
          <div className="d-flex justify-content-center">
            <button className="forget_btn " type="button">
              <Link className="continue-link link-style" to="/new-password">
                VERIFY
              </Link>
            </button>
          </div>
          <h5 className="resend-text mt-3">If you didn’t receive a code!</h5>
          <h6 className="resend-otp text-center">Resend</h6>
        </form>
      </div>
    </>
  );
}

export default Verification;
