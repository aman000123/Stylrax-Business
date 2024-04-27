import styles from "../SalonOwnerDetails/SalonOwnerDetails.module.css";
import salonownerdetailimg from "../../../assets/image/salonownerdetailimg.png";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { salonProfileSchema } from "../../../utils/schema.js";
import { getProfile } from "../../../api/user.api.js";
//import { handleOnFileSelect } from "./FileUploader";
import { GrFormUpload } from "react-icons/gr";
import { useEffect, useState } from "react";
import Notify from '../../../utils/notify.js'
const initialValues = {
  firstName: "",
  middleName: "",
  lastName: "",
  email: "",
  dataOfBirth: "",
  gender: "",
};

function SalonOwnerDetails() {
  const [details, setDetails] = useState({});
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
        const res = await getProfile()
        const details = res.data;
        setDetails(details);

        console.log("user", details);
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
    >
      <Form>
        <label className={styles.lab}> First Name</label>
        <br />
        <Field
          type="text"
          placeholder={details.firstName}
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
          placeholder={details.middleName}
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
          placeholder={details.lastName}
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
          placeholder={details.email}
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
          type="text"
          placeholder={details.dataOfBirth}
          name="dataOfBirth"
          className={styles.dob}
        />
        <br />

        <ErrorMessage
          name="dataOfBirth"
          className={styles.formError}
          component="div"
        />

        <label className={styles.lab}>
          Gender
          <br />
          <Field
            type="text"
            name="gender"
            placeholder={details.gender}
            className={styles.inputs}
          >
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
        <div className="d-flex gap-4">
        <div className={styles.aadhar}>
          <label className={styles.front}>
            <span>Aadhar Front</span>
            <div>
              <img
                src={details.aadharFrontUrl}
                className={styles.documents}
              />
            </div>
          </label>
        </div>
        <div className={styles.aadhar}>
          <label className={styles.front}>
            <span>Aadhar Back</span>
            <div>
              <img src={details.aadharBackUrl} className={styles.documents} />
            </div>
          </label>
        </div>
        </div>
        <label className={styles.lab}>
          Pan Card
          <div>
            <img src={details.panCardImageUrl} className={styles.documents} />
          </div>
          <br />
        </label>
        <br />
      </Form>
    </Formik>
  </div>
  );
}

export default SalonOwnerDetails;
