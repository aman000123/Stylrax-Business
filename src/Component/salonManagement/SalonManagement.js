import React, { useState } from 'react'
import { Row, Col } from "react-bootstrap";
import styles from "../../assets/scss/pages/home/salonManagement.module.css";
import orangeSpecs from "../../assets/image/orangeSpecs.png"
import SalonDetails from '../salonManagement/SalonDetails/SalonDetails';
import SalonOwnerDetails from '../salonManagement/SalonOwnerDetails/SalonOwnerDetails';
import BankDetails from '../salonManagement/BankDetails/BankDetails';
import ManageStaff from '../salonManagement/ManageStaff/ManageStaff';
import Services from '../salonManagement/Services/Services';
import SalonTime from '../salonManagement/SalonTime/SalonTime';
import AboutUs from '../salonManagement/AboutUs/AboutUs';
import SalonBanner from '../salonManagement/SalonBanner/SalonBanner';


const data = ["Salon Details", "Salon Owner Details","Bank Details","Manage Staff",
              "Services", "Salon Time", "Salon Banner", "Salon Gallery", "Sales" ,"Cover Range",
              "About Us", "Support", "Terms and Conditions"]


function SalonManagement() {

  const [activeButton, setActiveButton] = useState("Salon Details");
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };


  return (
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
          <Col md={2}  className={styles.colone}>
            <div className={styles.list}>
               <p> Management</p>
            {
              data.map((value)=> (
                <div className={`${styles.btn} ${activeButton === value ? styles.active: ""}`}>
                <button onClick={()=>handleButtonClick(value)}>{value}</button>
                </div>
              ))
            }
            </div>
          </Col>
       
          {activeButton === "Salon Details" &&(<Col md={10} className={styles.coltwo}>
                  <SalonDetails/>       
          </Col>)}

          {activeButton === "Salon Owner Details" &&(<Col md={10} className={styles.coltwo}>
                  <SalonOwnerDetails/>       
          </Col>)}

          {activeButton === "Bank Details" &&(<Col md={10} className={styles.coltwo}>
                  <BankDetails/>       
          </Col>)}

          {activeButton === "Manage Staff" &&(<Col md={10} className={styles.coltwo}>
                  <ManageStaff/>           
          </Col>)}

          {activeButton === "Services" &&(<Col md={10} className={styles.coltwo}>
                  <Services/>          
          </Col>)}

          {activeButton === "Salon Time" &&(<Col md={10} className={styles.coltwo}>
                  <SalonTime/>          
          </Col>)}

          {activeButton === "About Us" &&(<Col md={10} className={styles.coltwo}>
                  <AboutUs/>          
          </Col>)}

          {activeButton === "Salon Banner" &&(<Col md={10} className={styles.coltwo}>
                  <SalonBanner/>          
          </Col>)}
        </Row>
      </div>
    </div>

  )
}

export default SalonManagement;
