import React from 'react';
import { Row, Col, Container } from "react-bootstrap";
import TeamGuide from "../../assets/image/guideTeam.png";
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import styles from "../../assets/scss/pages/home/Team.module.css";
const Team = () => {
  return (
   <main className={styles.main}>
    <Container className={styles.container}>
    <Row className='d-flex align-items-center'>
      <Col md={8}className="d-flex justify-content-center">
      <div className={styles.query}>
        <p className={styles.info}>
        "Have questions or need assistance? Contact our support team at <br/>+91- 9876543210. 
         We're here to help you make the most of your <br/>experience with Stylrax."
        </p>
        <div className={styles.mainText}>
          <PersonRoundedIcon className={`${styles.helperIcon} me-1`}/>
          <p className={styles.ask}>
          <span className={styles.span}> Need Help ?</span> <br/> Connect with Lorem ipsum Now
          </p>
        </div>
      </div>
      </Col>
      <Col md={4}className="d-flex justify-content-center">
        <div className={styles.img}>
          <img src={TeamGuide} alt='Team img'className={styles.teamImg}/>
        </div>
      </Col>
    </Row>
    </Container>
   </main>
  );
}

export default Team;
