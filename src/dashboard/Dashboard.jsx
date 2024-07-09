import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { LuSwitchCamera } from "react-icons/lu";
import SalonClinic from "../components/saloondashboard/salonclinic/SalonClinic";
import UpcomingAppointment from "../components/saloondashboard/upcoming/UpcomingAppointment";
import Navbar from "../components/saloondashboard/navbar/Navbar";
import SwitchSalon from "../components/saloondashboard/switchsalon/SwitchSalon";
import { navItems } from "../data/navdata/Data";
import { getSalon } from "../api/salon.api";
import { setSalonID, setSalonImage, setSalonName, setHomeService } from "../store/auth.slice";
import Notify from "../utils/notify";
import styles from "./DashboardLayout.module.css";
import Footer from "../components/home/footer/Footer";
import Skeleton from '@mui/material/Skeleton';

const DashboardLayout = () => {
  const [showContent, setShowContent] = useState(false);
  const [salons, setSalons] = useState([]);
  const [selectedSalon, setSelectedSalon] = useState({
    name: "",
    mainGateImageUrl: "",
    id: "",
    homeService: "",
  });
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [imageLoading, setImageLoading] = useState(true); // State for salon image loading
  const dispatch = useDispatch();
  const switchSalonRef = useRef(null);

  const toggleContent = () => setShowContent(prevShowContent => !prevShowContent);

  const fetchSalons = async () => {
    try {
      const response = await getSalon();
      const salons = response?.data || [];
      setSalons(salons);

      const storedSalon = JSON.parse(localStorage.getItem("selectedSalon"));
      if (storedSalon) {
        setSelectedSalon(storedSalon);
        dispatch(setSalonID({ salonId: storedSalon.id }));
        dispatch(setSalonName({ salonName: storedSalon.name }));
        dispatch(setSalonImage({ salonImage: storedSalon.mainGateImageUrl }));
        dispatch(setHomeService({ homeService: storedSalon.homeService }));
      } else if (salons.length > 0) {
        const { name, mainGateImageUrl, id, homeService } = salons[0];
        const initialSalon = { name, mainGateImageUrl, id, homeService };
        setSelectedSalon(initialSalon);
        localStorage.setItem("selectedSalon", JSON.stringify(initialSalon));
        dispatch(setSalonID({ salonId: id }));
        dispatch(setSalonName({ salonName: name }));
        dispatch(setSalonImage({ salonImage: mainGateImageUrl }));
        dispatch(setHomeService({ homeService }));
      }
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      Notify.error(error.message);
      setLoading(false); // Ensure loading is set to false on error as well
    }
  };

  useEffect(() => {
    fetchSalons();
  }, []);

  useEffect(() => {
    if (selectedSalon.mainGateImageUrl) {
      const image = new Image();
      image.onload = () => {
        setImageLoading(false);
      };
      image.src = selectedSalon.mainGateImageUrl;
    }
  }, [selectedSalon]);

  const handleSelectSalon = (name, image, id, homeService) => {
    const newSelectedSalon = { name, mainGateImageUrl: image, id, homeService };
    setSelectedSalon(newSelectedSalon);
    localStorage.setItem("selectedSalon", JSON.stringify(newSelectedSalon));
    dispatch(setSalonID({ salonId: id }));
    dispatch(setSalonName({ salonName: name }));
    dispatch(setSalonImage({ salonImage: image }));
    dispatch(setHomeService({ homeService }));

    setShowContent(false);
    setImageLoading(true); // Reset image loading state
  };

  return (
    <>
      <Navbar data={navItems} />
      <div className={styles.container}>
        {loading ? (
          // Skeleton loading effect for the main content
          <div className={styles.mainDiv}>
            {imageLoading ? (
              <Skeleton variant="rect" width={300} height={200} animation="wave" />
            ) : (
              <div className="d-flex align-items-center justify-content-center">
                <img
                  src={selectedSalon.mainGateImageUrl}
                  alt={selectedSalon.name}
                  className={styles.salonImage}
                />
              </div>
            )}
            <div className={styles.secDiv}>
              <ul>
                <li className={styles.listOne} onClick={toggleContent}>
                  <LuSwitchCamera />
                  <span className={styles.spanOne}>Switch or add salon here</span>
                </li>
                <li>
                  {selectedSalon.name && (
                    <p className={styles.span}>{selectedSalon.name}</p>
                  )}
                </li>
              </ul>
              {showContent && (
                <div ref={switchSalonRef} className="NewSalon">
                  <SwitchSalon
                    salons={salons}
                    show={showContent}
                    updatedData={fetchSalons}
                    selectedSalonId={selectedSalon.id}
                    onSelectSalon={handleSelectSalon}
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          // Actual content when loading is complete
          <div className={styles.mainDiv}>
            <div className="d-flex align-items-center justify-content-center">
              <img
                src={selectedSalon.mainGateImageUrl}
                alt={selectedSalon.name}
                className={styles.salonImage}
              />
            </div>
            <div className={styles.secDiv}>
              <ul>
                <li className={styles.listOne} onClick={toggleContent}>
                  <LuSwitchCamera />
                  <span className={styles.spanOne}>Switch or add salon here</span>
                </li>
                <li>
                  {selectedSalon.name && (
                    <p className={styles.span}>{selectedSalon.name}</p>
                  )}
                </li>
              </ul>
              {showContent && (
                <div ref={switchSalonRef} className="NewSalon">
                  <SwitchSalon
                    salons={salons}
                    show={showContent}
                    updatedData={fetchSalons}
                    selectedSalonId={selectedSalon.id}
                    onSelectSalon={handleSelectSalon}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        <Row className="mt-2">
          <Col xl={8}>
            <SalonClinic selectedSalon={selectedSalon} />
          </Col>
          <Col xl={4}>
            <UpcomingAppointment selectedSalon={selectedSalon} />
          </Col>
        </Row>
      </div>
      <Footer />
    </>
  );
};

export default DashboardLayout;
