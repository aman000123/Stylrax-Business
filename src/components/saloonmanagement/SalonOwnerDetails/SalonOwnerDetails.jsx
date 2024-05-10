import React, { useState, useEffect } from "react";
import { Form, Formik, Field } from "formik";
import { MdOutlineEdit } from "react-icons/md";
import { getProfile, updateProfile } from "../../../api/user.api.js";
import { salonProfileSchema } from "../../../utils/schema.js";
import Notify from "../../../utils/notify.js";
import styles from "../SalonOwnerDetails/SalonOwnerDetails.module.css";
import { getPresignedUrl } from "../../../api/file.api.js";
import { handleOnFileSelect } from "../../account/FileUploader.jsx";
import { RxCross2 } from "react-icons/rx";
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
  const [imageUrls, setImageUrls] = useState({});
  const [isVisible, setIsVisible] = useState(true);
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

  const handleOnFileSelect = async (event, imageType) => {
    try {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImageUrls((prevState) => ({
        ...prevState,
        [imageType]: imageUrl,
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
      await updateProfile({ profileImageUrl: presignedUrl.data.path });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

 
  return (
    <div className={`${styles.mainDiv} ${styles.addSalon}`}>
    {/* <RxCross2 onClick={handleClose}/> */}
      <div>
        <img
          src={imageUrls.profile || details.profileImageUrl}
          className={styles.imgDiv}
          alt="Profile"
        />
        <label htmlFor="profileImageInput">
          <MdOutlineEdit className={styles.editProfile}/>
        </label>
        <input
          id="profileImageInput"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(event) => handleOnFileSelect(event, "profile")}
        />
      </div>
      <Formik initialValues={initialValues} validationSchema={salonProfileSchema}>
        <Form>
          <label className={styles.lab}>First Name</label>
          <br />
          <Field
            type="text"
            placeholder={details.firstName}
            name="firstName"
            className={styles.inputs}
          />
          <br />
          <label className={styles.lab}>Middle Name</label>
          <br />
          <Field
            type="text"
            placeholder={details.middleName}
            name="middleName"
            className={styles.inputs}
          />
          <br />
          <label className={styles.lab}>Last Name</label>
          <br />
          <Field
            type="text"
            placeholder={details.lastName}
            name="lastName"
            className={styles.inputs}
          />
          <br />
          <label className={styles.lab}>Email ID</label>
          <br />
          <Field
            type="email"
            placeholder={details.email}
            name="email"
            className={styles.inputs}
          />
          <br />
          <label className={styles.lab}>Date of Birth</label>
          <br />
          <Field
            type="text"
            placeholder={details.dataOfBirth}
            name="dataOfBirth"
            className={styles.inputs}
          />
          <br />
          <label className={styles.lab}>Gender</label>
          <br />
          <Field
            type="text"
            name="gender"
            placeholder={details.gender}
            className={styles.inputs}
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
