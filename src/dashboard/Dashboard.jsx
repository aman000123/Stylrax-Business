import  { useEffect, useState } from "react";
import SalonClinic from "../components/saloondashboard/salonclinic/SalonClinic";
import UpcomingAppointment from "../components/saloondashboard/upcoming/UpcomingAppointment";
import { Row, Col} from "react-bootstrap";
import orangeSpecs from "../assets/image/orangeSpecs.png";
import styles from "./DashboardLayout.module.css";
import { LuSwitchCamera } from "react-icons/lu";
import Navbar from "../components/saloondashboard/navbar/Navbar";
import { navItems } from "../data/navdata/Data";
import SwitchSalon from "../components/saloondashboard/switchsalon/SwitchSalon";
import Notify from '../utils/notify'
import { getSalon } from "../api/salon.api";
const DashBoardLayout = () => {
  const [showContent, setShowContent] = useState(false);
  const [salons, setSalons] = useState([])
  const toggleContent = () => {
    setShowContent(!showContent);
  };
  useEffect(() => {
    const fetchSalons = async () => {
      try {
        const response = await getSalon()
        const salons= response?.data
        setSalons(salons);
        console.log("response::::>>",salons)
      } catch (error) {
        Notify.error(error.message)
      }
    }
    fetchSalons()
  }, [])
  return (
    <>
     <Navbar data={navItems}/>
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
        <SwitchSalon salons={salons} show={showContent}/>
    
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
