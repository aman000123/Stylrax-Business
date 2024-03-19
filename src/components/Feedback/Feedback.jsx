import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import star from "../../assets/image/star.png";
import styles from "../../assets/scss/pages/home/Feedback.module.css";
const Feedback = () => {
  return (
    <main className={styles.main}>
      <img src={star} alt="star-image" className={styles.starImage} />
      <img src={star} alt="star-image" className={styles.star} />
      <Container>
        <Row className="align-items-center d-flex mt-5 mb-5">
          <Col md={12} className="d-flex justify-content-center">
            <div className={styles.mainSection}>
              <p className={styles.pra}>
                "Trust is at the core of Stylrax. Our thorough verification
                process
                <br /> ensures a safe and secure environment for both
                professionals
                <br /> and clients. Build your reputation and trust with our
                trusted
                <br /> community."
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Feedback;
