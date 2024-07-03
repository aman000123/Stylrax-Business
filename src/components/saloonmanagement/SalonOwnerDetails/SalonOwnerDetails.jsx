import { useState, useEffect } from "react";
import { getProfile } from "../../../api/user.api.js";
import Notify from "../../../utils/notify.js";
import styles from "../SalonOwnerDetails/SalonOwnerDetails.module.css";
import Image from "../../../ux/Image.jsx";
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

function SalonOwnerDetails() {
  const [details, setDetails] = useState({});

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const res = await getProfile();
        const details = res.data;

        // Formatting the date of birth
        if (details.dataOfBirth) {
          const dob = new Date(details.dataOfBirth);
          details.dataOfBirth = dob.toLocaleDateString('en-GB'); 
        }

        setDetails(details);
      } catch (error) {
        Notify.error(error.message);
      }
    };
    fetchUserDetail();
  }, []);

  return (
    <div className={styles.mainDiv}>
      <div className={styles.imgDiv}>
        <div>
          <Zoom>
            <Image
              alt="Default Profile"
              className={styles.imgDiv}
              imageUrl={details.profileImageUrl}
            />
          </Zoom>
        </div>
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
          className={styles.email}
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
              <Zoom>
                <Image
                  alt="Aadhar Front"
                  className={styles.documents}
                  imageUrl={details.aadharFrontUrl}
                />
              </Zoom>
            </div>
          </label>
        </div>
        <div className={styles.aadhar}>
          <label className={styles.front}>
            <span>Aadhar Back</span>
            <div>
              <Zoom>
                <Image
                  alt="Aadhar Back"
                  className={styles.documents}
                  imageUrl={details.aadharBackUrl}
                />
              </Zoom>
            </div>
          </label>
        </div>
      </div>
      <label className={styles.lab}>Pan Card</label>
      <div>
        <Zoom>
          <Image
            alt="Pan Card"
            className={styles.documents}
            imageUrl={details.panCardImageUrl}
          />
        </Zoom>
      </div>
      <br />
    </div>
  );
}

export default SalonOwnerDetails;
