import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import styles from "../salonmanagement/SalonManagement.module.css";
import orangeSpecs from "../../../assets/image/orangeSpecs.png";
import SalonDetails from "../SalonDetails/SalonDetails";
import SalonOwnerDetails from "../SalonOwnerDetails/SalonOwnerDetails";
import BankDetails from "../BankDetails/BankDetails";
import ManageStaff from "../ManageStaff/ManageStaff";
import Services from "../Services/Services";
import SalonTime from "../SalonTime/SalonTime";
// import AboutUs from '../AboutUs/AboutUs';
import SalonBanner from "../SalonGallery/SalonGallery";
import Navbar from "../../saloondashboard/navbar/Navbar";
import { navItems } from "../../../data/navdata/Data";
import Session from "../../../service/session";
import { singleSalon } from "../../../api/salon.api";
import Notify from "../../../utils/notify.js";

function SalonManagement() {
  const [activeButton, setActiveButton] = useState("Salon Details");

  const [salonDetails, setSalonDetails] = useState([]);
  const salonId = Session.get("salonId");
  useEffect(() => {
    const getSalon = async () => {
      try {
        const response = await singleSalon(salonId);
        const salonDetails = response.data;
        console.log("salon management::>", salonDetails);
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
  };


  return (
    <>
      <Navbar data={navItems} />
      <div className={styles.mainDiv}>
        <div className={styles.main}>
          <div>
            <img src={orangeSpecs} />
          </div>

          <div>
            <p>HairClinic</p>
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
            {/* {activeButton === "Salon details" && (<Col md={10} className={styles.coltwo}>
              <SalonDetails />
            </Col>)}

            {activeButton === "Salon owner details" && (<Col md={10} className={styles.coltwo}>
              <SalonOwnerDetails />
            </Col>)}

            {activeButton === "Bank details" && (<Col md={10} className={styles.coltwo}>
              <BankDetails />
            </Col>)}

            {activeButton === "Manage staff" && (<Col md={10} className={styles.coltwo}>
              <ManageStaff />
            </Col>)}

            {activeButton === "Services" && (<Col md={10} className={styles.coltwo}>
              <Services />
            </Col>)}

            {activeButton === "Salon timings" && (<Col md={10} className={styles.coltwo}>
              <SalonTime />
            </Col>)}

            {activeButton === "About Us" && (<Col md={10} className={styles.coltwo}>
              <AboutUs />
            </Col>)}

            {activeButton === "Salon gallery" && (<Col md={10} className={styles.coltwo}>
              <SalonBanner />
            </Col>)} */}
          </Row>
        </div>
      </div>
    </>
  );
}

export default SalonManagement;
