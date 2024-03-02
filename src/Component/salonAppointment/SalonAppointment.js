// import React from 'react';
// import hair from "../../assets/image/hair.png";
// import {Container,Row,Col} from "react-bootstrap";
// import styles from "../../assets/scss/pages/home/salonAppointment.module.css";
// import appointuser1 from "../../assets/image/apointuser1.svg";

// const SalonAppointment = () => {
//   return (
//     <main>
//     <Container>
//      <div className={styles.mainDiv}>
//       <img src={hair} className={styles.hair}/>
//       <p className={styles.hairClinic}>HairClinic
//       <span className={styles.info}>  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
//         incididunt ut labore</span> </p>
//      </div>
//      <div className={styles.btnDiv}>
//       <p>Appointments</p>
//       <button>Ongoing</button>
//       <button>Upcoming</button>
//       <button>Past</button>
//       <button>New</button>
//      </div>
//     <Row>
//       <Col md={4}>
//     <Row>
//       <p className={styles.userInfo}>
//       <Col md={4}>
//         <div>
//           <img src={appointuser1} className={styles.userImage}/>
//        </div>
//       </Col>
//       <Col md={4}>
//         <p className={styles.user}>
//        <span className={styles.userName}>Alberto Raya</span><br/>
//         <span>
//         Hairstyling + 1
//         </span><br/>
//         <span>10:30 - 11:00 AM</span><br/>
//         <span>At Home</span>
//         </p>
//         <button className={styles.accept}>Accept</button>
//       </Col>
//       <Col md={4}>
//         <p className={styles.payment}>
//         100₹<br/>
//         <span>Payment</span><br/>
//         <span>Online</span>
//         </p>
//         <button className={styles.decline}>Decline</button>
//       </Col>
// </p>
// </Row>
   
//       </Col>
     
//       <Col md={4}>
//       <p className={styles.userInfo}>
//       <Col md={4}>
//         <div>
//           <img src={appointuser1} className={styles.userImage}/>
//        </div>
//       </Col>
      
     
//       <Col md={4}>
//         <p className={styles.user}>
//        <span className={styles.userName}>Alberto Raya</span><br/>
//         <span>
//         Hairstyling + 1
//         </span><br/>
//         <span>10:30 - 11:00 AM</span><br/>
//         <span>At Home</span>
//         </p>
//         <button className={styles.accept}>Accept</button>
//       </Col>
//       <Col md={4}>
//         <p className={styles.payment}>
//         100₹<br/>
//         <span>Payment</span><br/>
//         <span>Online</span>
//         </p>
//         <button className={styles.decline}>Decline</button>
//       </Col> 
//       </p>
//       </Col>
//       <Col md={4}>
//       <p className={styles.userInfo}>
//       <Col md={4}>
//         <div>
//           <img src={appointuser1} className={styles.userImage}/>
//        </div>
//       </Col>
      
     
//       <Col md={4}>
//         <p className={styles.user}>
//        <span className={styles.userName}>Alberto Raya</span><br/>
//         <span>
//         Hairstyling + 1
//         </span><br/>
//         <span>10:30 - 11:00 AM</span><br/>
//         <span>At Home</span>
//         </p>
//         <button className={styles.accept}>Accept</button>
//       </Col>
//       <Col md={4}>
//         <p className={styles.payment}>
//         100₹<br/>
//         <span>Payment</span><br/>
//         <span>Online</span>
//         </p>
//         <button className={styles.decline}>Decline</button>
//       </Col> 
//       </p>
//       </Col>
      
//       </Row>
      
      
    
     
      
   
    
     
      
     
     
     
//     </Container>
    
//     </main>
//   );
// }

// export default SalonAppointment;




import React from 'react';
import hair from "../../assets/image/hair.png";
import { Container, Row, Col } from "react-bootstrap";
import styles from "../../assets/scss/pages/home/salonAppointment.module.css";
import { appointments } from './apointmentData';
const SalonAppointment = () => {
  

  return (
    <main>
      <Container>
        <div className={styles.mainDiv}>
          <img src={hair} className={styles.hair} alt="Hair" />
          <p className={styles.hairClinic}>HairClinic
            <span className={styles.info}>  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
              incididunt ut labore</span>
          </p>
        </div>
        <div className={styles.btnDiv}>
          <p>Appointments</p>
          <button>Ongoing</button>
          <button>Upcoming</button>
          <button>Past</button>
          <button>New</button>
        </div>
        <Row>
          {/* Map over appointments array */}
          {appointments.map((appointment, index) => (
            <Col md={4} key={index}>
              <Row className='mb-2'>
                <div className={styles.userInfo}>
                  <Col md={4}>
                    <div>
                      <img src={appointment.userImage} className={styles.userImage} alt="User" />
                    </div>
                  </Col>
                  <Col md={4}>
                    <p className={styles.user}>
                      <span className={styles.userName}>{appointment.name}</span><br />
                      <span>{appointment.service}</span><br />
                      <span>{appointment.time}</span><br />
                      <span>{appointment.location}</span>
                    </p>
                    <button className={styles.accept}>Accept</button>
                  </Col>
                  <Col md={4}>
                    <p className={styles.payment}>
                      {appointment.paymentAmount}<br />
                      <span>Payment</span><br />
                      <span className={styles.paymentType}>{appointment.paymentType}</span>
                    </p>
                    <button className={styles.decline}>Decline</button>
                  </Col>
                </div>
              </Row>
            </Col>
          ))}
        </Row>
      </Container>
    </main>
  );
}

export default SalonAppointment;
