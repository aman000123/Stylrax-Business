import { useState, useEffect } from "react";
import { Form, Formik, Field } from "formik";
import { getProfile } from "../../../api/user.api.js";
import Notify from "../../../utils/notify.js";
import styles from "../SalonOwnerDetails/SalonOwnerDetails.module.css";

function SalonOwnerDetails({ onClose }) {
  const [details, setDetails] = useState({});
  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const res = await getProfile();
        const details = res.data;
        setDetails(details);
      } catch (error) {
        Notify.error(error.message);
      }
    };
    fetchUserDetail();
  }, []);

  return (
    <div className={`${styles.mainDiv} ${styles.addSalon}`}>
      <div>
        <img
          src={details.profileImageUrl}
          className={styles.imgDiv}
          alt="Profile"
        />
      </div>
      <Formik>
        <Form>
          <label className={styles.lab}>First Name</label>
          <br />
          <Field
            type="text"
            placeholder={details.firstName}
            name="firstName"
            className={styles.inputs}
            disabled
          />
          <br />
          <label className={styles.lab}>Middle Name</label>
          <br />
          <Field
            type="text"
            placeholder={details.middleName}
            name="middleName"
            className={styles.inputs}
            disabled
          />
          <br />
          <label className={styles.lab}>Last Name</label>
          <br />
          <Field
            type="text"
            placeholder={details.lastName}
            name="lastName"
            className={styles.inputs}
            disabled
          />
          <br />
          <label className={styles.lab}>Email ID</label>
          <br />
          <Field
            type="email"
            placeholder={details.email}
            name="email"
            className={styles.inputs}
            disabled
          />
          <br />
          <label className={styles.lab}>Date of Birth</label>
          <br />
          <Field
            type="text"
            placeholder={details.dataOfBirth}
            name="dataOfBirth"
            className={styles.inputs}
            disabled
          />
          <br />
          <label className={styles.lab}>Gender</label>
          <br />
          <Field
            type="text"
            name="gender"
            placeholder={details.gender}
            className={styles.inputs}
            disabled
          />
          <br />
          <label className={styles.lab}>Aadhar Card</label>
          <br />
          <div className="d-flex gap-4">
            <div className={styles.aadhar}>
              <label className={styles.front}>
                <span>Aadhar Front</span>
                <div>
                  <img
                    src={details.aadharFrontUrl}
                    className={styles.documents}
                    alt="Aadhar Front"
                  />
                </div>
              </label>
            </div>
            <div className={styles.aadhar}>
              <label className={styles.front}>
                <span>Aadhar Back</span>
                <div>
                  <img
                    src={details.aadharBackUrl}
                    className={styles.documents}
                    alt="Aadhar Back"
                  />
                </div>
              </label>
            </div>
          </div>
          <label className={styles.lab}>Pan Card</label>
          <div>
            <img
              src={details.panCardImageUrl}
              className={styles.documents}
              alt="Pan Card"
            />
          </div>
          <br />
        </Form>
      </Formik>
    </div>
  );
}

export default SalonOwnerDetails;
