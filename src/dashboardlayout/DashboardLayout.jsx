import  { useState } from "react";
import SalonClinic from "../components/saloondashboard/salonclinic/SalonClinic";
import UpcomingAppointment from "../components/saloondashboard/upcoming/UpcomingAppointment";
import { Row, Col} from "react-bootstrap";
import orangeSpecs from "../assets/image/orangeSpecs.png";
import styles from "../dashboardlayout/DashboardLayout.module.css";
import { LuSwitchCamera } from "react-icons/lu";
import SwitchSalon from "../components/saloondashboard/switchsalon/SwitchSalon";
const DashBoardLayout = () => {
  const [showContent, setShowContent] = useState(false);
  const toggleContent = () => {
    setShowContent(!showContent);
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.mainDiv}>
          <div>
            <img src={orangeSpecs} alt="" />
          </div>
          <div className={styles.secDiv}>
            <ul>
              <li className={styles.listOne} onClick={toggleContent}>
                <LuSwitchCamera onClick={toggleContent} />
                <span className={styles.spanOne}>Switch or add salon here</span>
              </li>
       
              <li>
                <span className={styles.span}>Hair Clinic</span>{" "}
                <span className={styles.spanOne}>
                  Lorem this website is for saloon users and very helpful for
                  freelancers
                </span>
              </li>
            </ul>
            {showContent && (
        <SwitchSalon/>
    
      )}
          </div>
        </div>

        <Row className="mt-2">
          <Col xl={8}>
            <SalonClinic />
          </Col>

          <Col xl={4}>
            <UpcomingAppointment />
          </Col>
        </Row>
      </div>
     
    </>
  );
};

export default DashBoardLayout;
