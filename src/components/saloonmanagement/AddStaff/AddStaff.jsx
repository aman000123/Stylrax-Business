import { Formik, Form, Field, ErrorMessage } from "formik"; // Import setFieldValue
import { Col } from "react-bootstrap";
import { addStaffSchema } from "../../../utils/schema.js";
import { addStaff } from "../../../api/salon.management.js";
import Notify from "../../../utils/notify.js";
import { RxCross2 } from "react-icons/rx";
import { handleOnFileSelect } from "../../account/FileUploader.jsx";
import Session from "../../../service/session.js";
import InputFile from "../../../ux/controls/Input.jsx";
import styles from "../ManageStaff/ManageStaff.module.css";
import { useState } from "react";
import PhoneInputComponent from "../../authentication/login/PhoneInputComponent.jsx";
const initialValues = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  dob: "",
  email: "",
  gender: "",
  specialization: "",
  profileImageUrl: "",
  aadharFrontUrl: "",
  aadharBackUrl: "",
};

function AddStaff({ onClose, updatedData }) {
  const salonId = Session.get("salonId");
  const [imageUrls, setImageUrls] = useState("");
  console.log("imgUrl", imageUrls);
  const handleClose = () => {
    onClose();
  };

  const handleSubmit = async (values) => {
    console.log(values);
    try {
      const data = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        dataOfBirth: values.dob,
        gender: values.gender,
        profileImageUrl: values.profileImageUrl,
        specialization: values.specialization,
        phoneNumber: values.phoneNumber,
        aadharFrontUrl: values.aadharFrontUrl,
        aadharBackUrl: values.aadharBackUrl,
      };
      const Staff = await addStaff(salonId, data);
      const { profileImageUrl } = Staff.data;
      setImageUrls({ ...imageUrls, profile: profileImageUrl });
      Notify.success("Staff Added");
      updatedData();

      console.log("addStaff::>", Staff);
      onClose();
    } catch (error) {
      Notify.error(error.message);
    }
  };
  const handleKeyPress = (event) => {
    const charCode = event.charCode;
    // Allow only letters (a-z, A-Z)
    if (!/^[a-zA-Z]+$/.test(String.fromCharCode(charCode))) {
      event.preventDefault();
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
          {({ setFieldValue, values }) => (
            <Form className={styles.popupForm}>
              <Field
                type="text"
                placeholder="Enter staff's first name"
                name="firstName"
                inputMode="text"
                onKeyPress={handleKeyPress}
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className={styles.formError}
              />
              <Field
                type="text"
                placeholder="Enter staff's last name"
                name="lastName"
                onKeyPress={handleKeyPress}
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className={styles.formError}
              />
              < div className={styles.phoneBox}>
              <Field
                component={PhoneInputComponent}
                style={{
                  borderRadius: "20px",
                  boxShadow: "none",
                  outlineColor: "none",
                  border:"none",
                }}
                type="text"
                value={values.phoneNumber}
                placeholder="Phone Number"
                name="phoneNumber"
              />
              </div>
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className={styles.formError}
              />

              <Field
                type="date"
                placeholder="Enter staff's date of birth"
                name="dob"
                max={new Date().toISOString().split("T")[0]}
                className={styles.dob}
              />
              <ErrorMessage
                name="dob"
                component="div"
                className={styles.formError}
              />

              <Field
                type="text"
                placeholder="Enter staff's email Id"
                name="email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className={styles.formError}
              />

              <Field as="select" name="gender" className={styles.gender}>
                <option value="">Select staff&apos; gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Field>
              <ErrorMessage
                name="gender"
                component="div"
                className={styles.formError}
              />

              <Field
                type="text"
                placeholder="Enter specialization"
                name="specialization"
                onKeyPress={handleKeyPress}
              />
              <ErrorMessage
                name="specialization"
                component="div"
                className={styles.formError}
              />
              <div className={styles.staffImage}>
                <label className={styles.profile_Image}>Profile Image</label>
                <InputFile
                  name="profileImageUrl"
                  onFileSelect={(e) =>
                    handleOnFileSelect(e, "profileImageUrl", setFieldValue)
                  }
                />
                <ErrorMessage
                  name="profileImageUrl"
                  component="div"
                  className={styles.formError_Profile}
                />
              </div>
              <div className={styles.staffImage}>
                <label>
                  Adhar Front Image
                  <InputFile
                    name="aadharFrontUrl"
                    onFileSelect={(e) =>
                      handleOnFileSelect(e, "aadharFrontUrl", setFieldValue)
                    }
                  />
                  <ErrorMessage
                    name="aadharFrontUrl"
                    component="div"
                    className={styles.adharError}
                  />
                </label>
              </div>
              <div className={styles.staffImage}>
                <label>
                  Adhar Back Image
                  <InputFile
                    name="aadharBackUrl"
                    onFileSelect={(e) =>
                      handleOnFileSelect(e, "aadharBackUrl", setFieldValue)
                    }
                  />
                  <ErrorMessage
                    name="aadharBackUrl"
                    component="div"
                    className={styles.adharError}
                  />
                </label>
              </div>
              <div className={styles.popupFormButton}>
                <button className={styles.buttonOne} type="submit">
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Col>
  );
}

export default AddStaff;
