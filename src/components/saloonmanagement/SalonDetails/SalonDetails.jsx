import styles from "./SalonDetails.module.css";
import Image from "../../../ux/Image.jsx";

function SalonDetails({ salonDetails }) {
  const details = salonDetails.salon || {};
  return (
    <div className={styles.mainDiv}>
      <div className={styles.imgDiv}>
        <div>
          <Image
            alt="Salon Main Gate"
            className={styles.imgDiv}
            imageUrl={details.mainGateImageUrl}
          />
        </div>
      </div>

      <div>
        <label className={styles.lab}>Salon Name</label>
        <br />
        <input
          type="text"
          className={styles.inputs}
          value={details.name}
          disabled
        />{" "}
      </div>
      <div>
        <label className={styles.lab}>Email ID</label>
        <br />
        <input
          type="text"
          className={styles.email}
          value={details.email}
          disabled
        />
      </div>
      <div>
        <label className={styles.lab}>GST Number</label>
        <br />
        <input
          type="text"
          className={styles.inputs}
          value={details.gstNumber}
          disabled
        />
      </div>
      <div>
        <label className={styles.lab}>Address</label>
        <br />
        <input
          type="text"
          className={styles.email}
          value={details.address}
          disabled
        />
      </div>
      <div>
        <label className={styles.lab}>State</label>
        <br />
        <input
          type="text"
          className={styles.inputs}
          value={details.state}
          disabled
        />
      </div>
      <div>
        <label className={styles.lab}>Company Name</label>
        <br />
        <input
          type="text"
          className={styles.inputs}
          value={details.companyName}
          disabled
        />
      </div>
      <div>
        <label className={styles.lab}>City</label>
        <br />
        <input
          type="text"
          className={styles.inputs}
          value={details.city}
          disabled
        />
      </div>
      <div>
        <label className={styles.lab}>Pin Code</label>
        <br />
        <input
          type="text"
          className={styles.inputs}
          value={details.pincode}
          disabled
        />
      </div>
    </div>
  );
}

export default SalonDetails;
