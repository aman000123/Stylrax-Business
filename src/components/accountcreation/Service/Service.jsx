import  { useState } from "react";
import { Container } from "react-bootstrap";
import styles from "./Service.module.css";
const Service = ({ nextStep,setSelectedService }) => {
  const [activeButton] = useState(null);
 
 
  const handleSalon = () => {
    setSelectedService("Salon");
    nextStep(); 
  };
  const handleFreelancer = () => {
    setSelectedService("Freelancer");
    nextStep(); 
  };
  return (
    <Container>
      <div className="d-flex flex-column align-items-center">
        <div className={styles.form}>
          <p className={styles.main}>
            Lorem ipsum dolor sit amet, consectetur adipiscing <br />
            elit, sed do eiusmod tempor incididunt ut labore{" "}
          </p>
          <div className="d-flex flex-column align-items-center">
            <button
              type="button"
              onClick={handleSalon}
              className={`${styles.button} ${
                activeButton === "salon" ? styles.activeButton : ""
              }`}
            >
              Salon
            </button>
            <button
              type="button"
              onClick={handleFreelancer}
              className={`${styles.btn} ${
                activeButton === "freelancer" ? styles.activeButton : ""
              }`}
            >
              Freelancer
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Service;
