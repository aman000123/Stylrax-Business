import { Row, Col, Container } from "react-bootstrap";
import userThree from "../../../assets/image/userThree.png";
import userTwo from "../../../assets/image/userTwo.png";
import userOne from "../../../assets/image/userOne.png";
import logo from "../../../assets/image/logo.png";
import styles from "../comment/Comment.module.css";
const Comment = () => {
  return (
    <main className={styles.main}>
      <Container>
        <Row className="align-items-center d-flex mt-5">
          <Col md={6} className="d-flex justify-content-center">
            <div className={styles.commentDiv}>
              <img
                src={userThree}
                alt="user-image"
                className={styles.userThree}
              />
              <p className={styles.comment}>
              &quot;Freelancers, take control of <br />
                your career! With Stylrax,
                <br /> you can easily showcase
                <br /> your skills, connect with
                <br /> clients, and manage <br />
                appointments effortlessly.
                <br />
                Join our platform to
                <br /> experience a new level of <br />
                professional freedom.&quot;
              </p>
              <img src={userTwo} alt="user-image" className={styles.userTwo} />
            </div>
          </Col>
          <Col md={6} className="d-flex justify-content-center">
            <div className={styles.praTwo}>
              <img src={userOne} alt="user-image" className={styles.userOne} />
              <p className={styles.comment}>
              &quot;Salon owners, boost your <br />
                business with Stylrax. List
                <br /> your salon, attract new <br />
                clients, and streamline your <br />
                appointment booking
                <br /> process. Elevate your salon &apos; <br />
                online presence with our <br />
                tailored solutions.&quot;
              </p>
              <div className={styles.img}>
                <img src={logo} alt="user-image" className={styles.logo} />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Comment;
