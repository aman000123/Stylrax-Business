import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Details from '../acountDetails/Details/Details';
import BusinessDetails from '../acountDetails/BusinessDetails/BusinessDetails';
import BankDetails from '../acountDetails/BankDetails/BankDetails';
import Finish from '../acountDetails/Finish/Finish';
import logo from "../../assets/image/logo.png";
import styles from "./Account.module.css";
import Service from "../acountDetails/Service/Service";
const steps = ['Account Creation', 'Business Details', 'Bank Details', 'Finish'];

const Account = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [showServicePage, setShowServicePage] = useState(false);
  const nextStep = () => {
    setActiveStep(activeStep + 1);
  };

  const prevStep = () => {
    setActiveStep(activeStep - 1);
  };
  const goToServicePage = () => {
    navigate('/service'); // Go to the service page directly
  };
  const handleSubmit = () => {
    // Handle form submission
    navigate('/service'); // Redirect to success page after form submission
  };

  return (
    <>
      <nav className={`${styles.nav} d-flex align-items-center`}>
        <div>
          <img src={logo} alt="Logo" className={styles.logo}/>
        </div>

        <div>
          <ul className={styles.menuList}>
            {steps.map((step, index) => (
              <li key={index}>
                <span className={activeStep === index ? styles.active : ''}>{index + 1}</span>{step}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className={styles.stepContent}>
        <>
        {activeStep === 0 && !showServicePage && (
          <Details nextStep={nextStep} setShowServicePage={setShowServicePage} />
        )}
       {activeStep === 0 && showServicePage && (
          <Service nextStep={nextStep} />
)}
        </>
        {activeStep === 1 && (
          <BusinessDetails nextStep={nextStep} prevStep={prevStep} />
        )}
        {activeStep === 2 && (
          <BankDetails nextStep={nextStep} prevStep={prevStep} />
        )}
        {activeStep === 3 && (
          <Finish prevStep={prevStep} onSubmit={handleSubmit} />
        )}
      </div>
{/* <Outlet/> */}
      <footer className={styles.footer}>
        <main className={styles.main}>
          <div className={styles.mainDiv}>
            <ul className={styles.list}>
              <li>Business</li>
              <li>Customer service</li>
              <li>Conditions of use</li>
              <li>Privacy Policy</li>
              <div>
         
              <p className={styles.website}>© 2023-2024, Stylrax.com, Inc. or its affiliates</p>
            
          </div>
              
            </ul>
        
            <div className="">
              <img src={logo} alt="stars" className={styles.starImage}/>
            </div>
          </div>
        </main>
      </footer>
    </>
  );
}

export default Account;