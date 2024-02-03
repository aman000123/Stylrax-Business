import React from "react";
import Dlogo from "../../assets/image/DLogo.png";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

function NewPassword() {
    
    const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
      .required("Please enter your password")
      .min(8, "Password must be 8 characters long")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires an uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Please confirm your password"),
  });

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, isValid, dirty } = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log("Values ::>", values);
      resetForm();
      navigate("/changed-password");
    },
  });

  return (
    <>
      <Container className="p-0 ">
        <Row className="m-0 p-0 ">
          <Col sm={8} className="p-0 mt-4 ">
            <img className="d-logo" src={Dlogo} alt="d-logo.png" />
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
            <h2 className="for-password ">New Password</h2>
          </Col>
        </Row>
      </Container>
      <h3 className="new-password-para">
        Set up the New Password for your Account.
      </h3>
      <div className="main-form  d-flex justify-content-center align-items-center">
        <form className="form w-100" onSubmit={handleSubmit}>
          <label className="text mt-3">
            Enter new password
          </label>
            <br />
          <input
              className={`password-input ${errors.newPassword && touched.newPassword ? "is-invalid" : ""}`}
              type="password"
              name="newPassword"
              id="newPassword"
              placeholder="8 symbols at least"
              value={values.newPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.newPassword && touched.newPassword && (
              <div className="invalid-feedback">{errors.newPassword}</div>
            )}
          <br />
          <label className="text">
            Confirm password
          </label>
            <br />
          <input
              className={`password-input ${errors.confirmPassword && touched.confirmPassword ? "is-invalid" : ""}`}
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="8 symbols at least"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <div className="invalid-feedback">{errors.confirmPassword}</div>
            )}
          <div className="mt-4 mb-3 d-flex justify-content-center">
            <button className={`forget_btn ${!(isValid && dirty) ? "disable" : ""}`} type="submit" disabled={!isValid || !dirty}>
                UPDATE PASSWORD
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default NewPassword;
