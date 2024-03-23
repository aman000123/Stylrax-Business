import { useState } from "react";
import {useNavigate } from "react-router-dom";
import Details from "../accountcreation/Details";
import BusinessDetails from "../businessdetails/BusinessDetails"
import BankDetails from "../bankdetails/BankDetails";
import Finish from "../Finish/Finish";
import logo from  "../../../assets/image/logo_f.svg";
import styles from "./Stepper.module.css";
import Service from "../Service/Service";
import BusinessFreelancer from "../businessfreelancer/BusinessFreelancer";
const steps = [
  "Account Creation",
  "Business Details",
  "Bank Details",
  "Finish",
];

const Stepper = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [showServicePage, setShowServicePage] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const nextStep = () => {
    setActiveStep(activeStep + 1);
  };

  const prevStep = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSubmit = () => {
    navigate("/service");
  };

  return (
    <>
      <nav className={`${styles.nav} d-flex align-items-center`}>
        <div>
          <img src={logo} alt="Logo" className={styles.logo} />
        </div>

        <div>
          <ul className={styles.menuList}>
            {steps.map((step, index) => (
              <li key={index}>
                <span className={activeStep === index ? styles.active : ""}>
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className={styles.stepContent}>
        <>
          {activeStep === 0 && !showServicePage && (
            <Details
              nextStep={nextStep}
              setShowServicePage={setShowServicePage}
            />
          )}
          {activeStep === 0 && showServicePage && (
            <Service nextStep={nextStep} setSelectedService={setSelectedService}/>
          )}
        </>
        {activeStep === 1 && (
          <>
            {selectedService === "Salon" ? (
              <BusinessDetails nextStep={nextStep} prevStep={prevStep} />
            ) : (
              <BusinessFreelancer nextStep={nextStep} prevStep={prevStep} />
            )}
          </>
        )}
        {activeStep === 2 && (
          <BankDetails nextStep={nextStep} prevStep={prevStep} />
        )}
        {activeStep === 3 && (
          <Finish prevStep={prevStep} onSubmit={handleSubmit} />
        )}
      </div>

      <footer className={styles.footer}>
        <main className={styles.main}>
          <div className={styles.mainDiv}>
            <ul className={styles.list}>
              <li>Business</li>
              <li>Customer service</li>
              <li>Conditions of use</li>
              <li>Privacy Policy</li>
              <div>
                <p className={styles.website}>
                  © 2023-2024, Stylrax.com, Inc. or its affiliates
                </p>
              </div>
            </ul>

            <div className="">
              <img src={logo} alt="stars" className={styles.starImage} />
            </div>
          </div>
        </main>
      </footer>
    </>
  );
};

export default Stepper;
