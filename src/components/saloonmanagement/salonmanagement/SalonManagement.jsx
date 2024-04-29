import { useState } from "react";
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

function SalonManagement() {
  const [activeButton, setActiveButton] = useState("Salon Details");
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
        <SalonBanner />
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
                <p> Management</p>
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
