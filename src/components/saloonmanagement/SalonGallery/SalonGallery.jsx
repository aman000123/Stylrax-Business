import { useEffect, useState } from "react";
import styles from "../SalonGallery/SalonGallery.module.css";
import Notify from "../../../utils/notify.js";
import Session from "../../../service/session";
import { salonGallery } from "../../../api/salon.management.js";
import { Row, Col } from "react-bootstrap";
import Image from "../../../ux/Image.jsx";
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
const SalonGallery = ({ salonDetails }) => {
  const { bannerImages } = salonDetails;
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
        <Row>
          {gallery &&
            gallery.length > 0 &&
            gallery.map((image, index) => (
              <Col key={index} lg={2} md={3} sm={4} xs={4}>
                <Zoom>
                <Image
                  alt={`Gallery Image ${index}`}
                  className={styles.documents}
                  imageUrl={image.mediaUrl}
                />
                </Zoom>
              </Col>
            ))}
        </Row>
      </div>
      <div>
        <h6 className="pt-4 ">Banner Images</h6>
        <div className="pt-1">
          <Row>
            {bannerImages &&
              bannerImages.length > 0 &&
              bannerImages.map((image, index) => (
                <Col key={index} lg={2} md={3} sm={4} xs={4}>
                  <Zoom>
                  <Image
                    alt={`Banner Image ${index}`}
                    className={styles.documents}
                    imageUrl={image}
                  />
                  </Zoom>
                </Col>
              ))}
          </Row>
        </div>
      </div>
    </>
  );
};

export default SalonGallery;
