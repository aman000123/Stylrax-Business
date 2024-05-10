import { Formik, Form, Field, ErrorMessage} from "formik"; // Import setFieldValue
import { Col } from "react-bootstrap";
import { addStaffSchema } from "../../../utils/schema.js";
import { addStaff } from "../../../api/salon.management.js";
import Notify from "../../../utils/notify.js";
import { RxCross2 } from "react-icons/rx";
import { handleOnFileSelect } from "../../account/FileUploader.jsx";
import Session from "../../../service/session.js";
import InputFile from "../../../ux/controls/InputFile.jsx";
import styles from "../ManageStaff/ManageStaff.module.css";
import servicesimg from "../../../assets/image/servicesimg.png";
import { getPresignedUrl } from "../../../api/file.api.js";
import { MdOutlineEdit } from "react-icons/md";
import { useState } from "react";
const initialValues = {
  name: "",
  mobileNumber: "",
  dob: "",
  email: "",
  gender: "",
  specialization: "",
  profileImageUrl: "",
  aadharFrontUrl: "",
  aadharBackUrl: "",
};

function AddStaff({ onClose }) {
  const salonId = Session.get("salonId");
  const [imageUrls, setImageUrls] = useState("");
  console.log("imgUrl",imageUrls)
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
        aadharFrontUrl: values.aadharFrontUrl,
        aadharBackUrl: values.aadharBackUrl,
      };
      const Staff = await addStaff(salonId, data);
      const { profileImageUrl } = Staff.data; // Assuming profileImageUrl is returned in the response
      setImageUrls({ ...imageUrls, profile: profileImageUrl });
      Notify.success("Staff Added")
      console.log("addStaff::>", Staff);
      onClose();
    } catch (error) {
      Notify.error(error.message);
    }
  };
  const handleOnFile = async (event, imageType) => {
    try {
      const file = event.target.files[0];
      const imageUrls = URL.createObjectURL(file);
      setImageUrls((prevState) => ({
        ...prevState,
        [imageType]: imageUrls,
      }));
      const presignedUrl = await getPresignedUrl({ fileName: file.name });
      console.log("presendUrl::>",presignedUrl.data.url);
      const requestOptions = {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        }
      };
      await fetch(presignedUrl.data.url, requestOptions);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  return (
    <Col md={4}>
      <div className={styles.popupFormDiv}>
        <div className={styles.popupFormImgDiv}>
          <span>Staff</span>
          <div onClick={handleClose} className={styles.crossIcon}>
          
            <RxCross2 />
            {/* <img
          src={imageUrls.profile }
          className={styles.staffImg}
          alt="Profile"
          
        />
        <label htmlFor="profileImageUrl">
          <MdOutlineEdit className={styles.editProfile}/>
        </label>
        <input
          name="profileImageUrl"
          id="profileImageUrl"

          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(event) => handleOnFile(event, "profile")}
        /> */}
          </div>
          {/* <RiEditCircleLine/> */}
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={addStaffSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => ( 
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

              <Field type="date" placeholder="Date of Birth" name="dob" max={new Date().toISOString().split("T")[0]}className={styles.dob}/>
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

              <Field as="select" name="gender" className={styles.gender}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Field>
              <ErrorMessage
                name="gender"
                component="div"
                className={styles.formError}
              />
 
               {/* <Field type="text" placeholder="Specialization" name="specialization" />
              <ErrorMessage
                name="specialization"
                component="div"
                className={styles.formError}
              />  */}
               <div className={styles.staffImage}>
                <label>Profile Image
              <InputFile name="profileImageUrl"  onFileSelect={(e) => handleOnFileSelect(e, "profileImageUrl", setFieldValue)}/>
              </label>
              </div>
               <div className={styles.staffImage}>
                <label>Adhar Front Image
              <InputFile name="aadharFrontUrl"  onFileSelect={(e) => handleOnFileSelect(e, "aadharFrontUrl", setFieldValue)}/>
              </label>
              </div>
              <div className={styles.staffImage}>
                <label>Adhar Back Image
              <InputFile name="aadharBackUrl"  onFileSelect={(e) => handleOnFileSelect(e, "aadharBackUrl", setFieldValue)}/>
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
