import  { useState } from "react";
import { Container } from "react-bootstrap";
import styles from "./Service.module.css";
import PropTypes from 'prop-types';
const Service = ({ nextStep,setSelectedService }) => {
  Service.propTypes = {
    setSelectedService: PropTypes.func.isRequired,
    nextStep: PropTypes.func.isRequired,
  };
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
