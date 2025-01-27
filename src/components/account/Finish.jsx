import { startTransition } from "react";
import styles from "./account.module.css";
import { useNavigate } from "react-router-dom";
const Finish = () => {
  const navigate = useNavigate();
  const handleButton = () => {
    startTransition(() => {
      navigate('/home');
    });
  };
  return (
    <main>
      <div className="d-flex flex-column align-items-center">
        <div className={styles.registration__finish_container}>
          {/* <p>
            We’re Verifying Your Details
            <br />
            And it’ll take 2 to 3 day to Process.
            <br />
            You will be able to proceed further
            <br /> once the verification is completed

          </p> */}
                    <p>
                    We are verifying your details,which will 
            <br />
            take 2 to 3 days to process. You can 
            <br />
            proceed once the verification is 
            <br /> completed.
            
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
