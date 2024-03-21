import {Row, Col } from "react-bootstrap";
import styles from "../upcomingappointment/UpComing.module.css";
import { appointments} from "../../../data/appointment/Appointment";
import { GrFormLocation } from "react-icons/gr";
const UpComingAppointment = () => {
  return (
    <Row>
         {appointments.slice(0, 10).map((appointment, index) => (
                <Col md={4} sm={6} xs={6} key={index}>
                  <Row className="mb-2">
                    <div className={styles.userInfo}>
                      <Col md={4}>
                        <div>
                          <img
                            src={appointment.userImage}
                            className={styles.userImage}
                            alt="User"
                          />
                        </div>
                      </Col>
                      <Col md={4}>
                        <p className={styles.user}>
                          <span className={styles.userName}>
                            {appointment.name}
                          </span>
                          <br />
                          <span>{appointment.service}</span>
                          <br />
                          <span>{appointment.time} <span className={styles.gender}>Male</span></span>

                          <br />
                          <span>{appointment.location}</span>
                          <span className={styles.locationDistance}><GrFormLocation className={styles.location}/>1.5km</span>

                        </p>
                        {/* <button className={styles.accept}>Accept</button> */}
                      </Col>
                      <Col md={4}>
                        <p className={styles.payment}>
                          {appointment.paymentAmount}
                          <br />
                          <span className={styles.paymentInfo}>Payment</span>
                          <br />
                          <span className={styles.paymentType}>
                            {appointment.paymentType}
                          </span>
                        </p>
                        {/* <button className={styles.decline}>Decline</button> */}
                      </Col>
                    </div>
                  </Row>
                </Col>
              ))}
            </Row>
  );
}

export default UpComingAppointment;
