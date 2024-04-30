import styles from "../ManageStaff/ManageStaff.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Col } from "react-bootstrap";
import { addStaffSchema } from "../../../utils/schema.js";
import { addStaff } from "../../../api/salon.management.js";
import Notify from "../../../utils/notify.js";
import { RxCross2 } from "react-icons/rx";
import { handleOnFileSelect } from "../../account/FileUploader.jsx";

import Session from "../../../service/session.js";

const initialValues = {
  name: "",
  mobileNumber: "",
  dob: "",
  email: "",
  gender: "",
  category: "",
  profileImageUrl: "",
};

function AddStaff({ onClose }) {
  const salonId = Session.get("salonId");

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = async (values) => {
    try {
      const data = {
        firstName: values.name,
        lastName: "Prasad",
        email: values.email,
        dataOfBirth: values.dob,
        gender: values.gender,
        profileImageUrl: values.profileImageUrl,
        specialization: "All Rounder",
        phoneNumber: values.mobileNumber,
        aadharFrontUrl: "aadharFrontUrl",
        aadharBackUrl: "aadharBackUrl",
      };
      const Staff = await addStaff(salonId, data);
      console.log("addStaff::>", Staff);
      onClose();
    } catch (error) {
      Notify.error(error.message);
    }
  };

  return (
    <Col md={4}>
      <div className={styles.popupFormDiv}>
        <div className={styles.popupFormImgDiv}>
          <span>Staff</span>
          <div onClick={handleClose} className={styles.crossIcon}>
            <RxCross2 />
          </div>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={addStaffSchema}
          onSubmit={handleSubmit}
        >
          <Form className={styles.popupForm}>
            <Field type="text" placeholder="Name" name="name" />
            <ErrorMessage
              name="name"
              component="div"
              className={styles.formError}
            />

            <Field
              type="text"
              placeholder="Mobile Number"
              name="mobileNumber"
            />
            <ErrorMessage
              name="mobileNumber"
              component="div"
              className={styles.formError}
            />

            <Field type="text" placeholder="Date of Birth" name="dob" />
            <ErrorMessage
              name="dob"
              component="div"
              className={styles.formError}
            />

            <Field type="text" placeholder="Email Id" name="email" />
            <ErrorMessage
              name="email"
              component="div"
              className={styles.formError}
            />

            <Field type="text" placeholder="Gender" name="gender" />
            <ErrorMessage
              name="gender"
              component="div"
              className={styles.formError}
            />

            <Field type="text" placeholder="Category" name="category" />
            <ErrorMessage
              name="category"
              component="div"
              className={styles.formError}
            />

            <div className={styles.popupFormButton}>
              <button className={styles.buttonOne} type="submit">
                Submit
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </Col>
  );
}

export default AddStaff;
