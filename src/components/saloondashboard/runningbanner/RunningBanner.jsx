// import { useEffect, useState } from "react";
// import styles from "./RunningBanner.module.css";
// import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
// import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
// import { singleSalon } from "../../../api/salon.api";
// import Session from "../../../service/session";
// import Notify from "../../../utils/notify";
// function RunningBanner() {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   //bgimage.png
//   const banners = [
//     {
//       background: 'url("../../../assets/image/bgimage.png")',
//       offer: "Flat 20% Off",
//       // offerDetails: 'HairClinic',
//       // description: <p>Lorem ispum dolar<br/> dot nhuiinsuing gone <br/>ruling ispium</p>
//     },
//     {
//       background: 'url("../../../assets/image/bgimage.png")',
//       offer: "30%",
//       offerDetails: "Skin Care Clinic",
//       description: (
//         <p>
//           Another description for
//           <br /> the second image.
//         </p>
//       ),
//     },
//     // Add more objects for additional banners
//   ];

//   const changeBanner = (direction) => {
//     if (direction === "prev") {
//       setCurrentIndex((prevIndex) =>
//         prevIndex === 0 ? banners.length - 1 : prevIndex - 1
//       );
//     } else {
//       setCurrentIndex((prevIndex) =>
//         prevIndex === banners.length - 1 ? 0 : prevIndex + 1
//       );
//     }
//   };

//   const [salonDetails, setSalonDetails] = useState([]);
//   const salonId = Session.get("salonId");
//   //const name = Session.get("firstName");

//   useEffect(() => {
//     const getSalon = async () => {
//       try {
//         const response = await singleSalon(salonId);
//         const salonDetails = response.data;
//         const image =salonDetails.salon.mainGateImageUrl;
//         console.log("salon management::>", salonDetails.salon.mainGateImageUrl);
//         setSalonDetails(salonDetails);
//       } catch (error) {
//         Notify.error(error.message);
//       }
//     };

//     getSalon();
//   }, [salonId]);
//   return (
//     <div
//       className={styles.banner}
//       style={{ backgroundImage: banners[currentIndex].background }}
//     >
//       <div className={styles.text}>
//         <div className={styles.title}>
//           <p>Running Banner</p>
//         </div>

//         <div className={styles.icon}>
//           <KeyboardArrowLeftIcon onClick={() => changeBanner("prev")} />
//           <KeyboardArrowRightIcon onClick={() => changeBanner("next")} />
//         </div>
//       </div>

//       <div className={styles.runningBanner}>
//         <div className={styles.offer}>
//           <h3>{banners[currentIndex].offer}</h3>
//           <p>on all hair styling</p>
//         </div>
//         <div className={styles.offerDetails}>
//           <h3>{banners[currentIndex].offerDetails}</h3>
//           <p>{banners[currentIndex].description}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RunningBanner;



import { useEffect, useState } from "react";
import styles from "./RunningBanner.module.css";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { singleSalon } from "../../../api/salon.api";
import Session from "../../../service/session";
import Notify from "../../../utils/notify";
import { useSelector } from "react-redux";

function RunningBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bannerImages, setBannerImages] = useState([]);
  const { salonName, salonImage } = useSelector((state) => state.auth);

  const changeBanner = (direction) => {
    if (direction === "prev") {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? bannerImages.length - 1 : prevIndex - 1
      );
    } else {
      setCurrentIndex((prevIndex) =>
        prevIndex === bannerImages.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const salonId = Session.get("salonId");

  useEffect(() => {
    const getSalon = async () => {
      try {
        const response = await singleSalon(salonId);
        const salonDetails = response.data;
        const images = salonDetails.bannerImages;
        console.log("salon management::>", images);

        setBannerImages(images); // Ensure all images are set correctly
      } catch (error) {
        Notify.error(error.message);
      }
    };

    getSalon();
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

      {/* <div className={styles.runningBanner}> */}
        <div className={styles.offer}>
          <h2>20%</h2>
          <p>Flat of on Any Hair Stylings</p>
         <h1>{salonName}</h1>
        </div>
      </div>
    // </div>
  );
}

export default RunningBanner;
