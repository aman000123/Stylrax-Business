import {Col} from "react-bootstrap";
import styles from "../../home/loginpage/Login.module.css";
const Login = () => {
  return (
    <Col md={6} className="d-flex justify-content-center">
    <div className={`${styles.info} text-white`}>
      {/* <h3 className={styles.text}>Lorem lpsum</h3> */}
      <h4 className={styles.textOne}>
        {/* Increase your earnings,
        <br /> gain respect, and rest
        <br /> assured of your safety. */}
        Connect, Grow and Expand With Stylrax, Safely.
      </h4>
      <p className={styles.pra}>
        {/* Lorem ipsum dolor sit amet, consectetur adipiscing <br />
        elit, sed do eiusmod tempor incididunt ut labore <br />
        Lorem ipsum dolor sit amet.{" "} */}
        Gain access to a pool of customers near your location!
      </p>
    </div>
  </Col>

  );
}

export default Login;
