import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Dlogo from "../../assets/image/DLogo.png";
import vector from "../../assets/image/Vector.png";

function ChangedPassword() {
  return (
    <>
      <Container className="p-0 ">
        <Row className="m-0 p-0 ">
          <Col sm={8} className="p-0 mt-4 ">
            <img className="d-logo" src={Dlogo} alt="stylrax-logo" />
          </Col>
          <Col
            sm={4}
            className="p-0 d-flex justify-content-center align-items-center mt-4"
          >
            <h6 className="sign-account back-sign">
              <Link to="/login" className="link-style ">
                Back to Sign In
              </Link>
            </h6>
          </Col>
          <Col className="p-0  mt-4">
            <h2 className="for-password">Successful</h2>
          </Col>
        </Row>
      </Container>
      <h6 className="para">
        Your New Password is Successfully Changed.
      </h6>
      <div className="main-form  d-flex justify-content-center align-items-center">
        <form className="form w-100">
          <div className="changed-circle">
            <img className="vector-img" src={vector} type="vector.png" alt="stylrax-logo" />
          </div>
          <div className="mt-4 mb-3 d-flex justify-content-center">
            <button className="forget_btn" type="button">
              <Link
                className="continue-link link-style continue-btn"
                to="/login"
              >
                CONTINUE
              </Link>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ChangedPassword;
