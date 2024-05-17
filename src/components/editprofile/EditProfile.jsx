import { useState, useEffect } from "react";
import { getPresignedUrl } from "../../api/file.api.js";
import Notify from "../../utils/notify.js";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineEdit } from "react-icons/md";
import { getProfile, updateProfile } from "../../api/user.api.js";
import styles from "./EditProfile.module.css";
import Image from "../../ux/Image.jsx";
function SalonOwnerDetails({ onClose }) {
  const [details, setDetails] = useState({});
  const [imageUrls, setImageUrls] = useState({});
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
      console.log("presendUrl::>", presignedUrl.data.url);
      const requestOptions = {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      };
      await fetch(presignedUrl.data.url, requestOptions);
      await updateProfile({ profileImageUrl: presignedUrl.data.path });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  return (
    <div className={styles.mainDiv}>
      <RxCross2 onClick={onClose} className={styles.close_Icon} />
      <div>
        {details.profileImageUrl &&
        details.profileImageUrl.startsWith("http") ? (
          <img
            src={details.profileImageUrl || imageUrls.profile}
            className={styles.imgDiv}
            alt="Profile"
          />
        ) : (
          <Image alt="Default Profile" className={styles.imgDiv} />
        )}
        <label htmlFor="profileImageInput">
          <MdOutlineEdit className={styles.editProfile} />
        </label>
        <input
          id="profileImageInput"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(event) => handleOnFileSelect(event, "profile")}
        />
      </div>
      <div>
        <label className={styles.lab}>Salon Name</label>
        <br />
        <input
          type="text"
          placeholder={details.firstName}
          name="firstName"
          className={styles.inputs}
          disabled
        />
      </div>
      <div>
        <label className={styles.lab}>Middle Name</label>
        <br />
        <input
          type="text"
          placeholder={details.middleName}
          name="middleName"
          className={styles.inputs}
          disabled
        />
      </div>
      <div>
        <label className={styles.lab}>Last Name</label>
        <br />
        <input
          placeholder={details.lastName}
          name="lastName"
          className={styles.inputs}
          disabled
        />
      </div>
      <div>
        <label className={styles.lab}>Email</label>
        <br />
        <input
          placeholder={details.email}
          name="email"
          className={styles.inputs}
          disabled
        />
      </div>
      <div>
        <label className={styles.lab}>Date of Birth</label>
        <br />
        <input
          type="text"
          placeholder={details.dataOfBirth}
          name="dataOfBirth"
          className={styles.inputs}
          disabled
        />
      </div>
      <div>
        <label className={styles.lab}>Gender</label>
        <br />
        <input
          type="text"
          name="gender"
          placeholder={details.gender}
          className={styles.inputs}
          disabled
        />
      </div>
      <label className={styles.lab}>Aadhar Card</label>
      <br />
      <div className="d-flex gap-4">
        <div className={styles.aadhar}>
          <label className={styles.front}>
            <span>Aadhar Front</span>
            <div>
              {details.aadharFrontUrl &&
              details.aadharFrontUrl.startsWith("http") ? (
                <img
                  src={details.aadharFrontUrl}
                  className={styles.imgDiv}
                  alt="Aadhar Front"
                />
              ) : (
                <Image alt="Default Profile" className={styles.imgDiv} />
              )}
            </div>
          </label>
        </div>
        <div className={styles.aadhar}>
          <label className={styles.front}>
            <span>Aadhar Back</span>
            <div>
              {details.aadharBackUrl &&
              details.aadharBackUrl.startsWith("http") ? (
                <img
                  src={details.aadharBackUrl}
                  className={styles.imgDiv}
                  alt="Aadhar Back"
                />
              ) : (
                <Image alt="Default Profile" className={styles.imgDiv} />
              )}
            </div>
          </label>
        </div>
      </div>
      <label className={styles.lab}>Pan Card</label>
      <div>
        {details.panCardImageUrl &&
        details.panCardImageUrl.startsWith("http") ? (
          <img
            src={details.panCardImageUrl}
            className={styles.imgDiv}
            alt="Pan Card"
          />
        ) : (
          <Image alt="Default Profile" className={styles.imgDiv} />
        )}
      </div>
      <br />
    </div>
  );
}

export default SalonOwnerDetails;
