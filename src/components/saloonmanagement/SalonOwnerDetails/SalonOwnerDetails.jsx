import styles from "../SalonOwnerDetails/SalonOwnerDetails.module.css";
import salonownerdetailimg from "../../../assets/image/salonownerdetailimg.png";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { salonProfileSchema } from "../../../utils/schema.js";
import { createProfile, getProfile } from "../../../api/user.api.js";
//import { handleOnFileSelect } from "./FileUploader";
import { GrFormUpload } from "react-icons/gr";
import { useEffect } from "react";
import Notify from '../../../utils/notify.js'
const initialValues = {
  firstName: "",
  middleName: "",
  lastName: "",
  email: "",
  dob: "",
  gender: "",
};

function SalonOwnerDetails() {
  // const handleSubmit = async (values) => {
  //   try {
  //     const data = {
  //       profileType: "Salon",
  //       firstName: values.firstName,
  //       middleName: values.middleName,
  //       lastName: values.lastName,
  //       email: values.email,
  //       dataOfBirth: values.dob,
  //       gender: values.gender,
  //       panCardImageUrl: "someurl",
  //       aadharFrontUrl: "someurl",
  //       aadharBackUrl: "someurl",
  //       profileImageUrl: "someUrl",
  //       serviceType: "Male",
  //     };
  //     const response = await createProfile(data);
  //     console.log("resssssss----->",response);
  //     console.log("Form submitted successfully");
  //     //action.resetForm();
  //   } catch (error) {
  //     console.error("There was an error submitting the form:", error);
  //   }
  // };

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const user = await getProfile()
        console.log("user", user);
      } catch (error) {
        // console.log("Error:::>",error);
        Notify.error(error.message);
      }
    }
    fetchUserDetail();
  }, [])
  return (
    <div className={styles.mainDiv}>
      <div className={styles.imgDiv}>
        <div>
          <img src={salonownerdetailimg} alt=""></img>
        </div>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={salonProfileSchema}
        // onSubmit={handleSubmit}
      >
        <Form>
          <label className={styles.lab}> First Name</label>
          <br />
          <Field
            type="text"
            placeholder="Jhon"
            name="firstName"
            className={styles.inputs}
          />
          <br />

          <ErrorMessage
            name="firstName"
            className={styles.formError}
            component="div"
          />

          <label className={styles.lab}> Middle Name</label>
          <br />
          <Field
            type="text"
            placeholder="Jhon"
            name="middleName"
            className={styles.inputs}
          />
          <br />

          <ErrorMessage
            name="middleName"
            className={styles.formError}
            component="div"
          />

          <label className={styles.lab}> Last Name</label>
          <br />
          <Field
            type="text"
            placeholder="Jhon"
            name="lastName"
            className={styles.inputs}
          />
          <br />

          <ErrorMessage
            name="lastName"
            className={styles.formError}
            component="div"
          />

          <label className={styles.lab}> Email ID</label>
          <br />
          <Field
            type="email"
            placeholder="Jhon"
            name="email"
            className={styles.email}
          />
          <br />

          <ErrorMessage
            name="email"
            className={styles.formError}
            component="div"
          />

          <label className={styles.lab}> Date of Birth</label>
          <br />
          <Field
            type="date"
            placeholder="Jhon"
            name="dob"
            className={styles.dob}
          />
          <br />

          <ErrorMessage
            name="dob"
            className={styles.formError}
            component="div"
          />

          <label className={styles.lab}>
            Gender
            <br />
            <Field
              as="select"
              name="gender"
              // placeholder="select"
              className={styles.inputs}
            >
              <option value="">select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Field>
            <br />
            <ErrorMessage
              name="gender"
              className={styles.formError}
              component="div"
            />
          </label>
          <br />

          <label className={styles.lab}> Aadhar Card</label>
          <br />
          <div className={styles.aadhar}>
            <label className={styles.front}>
              <span>Aadhar Front</span>
              <br />
              <button
                className={`${styles.Btn} align-items-center-start`}
                // onClick={handleUploadIconClick}
                type="button"
              >
                <input
                  id="image"
                  type="file"
                  name="aadhar-front"
                  //  ref={fileInputRef}
                  style={{ display: "none" }}
                // onChange={handleFileChange}
                />
                <br />
                <GrFormUpload className={styles.uploadIcon} />
                Upload
              </button>
            </label>
            <br />

            <label className={styles.back}>
              Aadhar Back
              <br />
              <button
                className={`${styles.Btn} align-items-center-start`}
                //   onClick={handleUploadIconClick}
                type="button"
              >
                <input
                  type="file"
                  name="aadhar-back"
                  //ref={fileInputRef}
                  style={{ display: "none" }}
                // onChange={handleFileChange}
                />
                <br />
                <GrFormUpload className={styles.uploadIcon} />
                Upload
              </button>
            </label>
          </div>

          <label className={styles.lab}>
            Pan Card
            <button
              className={`${styles.Btn} align-items-center-start`}
              //  onClick={handleUploadIconClick}
              type="button"
            >
              <input
                type="file"
                name="image"
                // ref={fileInputRef}
                style={{ display: "none" }}
              // onChange={handleFileChange}
              />
              <br />
              <GrFormUpload className={styles.uploadIcon} />
              Upload
            </button>
          </label>
          <br />

          <button type="submit" className={styles.btn}>
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default SalonOwnerDetails;
