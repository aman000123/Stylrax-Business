import { useEffect, useState, useRef } from "react";
import SalonClinic from "../components/saloondashboard/salonclinic/SalonClinic";
import UpcomingAppointment from "../components/saloondashboard/upcoming/UpcomingAppointment";
import { Row, Col } from "react-bootstrap";
import orangeSpecs from "../assets/image/orangeSpecs.png";
import styles from "./DashboardLayout.module.css";
import { LuSwitchCamera } from "react-icons/lu";
import Navbar from "../components/saloondashboard/navbar/Navbar";
import { navItems } from "../data/navdata/Data";
import SwitchSalon from "../components/saloondashboard/switchsalon/SwitchSalon";
import Notify from '../utils/notify'
import { getSalon } from "../api/salon.api";
import { useDispatch } from "react-redux";
import { setSalonID, storeToken } from "../store/auth.slice";

const DashBoardLayout = () => {
  const [showContent, setShowContent] = useState(false);
  const [salons, setSalons] = useState([]);
  const [selectedSalonName, setSelectedSalonName] = useState("");
  const [selectedSalonImage, setSelectedSalonImage] = useState("");
  const [selectedSalonId, setSelectedSalonId] = useState("");
  const dispatch = useDispatch();
  const switchSalonRef = useRef(null); // Create a ref for SwitchSalon component

  const toggleContent = () => {
    setShowContent(!showContent);
  };

  useEffect(() => {
    const fetchSalons = async () => {
      try {
        const response = await getSalon();
        const salons = response?.data;
        setSalons(salons);
        console.log("response::::>>", salons);
        if (salons.length > 0) {
          setSelectedSalonName(salons[0].name);
          setSelectedSalonImage(salons[0].mainGateImageUrl);
          setSelectedSalonId(salons[0].id);
          dispatch(setSalonID({ salonId: salons[0].id }));
        }
      } catch (error) {
        Notify.error(error.message);
      }
    };
    fetchSalons();
  }, []);

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (switchSalonRef.current && !switchSalonRef.current.contains(event.target)) {
  //       setShowContent(false); // Close the SwitchSalon component if clicked outside
  //     }
  //   };

  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [switchSalonRef]);

  return (
    <>
      <Navbar data={navItems} />
      <div className={styles.container}>
        <div className={styles.mainDiv}>
          <div className="d-flex align-items-center justify-content-center ">
            <img src={selectedSalonImage} alt={selectedSalonName} className={styles.salonImage} />
          </div>
          <div className={styles.secDiv}>
            <ul>
              <li className={styles.listOne} onClick={toggleContent}>
                <LuSwitchCamera onClick={toggleContent} />
                <span className={styles.spanOne}>Switch or add salon here</span>
              </li>

              <li>
                {selectedSalonName && (
                  <p className={styles.span}>{selectedSalonName}</p>
                )}
              </li>
            </ul>
            {showContent && (
              <div ref={switchSalonRef}>
                <SwitchSalon
                  salons={salons}
                  show={showContent}
                  onSelectSalon={(salonName, salonImage, id) => {
                    setSelectedSalonName(salonName);
                    setSelectedSalonImage(salonImage);
                    setSelectedSalonId(id);
                    dispatch(setSalonID({ salonId: id }));
                  }}
                />
              </div>
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
