import  { useState } from 'react'
import { Row, Col } from "react-bootstrap";
import styles from "../salonmanagement/SalonManagement.module.css";
import orangeSpecs from "../../../assets/image/orangeSpecs.png"
import SalonDetails from '../SalonDetails/SalonDetails';
import SalonOwnerDetails from '../SalonOwnerDetails/SalonOwnerDetails';
import BankDetails from '../BankDetails/BankDetails';
import ManageStaff from '../ManageStaff/ManageStaff';
import Services from '../Services/Services';
import SalonTime from '../SalonTime/SalonTime';
import AboutUs from '../AboutUs/AboutUs';
import SalonBanner from '../SalonBanner/SalonBanner';
import Navbar from '../../saloondashboard/navbar/Navbar';
import { navItems } from '../../../data/navdata/Data';

const data = ["Salon Details", "Salon Owner Details","Bank Details","Manage Staff",
              "Services", "Salon Time", "Salon Banner",
              "About Us", "Support", "Terms and Conditions"]


function SalonManagement() {

  const [activeButton, setActiveButton] = useState("Salon Details");
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };


  return (
    <>
    <Navbar data={navItems}/>
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
                <div key={data.key} className={`${styles.btn} ${activeButton === value ? styles.active: ""}`}>
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
</>
  )
}

export default SalonManagement;
