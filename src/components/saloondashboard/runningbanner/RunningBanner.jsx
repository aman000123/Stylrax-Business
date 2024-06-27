import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { singleSalon } from "../../../api/salon.api";
import Session from "../../../service/session";
import Notify from "../../../utils/notify";
import styles from "./RunningBanner.module.css";

function RunningBanner({selectedSalon}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bannerImages, setBannerImages] = useState([]);
  const { salonName } = useSelector((state) => state.auth);

  const salonId = selectedSalon.id;

  const changeBanner = (direction) => {
    setCurrentIndex((prevIndex) =>
      direction === "prev"
        ? prevIndex === 0
          ? bannerImages.length - 1
          : prevIndex - 1
        : prevIndex === bannerImages.length - 1
        ? 0
        : prevIndex + 1
    );
  };

  useEffect(() => {
    const getSalon = async () => {
      try {
        const response = await singleSalon(salonId);
        const salonDetails = response.data;
        const images = salonDetails.bannerImages || [];
        setBannerImages(images);
      } catch (error) {
        //console.log(error)
        Notify.error(error.message);
      }
    };

    if (salonId) {
      getSalon();
    } else {
      // console.log('')
    }
  }, [salonId]);

  if (bannerImages.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={styles.banner}
      style={{ backgroundImage: `url(${bannerImages[currentIndex]})` }}
    >
      <div className={styles.text}>
        <div className={styles.title}>
          <p>Running Banner</p>
        </div>
        <div className={styles.icon}>
          <KeyboardArrowLeftIcon onClick={() => changeBanner("prev")} />
          <KeyboardArrowRightIcon onClick={() => changeBanner("next")} />
        </div>
      </div>
      <div className={styles}>
        <div className={styles.offer}>
          <h2>20%</h2>
          <p>Flat off on Any Hair Stylings</p>
          <h1>{salonName}</h1>
        </div>
      </div>
    </div>
  );
}

export default RunningBanner;
