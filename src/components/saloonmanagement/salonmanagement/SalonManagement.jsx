import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import styles from "../salonmanagement/SalonManagement.module.css";
import SalonDetails from "../SalonDetails/SalonDetails";
import SalonOwnerDetails from "../SalonOwnerDetails/SalonOwnerDetails";
import BankDetails from "../BankDetails/BankDetails";
import ManageStaff from "../ManageStaff/ManageStaff";
import SalonTime from "../SalonTime/SalonTime";
import SalonBanner from "../SalonGallery/SalonGallery";
import Navbar from "../../saloondashboard/navbar/Navbar";
import { navItems } from "../../../data/navdata/Data";
import Session from "../../../service/session";
import { singleSalon } from "../../../api/salon.api";
import Notify from "../../../utils/notify.js";
import MyQR from "../MyQR/MyQR.jsx";
import { useSelector } from "react-redux";
import Footer from "../../home/footer/Footer.jsx";
import ProvideServices from "../Services/ProvideServices.jsx";
import Serviceable from "../Serviceable/Serviceable.jsx";

function SalonManagement() {
  const [activeButton, setActiveButton] = useState("Salon details");
  const { salonName, salonImage } = useSelector((state) => state.auth);

  const [salonDetails, setSalonDetails] = useState([]);
  const salonId = Session.get("salonId");
  const homeService = Session.get('homeService') === 'true';  // Ensure this is a boolean

  useEffect(() => {
    const getSalon = async () => {
      try {
        const response = await singleSalon(salonId);
        const salonDetails = response.data;
        // const image = salonDetails.salon.mainGateImageUrl;
        // console.log("salon management::>", salonDetails.salon.mainGateImageUrl);
        setSalonDetails(salonDetails);
      } catch (error) {
        Notify.error(error.message);
      }
    };

    getSalon();
  }, [salonId]);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  // console.log("activebutton :", activeButton);

  const data = [
    { name: "Salon details", key: "salonDetails" },
    { name: "Salon owner details", key: "ownerDetails" },
    { name: "Bank details", key: "bankDetails" },
    { name: "Manage staff", key: "manageStaff" },
    { name: "Services", key: "services" },
    { name: "Salon timings", key: "salonTimings" },
    homeService && { name: "Serviceable radius (in km)", key: "serviceableRadius" },
    { name: "Salon gallery", key: "salonGallery" },
    { name: "My QR", key: "myQR" },
  ].filter(Boolean);  // Filter out the false/null values

  const currentComponent = {
    "Salon details": (
      <Col md={10} className={styles.coltwo}>
        <SalonDetails salonDetails={salonDetails} />
      </Col>
    ),
    "Salon owner details": (
      <Col md={10} className={styles.coltwo}>
        <SalonOwnerDetails />
      </Col>
    ),
    "Bank details": (
      <Col md={10} className={styles.coltwo}>
        <BankDetails salonDetails={salonDetails} />
      </Col>
    ),
    "Manage staff": (
      <Col md={10} className={styles.coltwo}>
        <ManageStaff />
      </Col>
    ),
    Services: (
      <Col md={10} className={styles.coltwo}>
        <ProvideServices />
      </Col>
    ),
    "Salon timings": (
      <Col md={10} className={styles.coltwo}>
        <SalonTime />
      </Col>
    ),
    "Salon gallery": (
      <Col md={10} className={styles.coltwo}>
        <SalonBanner salonDetails={salonDetails} />
      </Col>
    ),
    "Serviceable radius (in km)": homeService ? (
      <Col md={10} className={styles.coltwo}>
        <Serviceable />
      </Col>
    ) : null,
    "My QR": (
      <Col md={10} className={styles.coltwo}>
        <MyQR />
      </Col>
    ),
  };

  return (
    <>
      <Navbar data={navItems} redirect="/salon/dashboard" />
      <div className={styles.mainDiv}>
        <div className={styles.main}>
          <div className={styles.salonImage}>
            <img src={salonImage} alt="" />{" "}
          </div>
          <div>
            <p>{salonName}</p>
          </div>
        </div>
        <div className={styles.mainContent}>
          <Row className={styles.rowone}>
            <Col md={2} className={styles.colone}>
              <div className={styles.list}>
                <p className="fw-bold"> Management</p>
                {data.map((item) => (
                  <div
                    key={item.key}
                    className={`${styles.btn} ${activeButton === item.name ? styles.active : ""
                      }`}
                  >
                    <button onClick={() => handleButtonClick(item.name)}>
                      {item.name}
                    </button>
                  </div>
                ))}
              </div>
            </Col>
            {currentComponent[activeButton]}
          </Row>
        </div>
      </div>
      <Footer redirect="/salon/dashboard" />
    </>
  );
}

export default SalonManagement;
