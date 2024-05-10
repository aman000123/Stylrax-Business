//import styles from "../SalonDetails/SalonDetails.module.css";
import Session from "../../../service/session";
import { useEffect, useState } from "react";
import { singleSalon } from "../../../api/salon.api";
import Notify from "../../../utils/notify.js";
import styles from "../SalonOwnerDetails/SalonOwnerDetails.module.css";

function SalonDetails() {
  const [salonDetails, setSalonDetails] = useState([]);
  const salonId = Session.get("salonId");
  useEffect(() => {
    const getSalon = async () => {
      try {
        const response = await singleSalon(salonId);
        const salonDetails = response.data.salon;
        console.log("salon details::>", salonDetails);
        setSalonDetails(salonDetails);
      } catch (error) {
        Notify.error(error.message);
      }
    };

    getSalon();
  }, [salonId]);
  return (
    <div className={styles.mainDiv}>
      <div className={styles.imgDiv}>
        <div>
          <img
            src={salonDetails.mainGateImageUrl}
            className={styles.documents}
          />{" "}
        </div>
      </div>

      <form>
        <div>
          <label className={styles.lab}>Salon Name</label>
          <br />
          <input
            type="text"
            className={styles.inputs}
            value={salonDetails.name}
            readOnly
          />
        </div>
        <div>
          <label className={styles.lab}>Email ID</label>
          <br />
          <input
            type="text"
            className={styles.inputs}
            value={salonDetails.email}
            readOnly
          />
        </div>
        <div>
          <label className={styles.lab}>GST Number</label>
          <br />
          <input
            type="text"
            className={styles.inputs}
            value={salonDetails.gstNumber}
            readOnly
          />
        </div>
        <div>
          <label className={styles.lab}>Address</label>
          <br />
          <input
            type="text"
            className={styles.inputs}
            value={salonDetails.address}
            readOnly
          />
        </div>
        <div>
          <label className={styles.lab}>State</label>
          <br />
          <input
            type="text"
            className={styles.inputs}
            value={salonDetails.state}
            readOnly
          />
        </div>
        <div>
          <label className={styles.lab}>Company Name</label>
          <br />
          <input
            type="text"
            className={styles.inputs}
            value={salonDetails.companyName}
            readOnly
          />
        </div>
        <div>
          <label className={styles.lab}>City</label>
          <br />
          <input
            type="text"
            className={styles.inputs}
            value={salonDetails.city}
            readOnly
          />
        </div>
        <div>
          <label className={styles.lab}>PinCode</label>
          <br />
          <input
            type="text"
            className={styles.inputs}
            value={salonDetails.pincode}
            readOnly
          />
        </div>
      </form>
    </div>
  );
}

export default SalonDetails;
