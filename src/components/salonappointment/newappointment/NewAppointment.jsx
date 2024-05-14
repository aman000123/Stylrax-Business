import { useState } from "react";
import hair from "../../../assets/image/hair.png";
import { Container, } from "react-bootstrap";
import styles from "./NewAppointment.module.css";
import PastAppointment from "../pastappointment/PastAppointment";
import UpComingAppointment from "../upcomingappointment/UpComingAppointment";
import Ongoing from "../ongoingappointment/Ongoing";
import Navbar from "../../saloondashboard/navbar/Navbar";
import { navItems } from "../../../data/navdata/Data";
const NewAppointment = () => {
  const [activeButton, setActiveButton] = useState("button3");
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };
  return (
    <main>
        <Navbar data={navItems}/>
      <Container>
        <div className={styles.mainDiv}>
          <img src={hair} className={styles.hair} alt="Hair" />
          <p className={styles.hairClinic}>
            HairClinic
            <span className={styles.info}>
              {" "}
              Convenient and personalized hair grooming and styling solutions, just for you.
            </span>
          </p>
        </div>
        <div className={styles.btnDiv}>
          <p>Appointments</p>
          <button
            onClick={() => handleButtonClick("button1")}
            className={activeButton === "button1" ? styles.active : ""}
          >
            Cancelled
          </button>
          <button
            onClick={() => handleButtonClick("button2")}
            className={activeButton === "button2" ? styles.active : ""}
          >
            Pending
          </button>
          <button
            onClick={() => handleButtonClick("button3")}
            className={activeButton === "button3" ? styles.active : ""}
          >
            Completed
          </button>
        </div>
        {activeButton === "button1" && <div><Ongoing/></div>}
        {activeButton === "button2" && <div><UpComingAppointment/></div>}
        {activeButton === "button3" && (
         <PastAppointment/>
        )}
      </Container>
    </main>
  );
};

export default NewAppointment;