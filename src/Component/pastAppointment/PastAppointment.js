import React from 'react';
import {Row, Col } from "react-bootstrap";
//import styles from "../../assets/scss/pages/home/salonAppointment.module.css";
import { appointments} from "../salonAppointment/apointmentData";
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import main from "./PastAppointment.module.css";
import { useState } from 'react';
const PastAppointment = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };
  return (
    <div>
     
      <Row>
        <Col md={4}>
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
        <Col md={8}>
        
          <Row>
            {appointments.slice(0, 12).map((appointment, index) => (
              <Col md={5} key={index} className='me-4'>
                <Row className="mb-2">
                  <div className={main.userInfo}>
                    <Col md={4}>
                      <div>
                        <img
                          src={appointment.userImage}
                          className={main.userImage}
                          alt="User"
                        />
                      </div>
                    </Col>
                    <Col md={3}>
                      <p className={main.user}>
                        <span className={main.userName}>
                          {appointment.name}
                        </span>
                        <br />
                        <span>{appointment.service}</span>
                        <br />
                        <span>{appointment.time}</span>
                        <br />
                        <span>{appointment.location}</span>
                      </p>
                      <button className={main.accept}>Accept</button>
                    </Col>
                    <Col md={2}>
                      <p className={main.payment}>
                        {appointment.paymentAmount}
                        <br />
                        <span>Payment</span>
                        <br />
                        <span className={main.paymentType}>
                          {appointment.paymentType}
                        </span>
                      </p>
                     
                      <button className={main.decline}>Decline</button>
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
