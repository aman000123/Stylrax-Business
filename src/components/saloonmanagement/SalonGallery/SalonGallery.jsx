import { useEffect, useState } from "react";
import styles from "../SalonGallery/SalonGallery.module.css";
import Notify from "../../../utils/notify.js";
import Session from "../../../service/session";
import { salonGallery } from "../../../api/salon.management.js";
import { Row, Col } from "react-bootstrap";

const SalonGallery = ({salonDetails}) => {
  const {bannerImages} = salonDetails
  const salonId = Session.get("salonId");
  const [gallery, setGallery] = useState([]);
  useEffect(() => {
    const getSalon = async () => {
      try {
        const response = await salonGallery(salonId);
        const galleryImages = response.data; 
        console.log("gallery images::>", galleryImages);
        setGallery(galleryImages);
      } catch (error) {
        Notify.error(error.message);
      }
    };

    getSalon();
  }, [salonId]);

  return (
    <>
    <div>
      <h6>Gallery Images</h6>
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
    <div>
    <h6 className="pt-4 ">Banner Images</h6>      
    <div className="pt-1">
      <Row>
      <Col  lg={2} md={3} sm={4} xs={4}>
        {bannerImages.map((imageUrl, index) => (
          <img key={index} src={imageUrl} alt={`Banner ${index + 1}`} className={styles.documents}/>
        ))}
        </Col>
        </Row>
      </div>
    </div>
    </>
  );
};

export default SalonGallery;
