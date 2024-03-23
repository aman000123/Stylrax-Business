import client3 from "../../../assets/image/client3.svg";
import { Container } from "react-bootstrap";
import { IoCheckbox } from "react-icons/io5";
import { GrFormUpload } from "react-icons/gr";
import { detailsSchema } from "../../../utils/schema";
import styles from "./Details.module.css";
import PropTypes from 'prop-types';
import { createSalon } from "../../../api/account.api";
import Notify from "../../../utils/notify";
import { ErrorMessage, Field, Form, Formik } from "formik";

const initialValues = {
  name: "",
  middleName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  dob: "",
};
// name
const Details = ({ setShowServicePage }) => {
  const onSubmit = async (values) => {
    try {
      const verifyForm = {
        profileType: "Salon",
        firstName: values.name,
        middleName: values.middleName,
        lastName: values.lastName,
        email: values.email,
        dataOfBirth: values.dob,
        gender: "Male",
        panCardImageUrl: "someurl",
        aadharFrontUrl: "someurl",
        aadharBackUrl: "someurl"
      };
      const res = await createSalon(verifyForm);
      setShowServicePage(true);
      console.log("response:::>",res.data.data)
    } catch (error) {
      Notify.error(error.message);
    }
  };

  return (
    <Container>
      <div className="d-flex flex-column align-items-center">
        <div
          className={styles.main}
        >
          <div className="d-flex flex-column align-items-center mb-1">
            <img src={client3} className={styles.client} alt="client" />
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={detailsSchema}
            onSubmit={onSubmit}
          >
            <Form className="d-flex flex-column align-items-center">
              <div className="d-flex flex-column align-items-center-start mb-1">
                <label className="fw-bold">
                  Name
                  <br />
                  <Field
                    name="name"
                    placeholder="Jhon"
                    className={styles.input}
                  />
                  <ErrorMessage
                    name="name"
                    className={styles.error}
                    component="div"
                  />
                </label>
              </div>
              <div className="d-flex flex-column align-items-center-start mb-1">
                <label className="fw-bold">
                  Middle Name
                  <br />
                  <Field
                    name="lastName"
                    placeholder="Jhon"
                    className={styles.input}
                  />
                  <ErrorMessage
                    name="lastName"
                    className={styles.error}
                    component="div"
                  />
                </label>
              </div>
             
              <div className="d-flex flex-column align-items-center-start mb-1">
                <label className="fw-bold">
                  Last Name
                  <br />
                  <Field
                    name="middleName"
                    placeholder="Abrahim"
                    className={styles.input}
                  />
                  <ErrorMessage
                    name="middleName"
                    className={styles.error}
                    component="div"
                  />
                </label>
              </div>
              <div className="d-flex flex-column align-items-center-start mb-1">
                <label className="fw-bold">
                  Email
                  <br />
                  <Field
                    name="email"
                    placeholder="Samplemail.com"
                    className={styles.input}
                  />
                   <IoCheckbox className={styles.calendar} />
                  <ErrorMessage
                    name="email"
                    className={styles.error}
                    component="div"
                  />
                </label>
              </div>
              <div className="d-flex flex-column align-items-center-start mb-1">
                <label className="fw-bold">
                  Date of Birth
                  <br />
                  <Field
                    type="date"
                    name="dob"
                    placeholder="Jhon"
                    className={styles.input}
                  />
                  <ErrorMessage
                    name="dob"
                    className={styles.error}
                    component="div"
                  />
                </label>
              </div>
              <div className="d-flex flex-column align-items-center-start mb-1">
                <label className="fw-bold">
                
                  Contact Number
                  <br />
                  <Field
                    name="phoneNumber"
                    placeholder="8318893508"
                    className={styles.number}
                  />
                  <ErrorMessage
                  component="div"
                    name="phoneNumber"
                    className={styles.error}
                  />
                </label>
              </div>
              <div className="d-flex flex-column align-items-center-start mb-1">
                <label className="fw-bold">
                  Gender
                  <br />
                   <Field
                   as="select"
                    name="gender"
                    placeholder="Jhon"
                    className={styles.input}
                  >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  </Field> 
                
                  <ErrorMessage
                    name="name"
                    className={styles.error}
                    component="div"
                  />
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
                        // ref={fileInputRef}
                        style={{ display: "none" }}
                        //onChange={handleChange}
                      />
                      <br />
                      <button
                        className={`${styles.btn} align-items-center-start`}
                        //onClick={handleUploaded}
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
                    //  ref={fileInputRef}
                      style={{ display: "none" }}
                     // onChange={handleChange}
                    />
                    <br />
                    <button
                      className={`${styles.btn} align-items-center-start`}
                     // onClick={handleUploaded}
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
                   // ref={fileInputRef}
                    style={{ display: "none" }}
                   // onChange={handleChange}
                  />
                  <button className={styles.panBtn}>
                    <GrFormUpload className={styles.uploadIcon} />
                    Upload
                  </button>
                </p>
              </label>
            </div>
              {/* Other form fields */}
              <div className="d-flex flex-column align-items-center">
                <button type="submit" className={styles.continue}>
                  Continue
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </Container>
  );
};

Details.propTypes = {
  setShowServicePage: PropTypes.func.isRequired,
};

export default Details;
