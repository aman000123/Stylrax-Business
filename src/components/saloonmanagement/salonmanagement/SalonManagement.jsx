import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import styles from "../salonmanagement/SalonManagement.module.css";
import SalonDetails from "../SalonDetails/SalonDetails";
import SalonOwnerDetails from "../SalonOwnerDetails/SalonOwnerDetails";
import BankDetails from "../BankDetails/BankDetails";
import ManageStaff from "../ManageStaff/ManageStaff";
import Services from "../Services/Services";
import SalonTime from "../SalonTime/SalonTime";
import SalonBanner from "../SalonGallery/SalonGallery";
import Navbar from "../../saloondashboard/navbar/Navbar";
import { navItems } from "../../../data/navdata/Data";
import Session from "../../../service/session";
import { singleSalon } from "../../../api/salon.api";
import Notify from "../../../utils/notify.js";
import MyQR from "../MyQR/MyQR.jsx";
import { useSelector } from "react-redux";

function SalonManagement() {
  const [activeButton, setActiveButton] = useState("Salon details");
  const { salonName, salonImage } = useSelector((state) => state.auth);

  const [salonDetails, setSalonDetails] = useState([]);
  const salonId = Session.get("salonId");
  const name = Session.get("firstName");

  useEffect(() => {
    const getSalon = async () => {
      try {
        const response = await singleSalon(salonId);
        const salonDetails = response.data;
        const image =salonDetails.salon.mainGateImageUrl;
        console.log("salon management::>", salonDetails.salon.mainGateImageUrl);
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
  console.log("activebutton :", activeButton);
  const data = [
    "Salon details",
    "Salon owner details",
    "Bank details",
    "Manage staff",
    "Services",
    "Salon timings",
    "Salon gallery",
    "My QR"
  ];
  const currentComponent = {
    "Salon details": (
      <Col md={10} className={styles.coltwo}>
        <SalonDetails />
      </Col>
    ),
    "Salon owner details": (
      <Col md={10} className={styles.coltwo}>
        <SalonOwnerDetails />
      </Col>
    ),
    "Bank details": (
      <Col md={10} className={styles.coltwo}>
        <BankDetails />
      </Col>
    ),
    "Manage staff": (
      <Col md={10} className={styles.coltwo}>
        <ManageStaff />
      </Col>
    ),
    "Services": (
      <Col md={10} className={styles.coltwo}>
        <Services />
      </Col>
    ),
    "Salon timings": (
      <Col md={10} className={styles.coltwo}>
        <SalonTime />
      </Col>
    ),
    "Salon gallery": (
      <Col md={10} className={styles.coltwo}>
        <SalonBanner salonDetails={salonDetails}/>
      </Col>
    ),
    "My QR": (
      <Col md={10} className={styles.coltwo}>
        <MyQR />
      </Col>
    ),
  };


  return (
    <>
      <Navbar data={navItems} />
      <div className={styles.mainDiv}>
        <div className={styles.main}>
          <div className={styles.salonImage}>
          <img src={salonImage} alt="" />          </div>

          <div>
            <p>{salonName}</p>
          </div>
        </div>

        <div className={styles.mainContent}>
          <Row className={styles.rowone}>
            <Col md={2} className={styles.colone}>
              <div className={styles.list}>
                <p className="fw-bold"> Management</p>
                {data.map((value) => (
                  <div
                    key={data.key}
                    className={`${styles.btn} ${
                      activeButton === value ? styles.active : ""
                    }`}
                  >
                    <button onClick={() => handleButtonClick(value)}>
                      {value}
                    </button>
                  </div>
                ))}
              </div>
            </Col>
            {currentComponent[activeButton]}
       
          </Row>
        </div>
      </div>
    </>
  );
}

export default SalonManagement;
