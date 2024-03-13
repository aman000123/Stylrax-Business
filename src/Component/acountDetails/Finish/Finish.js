import React, { startTransition } from "react";
import styles from "./Finish.module.css";
import { useNavigate } from "react-router-dom";
const Finish = () => {
  const navigate = useNavigate();
  const handleButton = () => {
    startTransition(() => {
      navigate('/salon-dashboard');
    });
  };
  return (
    <main>
      <div className="d-flex flex-column align-items-center">
        <div className={styles.form}>
          <p>
            We’re Verifying Your Details
            <br />
            And it’ll take 2 to 3 day to Process.
            <br />
            You will be able to proceed further
            <br /> once the verification is completed
          </p>
          <div className={`${styles.btn} d-flex flex-column align-items-center`}>
            <button className={styles.continue} onClick={handleButton}>Continue</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Finish;
