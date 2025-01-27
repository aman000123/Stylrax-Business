import { Row, Col } from "react-bootstrap";
import TeamGuide from "../../../assets/image/guideTeam.png";
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import styles from "../team/Team.module.css";
const Team = () => {
  return (
    <main className={styles.main}>
      <Row className='d-flex align-items-center'>
        <Col md={8} className="d-flex justify-content-center">
          <div className={styles.query}>
            <p className={styles.info}>
              Have questions or need assistance? Contact our support team at <br />+91- 8700882039.
              We &apos;re here to help you make the most of your <br />experience with Stylrax.
            </p>
            <div className={styles.mainText}>
              <PersonRoundedIcon className={`${styles.helperIcon} me-4`} />
              <p className={styles.ask}>
                <span className={styles.span}> Need Help ?</span> <br /> Connect with our expert.
              </p>
            </div>
          </div>
        </Col>
        <Col md={4} className="d-flex justify-content-center">
          <div className={styles.img}>
            <img src={TeamGuide} alt='Team img' className={styles.teamImg} />
          </div>
        </Col>
      </Row>
    </main>
  );
}

export default Team;
