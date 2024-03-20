import { Row, Col, Container } from "react-bootstrap";
import mobile from "../../../assets/image/mobile.webp";
import styles from "../registration/Registration.module.css";
const Registration = () => {
  return (
    <main className={styles.main}>
      <Container>
        <Row className="d-flex align-items-center mb-5 mt-5">
          <div className={`${styles.mainDiv}  align-items-center`}>
            <Col md={6} className="d-flex justify-content-center">
              <div className={styles.praOne}>
                <p>
                &quot;Joining <strong>Stylrax</strong> is simple. Complete
                  <br /> our easy <strong>Registration</strong> process to{" "}
                  <br />
                  unlock a world of opportunities for
                  <br /> your <strong>freelance or salon business</strong>. Get
                  <br />
                  started on your journey to success <br />
                  today!&quot;
                </p>
              </div>
            </Col>
            <Col md={6} className="d-flex justify-content-center">
              <div>
                <img src={mobile} alt="login-image" className={styles.mobile} />
              </div>
            </Col>
          </div>
        </Row>
      </Container>
    </main>
  );
};

export default Registration;
