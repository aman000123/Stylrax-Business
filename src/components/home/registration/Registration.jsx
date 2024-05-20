import { Row, Col, Container } from "react-bootstrap";
import mobile from "../../../assets/image/mobile.webp";
import styles from "../registration/Registration.module.css";
const Registration = () => {
  return (
    <main className={styles.main}>
      <Container>
        <Row className="d-flex align-items-center mb-5">
          <div className={`${styles.mainDiv}  align-items-center d-flex`}>
            <Col md={6} className="d-flex justify-content-center">
              <div className={styles.praOne}>
                <p>
                  &quot;Joining <strong>Stylrax</strong> is simple, easy and fast! Complete
                  our easy <strong>Registration</strong> process to
                  unlock a world of opportunities for
                   your <strong>salon business</strong>. Get
                  started on your journey to success
                  today!&quot;
                  {/* &quot;Joining Stylrax is simple, easy and fast! Complete our easy
                  registration process to unlock a world of opportunities for
                  your salon business. Get started on your journey to success
                  today!&quot; */}
                </p>
              </div>
            </Col>
            <Col md={6} className="d-flex justify-content-end">
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
