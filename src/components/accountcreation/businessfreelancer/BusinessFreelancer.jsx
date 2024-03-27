import { useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { IoCheckbox } from "react-icons/io5";
import { GrFormUpload } from "react-icons/gr";
import { useFormik } from "formik";
import { detailsSchema } from "../../../utils/schema";
import styles from "../accountcreation/Details.module.css";
import PropTypes from 'prop-types';
//import Notify from "../../../utils/notify";
//import { createSalon } from "../../../api/account.api";

const initialValues = {
  name: "",
  middleName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  dob: "",
};
const BusinessFreelancer = ({ nextStep }) => {
  BusinessFreelancer.propTypes = {
    nextStep: PropTypes.func.isRequired,
  };
  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: detailsSchema,
    validateOnChange: true,
    validateOnBlur: false,

    onSubmit:  (values) => {
        console.log(values)
        nextStep();
      },
    });
  const [selectedOption, setSelectedOption] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  //const [isSubmitting, setIsSubmitting] = useState(false);

  
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

//   const formSubmit = async (event) => {
//     event.preventDefault();
//     console.log("data");
//     if (isValid) {
//       try {
//         setIsSubmitting(true);
//         const verifyForm = {
//           profileType: "Salon",
//           firstName: values.name,
//           middleName: values.middleName,
//           lastName: values.lastName,
//           email: values.email,
//           dataOfBirth: values.dob,
//           gender: "Male",
//           panCardImageUrl: "someurl",
//           aadharFrontUrl: "someurl",
//           aadharBackUrl: "someurl",
//           // profileImageUrl:"someUrl",
//         };
//         const res = await createSalon(verifyForm);
//         if (res.data.statusCode == "200") {
//           navigate("/salon-dashboard");
//         }
//       } catch (error) {
//         Notify.error(error.message);
//       } finally {
//         setIsSubmitting(false);
//       }
//     }
//   };
 
  return (
    <Container>
      <div className="d-flex flex-column align-items-center">
        <div
          className={styles.main}
         // eslint-disable-next-line react/no-unknown-property
         activeStep={activeStep}
          // eslint-disable-next-line react/no-unknown-property
          handleNext={handleNext}
        >
          <form
            className="d-flex flex-column align-items-center"
            onSubmit={handleSubmit}
          >
            <div className="d-flex flex-column align-items-center-start mb-1">
              <label className="fw-bold">
                Name
                <br />
                <input
                  type="text"
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
                  {errors.lastName && touched.lastName ? (
              <p className={styles.error}>{errors.lastName}</p>
            ) : null}
              </label>
            </div>
          
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
              <label className="fw-bold">
                Services For
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
                    Unisex
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
              <button type="submit" className={styles.continue} onClick={nextStep}>
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default BusinessFreelancer;
