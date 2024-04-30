import { useEffect, useState } from "react";
import styles from "../SalonOwnerDetails/SalonOwnerDetails.module.css";
import { singleSalon } from "../../../api/salon.api";
import Notify from "../../../utils/notify.js";
import Session from "../../../service/session";

const SalonGallery = () => {
  const salonId = Session.get("salonId");
  console.log("bank details::>", salonId);

  const [gallery, setGallery] = useState([]);
  useEffect(() => {
    const getSalon = async () => {
      try {
        const response = await singleSalon(salonId);
        const gallery = response.data.gallaryImages;
        console.log("gallery images::>", gallery);
        setGallery(gallery);
      } catch (error) {
        Notify.error(error.message);
      }
    };

    getSalon();
  }, [salonId]);

  return (
    <div>
      <label className={styles.lab}>Gallery Images</label>
      <div className={styles.documents}>
        {gallery.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Gallery Image ${index}`}
            //className={styles.documents}
          />
        ))}
      </div>
    </div>
  );
}

export default SalonGallery;
