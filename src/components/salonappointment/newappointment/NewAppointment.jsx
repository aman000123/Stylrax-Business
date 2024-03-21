import { useState } from "react";
import hair from "../../../assets/image/hair.png";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./NewAppointment.module.css";
import { appointments, assign } from "../../../data/appointment/Appointment";
import PastAppointment from "../pastappointment/PastAppointment";
import UpComingAppointment from "../upcomingappointment/UpComingAppointment";
import Ongoing from "../ongoingappointment/Ongoing";
import { GrFormLocation } from "react-icons/gr";
const NewAppointment = () => {
  const [activeButton, setActiveButton] = useState("button4");
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };
  return (
    <main>
      <Container>
        <div className={styles.mainDiv}>
          <img src={hair} className={styles.hair} alt="Hair" />
          <p className={styles.hairClinic}>
            HairClinic
            <span className={styles.info}>
              {" "}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore
            </span>
          </p>
        </div>
        <div className={styles.btnDiv}>
          <p>Appointments</p>
          <button
            onClick={() => handleButtonClick("button1")}
            className={activeButton === "button1" ? styles.active : ""}
          >
            Ongoing
          </button>
          <button
            onClick={() => handleButtonClick("button2")}
            className={activeButton === "button2" ? styles.active : ""}
          >
            Upcoming
          </button>
          <button
            onClick={() => handleButtonClick("button3")}
            className={activeButton === "button3" ? styles.active : ""}
          >
            Past
          </button>
          <button
            onClick={() => handleButtonClick("button4")}
            className={activeButton === "button4" ? styles.active : ""}
          >
            New
          </button>
        </div>
        {activeButton === "button1" && <div><Ongoing/></div>}
        {activeButton === "button2" && <div><UpComingAppointment/></div>}
        {activeButton === "button3" && <div><PastAppointment/></div>}
        {activeButton === "button4" && (
          <div>
            <Row>
              {/* Render appointments for the first two rows */}
              {appointments.slice(0, 6).map((appointment, index) => (
                <Col md={4} sm={6} xs={6} key={index} className="mb-2">
                  <Row className="mb-2 d-flex" >
                    <div className={styles.userInfo}>
                      <Col  md={4}>
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
                          <span>{appointment.service}</span>&nbsp;
                          <br />
                          <span>{appointment.time} <span className={styles.gender}>Male</span></span>
                          <br />
                          <span>{appointment.location}</span>
                         <span className={styles.locationDistance}><GrFormLocation className={styles.location}/>1.5km</span>
                        </p>
                        <button className={styles.accept}>Accept</button>
                      </Col>
                      <Col md={4}>
                        <p className={styles.payment}>
                          {appointment.paymentAmount}
                          <br />
                          <span>Payment</span>
                          <br />
                          <span className={styles.paymentType}>
                            {appointment.paymentType}
                          </span>
                        </p>
                        <button className={styles.decline}>Decline</button>
                      </Col>
                    </div>
                  </Row>
                </Col>
              ))}
            </Row>
            <Row>
              {/* Render assign data in the 3rd row's 1st column */}
              <Col md={4}>
                <Row className="mb-2">
                  <div className={styles}>
                    <p className={styles.staffDiv}>Assign Staff</p>
                    <Col md={4} sm={6} xs={6}  className="mb-2">
                      <div className="d-flex">
                        {assign.map((user, imageIndex) => (
                          
                          <div
                            key={imageIndex}
                            className={`${styles.clientDiv} me-3`}
                            style={{ display: imageIndex >= 4 && window.innerWidth <= 992 ? 'none' : 'block' }}>
                            <img
                              src={user.userImage}
                              className={styles.assign}
                              alt={user.alt}
                            />
                            <p className={styles.Name}>
                              {user.name}
                              <br />
                              <span className={styles.service}>
                                Hairstylist And
                                <br /> Styling Artist
                              </span>
                            </p>
                          </div>
                        ))}
                      </div>
                    </Col>
                    <div className={styles.staffBtn}>
                      <button className={styles.assignBtn}>Assign</button>
                      <button className={styles.cancelBtn}>Cancel</button>
                    </div>
                  </div>
                </Row>
              </Col>

              {appointments.slice(6).map((appointment, index) => (
                <Col md={4} sm={6} xs={6} key={index} className="mb-2">
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
                          <span>{appointment.time}</span>
                          <br />
                          <span>{appointment.location}</span>&nbsp;
                          <span className={styles.locationDistance}><GrFormLocation className={styles.location}/>1.5km</span>

                        </p>
                        <button className={styles.accept}>Accept</button>
                      </Col>
                      <Col md={4}>
                        <p className={styles.payment}>
                          {appointment.paymentAmount}
                          <br />
                          <span>Payment</span>
                          <br />
                          <span className={styles.paymentType}>
                            {appointment.paymentType}
                          </span>
                        </p>
                        <button className={styles.decline}>Decline</button>
                      </Col>
                    </div>
                  </Row>
                </Col>
              ))}
            </Row>
          </div>
        )}
      </Container>
    </main>
  );
};

export default NewAppointment;