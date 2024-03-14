import React, { useRef, useState } from "react";
import client3 from "../../../assets/image/client3.svg";
import { Container } from "react-bootstrap";
import { IoCheckbox } from "react-icons/io5";
import { GrFormUpload } from "react-icons/gr";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { detailsSchema } from "../../../utils/schema";
import styles from "./Details.module.css";

const initialValues = {
  name: "",
  middleName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  dob: "",
};
const Details = ({ nextStep, prevStep, setShowServicePage }) => {
 
  const { values, errors, handleBlur,handleChange, handleSubmit,isValid, touched } = useFormik({
    initialValues: initialValues,
    validationSchema: detailsSchema,
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: (values) => {
      console.log(values);
      setShowServicePage(true)
    },
  });
  const [selectedOption, setSelectedOption] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleUploaded = () => {
    fileInputRef.current.click();
  };
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  

  const handleChangeFile = (type) => {
    fileInputRef.current.click();
    fileInputRef.current.onchange = (event) => {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        if (type === "adhar") {
          setSelectedFile(selectedFile);
        } else if (type === "pan") {
          setSelectedFile(selectedFile);
        }
      } else {
        alert("Please select a file to upload");
      }
    };
  };

  

  // const handleClick = () => {
  //   if(isValid){
  //   nextStep()
  //   } else {
  //     alert("Please fill all required fields."); 
  //   }

  // };
  return (
    <Container>
      <div className="d-flex flex-column align-items-center">
        <div
          className={styles.main}
          activeStep={activeStep}
          handleNext={handleNext}
          
        >
          <div className="d-flex flex-column align-items-center mb-1">
            <img src={client3} className={styles.client} alt="client" />
          </div>
          <form
            className="d-flex flex-column align-items-center"
            onSubmit={handleSubmit}
          >
            <div className="d-flex flex-column align-items-center-start mb-1">
              <label className="fw-bold">
                Name
                <br />
                <input type="text"
                  id="name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Jhon"
                  className={styles.input}
                />
                {errors.name && touched.name ? (
                  <p className={styles.error}>{errors.name}</p>
                ) : null}
              </label>
            </div>
            <div className="d-flex flex-column align-items-center-start mb-1">
              <label className="fw-bold">
                Middle Name
                <br />
                <input
                  id="middle"
                  name="middleName"
                  value={values.middleName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Abrahim"
                  className={styles.input}
                />
                {errors.middleName && touched.middleName ? (
                  <p className={styles.error}>{errors.middleName}</p>
                ) : null}
              </label>
            </div>
            <div className="d-flex flex-column align-items-center-start mb-1">
              <label className="fw-bold">
                Last Name
                <br />
                <input
                  id="lastName"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Optional"
                  className={styles.input}
                />
              </label>
            </div>
            {errors.lastName && touched.lastName ? (
                  <p className={styles.error}>{errors.lastName}</p>
                ) : null}
            <div className="d-flex flex-column align-items-center-start mb-1">
              <label className="fw-bold">
                Email
                <br />
                <input
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Sampleemail.com"
                  className={styles.input}
                />
                <IoCheckbox className={styles.calendar} />
                {errors.email && touched.email ? (
                  <p className={styles.error}>{errors.email}</p>
                ) : null}
              </label>
            </div>
            <div className="d-flex flex-column align-items-center-start mb-1">
              <label className="fw-bold">
                Date of Birth
                <br />
                <input
                 
                  type="date"
                  name="dob"
                  value={values.dob}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={styles.birthday}
                  
                />
                {errors.dob && touched.dob ? (
                  <p className={styles.error}>{errors.dob}</p>
                ) : null}
              </label>
            </div>
            <div className="d-flex flex-column align-items-center-start mb-1">
              <label className="fw-bold">
                Contact Number
                <br />
                <input
                  name="phoneNumber"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={styles.number}
                />
                {errors.phoneNumber && touched.phoneNumber ? (
                  <p className={styles.error}>{errors.phoneNumber}</p>
                ) : null}
              </label>
            </div>
            <div className="d-flex flex-column align-items-center-start mb-1">
              <label className="fw-bold">
                Gender
                <br />
                <select
                  id="dropdown"
                  value={selectedOption}
                  onChange={handleOptionChange}
                  className={styles.dropDown}
                >
                  <option
                    value="option1"
                    className="d-flex flex-column align-items-center-start"
                  >
                    Male
                  </option>
                  <option value="option2">Female</option>
                  <option value="option3">Others</option>
                </select>
              </label>
            </div>
            <div className="d-flex flex-column align-items-center-start mb-1">
              <label className="fw-bold ">
                Adhar Card Image
                <br />
                <div className="d-flex">
                  <label className={styles.front}>
                    Front
                    <br />
                    <div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleChange}
                      />
                      <br />
                      <button
                        className={`${styles.btn} align-items-center-start`}
                        onClick={handleUploaded}
                      >
                        <GrFormUpload className={styles.uploadIcon} />
                        Upload
                      </button>
                    </div>
                  </label>

                  <label className={styles.back}>
                    Back
                    <br />
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleChange}
                    />
                    <br />
                    <button
                      className={`${styles.btn} align-items-center-start`}
                      onClick={handleUploaded}
                    >
                      <GrFormUpload className={styles.uploadIcon} />
                      Upload
                    </button>
                  </label>
                </div>
              </label>
            </div>

            <div className="d-flex flex-column align-items-center-start mb-1">
              <label className="fw-bold">
                Pan Card
                <br />
                <p className={styles.panCard}>
                  lorem ipsum
                  <br />
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleChange}
                  />
                  <button className={styles.panBtn} onClick={handleUploaded}>
                    <GrFormUpload className={styles.uploadIcon} />
                    Upload
                  </button>
                </p>
              </label>
            </div>

            <div className="d-flex flex-column align-items-center">
              <button
                type="submit"
                className={styles.continue}
                >
                Continue
              </button>
             
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default Details;
