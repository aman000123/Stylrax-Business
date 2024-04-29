import { Row, Col, Container } from "react-bootstrap";
import client1 from "../../../assets/image/client1.svg";
import client2 from "../../../assets/image/client2.svg";
import client3 from "../../../assets/image/client3.svg";
import client4 from "../../../assets/image/client4.svg";
import client5 from "../../../assets/image/client5.svg";
import styles from "../overview/Overview.module.css";
const Overview = () => {
  return (
    <main className={styles.main}>
      <Container>
        <Row className="align-items-center d-flex ">
          <div className={styles.mainDiv}>
            <img src={client2} alt="client-img" className={styles.clientTwo} />
            <img src={client4} alt="client-img" className={styles.clientFour} />
            <img src={client5} alt="client-img" className={styles.clientFive} />
            <Col md={12} className="d-flex justify-content-center">
              <p
                className={`${styles.info} d-flex text-center justify-content-center text-white`}
              >
                {/* Stylrax, the Ultimate platform for <br />
                freelancers and Salon owners to showcase <br />
                their skills and connect with clients.
                <br /> Empower your business with our innovative <br />
                solutions. */}
                With its streamlined process and <br />comprehensive sales overview,
                Stylrax stands <br />as the ultimate platform for salon<br /> professionals
                like you!
              </p>
            </Col>
            <img src={client1} alt="client-img" className={styles.clientOne} />
            <img
              src={client3}
              alt="client-img"
              className={styles.clientThree}
            />
          </div>
        </Row>
      </Container>
    </main>
  );
};

export default Overview;
