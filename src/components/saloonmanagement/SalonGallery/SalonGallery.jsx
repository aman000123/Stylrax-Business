import { useEffect, useState } from "react";
import styles from "../SalonGallery/SalonGallery.module.css";
import Notify from "../../../utils/notify.js";
import Session from "../../../service/session";
import { salonGallery } from "../../../api/salon.management.js";
import { Row, Col } from "react-bootstrap";

const SalonGallery = () => {
  const salonId = Session.get("salonId");

  const [gallery, setGallery] = useState([]);
  useEffect(() => {
    const getSalon = async () => {
      try {
        const response = await salonGallery(salonId);
        const galleryImages = response.data; // Assuming response contains an array of images
        console.log("gallery images::>", galleryImages);
        setGallery(galleryImages);
      } catch (error) {
        Notify.error(error.message);
      }
    };

    getSalon();
  }, [salonId]);

  return (
    <div>
      <label className={styles.lab}>Gallery Images</label>
      <Row >
        {gallery &&
          gallery.length > 0 &&
          gallery.map((image, index) => (
            <Col key={index} lg={2} md={3} sm={4} xs={4}>
              <img
                src={image.mediaUrl}
                alt={`Gallery Image ${index}`}
                className={styles.documents}
              />
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default SalonGallery;
