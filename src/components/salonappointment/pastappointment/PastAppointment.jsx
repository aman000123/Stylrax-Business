import {Row, Col } from "react-bootstrap";
import { appointments} from "../../../data/appointment/Appointment";
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { GrFormLocation } from "react-icons/gr";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import main from "../pastappointment/PastAppointment.module.css";
import { useEffect, useState } from 'react';
import { completedAppointments } from "../../../api/appointments.api";
import Session from "../../../service/session";
import Notify from "../../../utils/notify";

const PastAppointment = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [completed, setCompleted] = useState([]);
  const salonId = Session.get('salonId')
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  useEffect(()=>{
    const appointments = async()=>{
      try {
        const response = await completedAppointments(salonId);
        const completed = response.data;
        console.log("completed::>",completed)
        setCompleted(completed);
      } catch (error) {
        Notify.error(error.message);
      }
    };
    appointments();
  }, [salonId])
  return (
    <div>
     
      <Row className={main.mainDiv}>
        <Col md={12} lg={4} >
          <div className={main.DatePicker}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={selectedDate}
                onChange={handleDateChange}
                renderInput={(params) => <input {...params} />} 
              />
            </LocalizationProvider>
          </div>
        <div className={main.calendar}>
      
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <p className={main.date}>{selectedDate.format(' D MMMM , YYYY')}</p>
       
      <DateCalendar
      
       value={selectedDate}
       onChange={handleDateChange}
       title={selectedDate.format('MMMM YYYY')}
       className={main.customDateCalendar}
      />
     
    </LocalizationProvider>
    
        </div>
        </Col>
        <Col  md={12} lg={8} sm={12}   className={main.userDiv}>
        
          <Row>
            {completed.slice(0,12).map((appointment, index) => (
              <Col md={5} sm={5} xs={5}  key={index} className='me-4'>
                <Row className="mb-2">
                  <div className={main.userInfo}>
                    <Col md={4}>
                      <div>
                        <img
                           //src={appointment.userImage}
                           src={appointment.user.profileImageUrl}
                          className={main.userImage}
                          alt="User"
                        />
                      </div>
                    </Col>
                    <Col md={3}>
                      <p className={main.user}>
                        <span className={main.userName}>
                          `{`${appointment.user.firstName} ${appointment.user.lastName}`}
                        </span>
                        <br />
                        <span>{appointment.service}</span>
                        <br />
                        <span>{appointment.startTime}<span className={main.gender}>{appointment.serviceType}</span></span>                        <br />
                        <span>{appointment.date}</span>&nbsp;
                          {/* <span className={main.locationDistance}><GrFormLocation className={main.location}/>1.5km</span> */}
                      </p>
                      {/* <button className={main.accept}>Accept</button> */}
                    </Col>
                    <Col md={2}>
                      {/* <p className={main.payment}>
                        {appointment.paymentAmount}
                        <br />
                        <span>Payment</span>
                        <br />
                        <span className={main.paymentType}>
                          {appointment.paymentType}
                        </span>
                      </p> */}
                     
                      {/* <button className={main.decline}>Decline</button> */}
                    </Col>
                    <Col md={3}>
                    <div className={main.status}>
                        {appointment.status}<br/>
                        <Link>View Details</Link>
                      </div>
                      
                    </Col>
                    
                  </div>
                </Row>
              </Col>
              
            ))}
            </Row>
         
        </Col> 
       </Row>
     
    </div>
  );
}

export default PastAppointment;
