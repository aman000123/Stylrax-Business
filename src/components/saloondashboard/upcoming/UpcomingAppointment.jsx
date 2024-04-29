import styles from "./UpcomingAppointment.module.css";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import stylistimg1 from "../../../assets/image/stylistimg1.png";
import { Paper } from '@mui/material';
import { FaCalendarDays } from "react-icons/fa6";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";



let data = [
  {
    imgsrc: stylistimg1,
    textOne: "Raj Shakya",
    textTwo: "Hair Styling",
    textThree: "10:30 - 11:30",
    price: "1900Rs"
  },

  {
    imgsrc: stylistimg1,
    textOne: "Raj Shakya",
    textTwo: "Hair Styling",
    textThree: "10:30 - 11:30",
    price: "1900Rs"
  },

  {
    imgsrc: stylistimg1,
    textOne: "Raj Shakya",
    textTwo: "Hair Styling",
    textThree: "10:30 - 11:30",
    price: "1900Rs"
  },

  {
    imgsrc: stylistimg1,
    textOne: "Raj Shakya",
    textTwo: "Hair Styling",
    textThree: "10:30 - 11:30",
    price: "1900Rs"
  },

  {
    imgsrc: stylistimg1,
    textOne: "Raj Shakya",
    textTwo: "Hair Styling",
    textThree: "10:30 - 11:30",
    price: "1900Rs"
  },

  {
    imgsrc: stylistimg1,
    textOne: "Raj Shakya",
    textTwo: "Hair Styling",
    textThree: "10:30 - 11:30",
    price: "1900Rs"
  },

  {
    imgsrc: stylistimg1,
    textOne: "Raj Shakya",
    textTwo: "Hair Styling",
    textThree: "10:30 - 11:30",
    price: "1900Rs"
  },

  {
    imgsrc: stylistimg1,
    textOne: "Raj Shakya",
    textTwo: "Hair Styling",
    textThree: "10:30 - 11:30",
    price: "1900Rs"
  },

  {
    imgsrc: stylistimg1,
    textOne: "Raj Shakya",
    textTwo: "Hair Styling",
    textThree: "10:30 - 11:30",
    price: "1900Rs"
  },

  
  {
    imgsrc: stylistimg1,
    textOne: "Raj Shakya",
    textTwo: "Hair Styling",
    textThree: "10:30 - 11:30",
    price: "1900Rs"
  },

]

const item = [
  {
    day: "Sun",
    date: 1
  },

  {
    day: "Mon",
    date: 2
  },

  {
    day: "Tue",
    date: 3
  },

  {
    day: "Wed",
    date: 4
  },

  {
    day: "Thu",
    date: 5
  },

  {
    day: "Fri",
    date: 6
  },

  {
    day: "Sat",
    date: 7
  },
  {
    day: "Sun",
    date: 8
  },

  {
    day: "Mon",
    date: 9
  },

  {
    day: "Tue",
    date: 10
  },

  {
    day: "Wed",
    date: 11
  },

  {
    day: "Wed",
    date: 12
  },

  {
    day: "Wed",
    date: 13
  },

  {
    day: "Wed",
    date: 14
  },

  {
    day: "Wed",
    date: 15
  },

  {
    day: "Wed",
    date: 16
  },

  {
    day: "Wed",
    date: 17
  },

  {
    day: "Wed",
    date: 18
  },
  {
    day: "Wed",
    date: 19
  },

  {
    day: "Wed",
    date: 20
  },

  {
    day: "Wed",
    date: 21
  },

  {
    day: "Wed",
    date: 22
  },
]



function UpcomingAppointment() {

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    arrows: false,
    // slick-next: null, // Removes the previous arrow
    // slick-prev: null, // Removes the next arrow
    responsive: [
      {
        breakpoint: 1252,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: false
        }
      },

      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 10,
          slidesToScroll: 10,
          infinite: true,
          dots: false
        }
      },

      {
        breakpoint: 835,
        settings: {
          slidesToShow: 8,
          slidesToScroll: 8,
          infinite: true,
          dots: false
        }
      },

      {
        breakpoint: 692,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
          initialSlide: 2,
          dots: false
        }
      },

      {
        breakpoint: 562,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          initialSlide: 2,
          dots: false
        }
      },

      {
        breakpoint:432,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          initialSlide: 2,
          dots: false
        }
      },

      {
        breakpoint:354,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 2,
          dots: false
        }
      },

    ]
  };

  const [currentMonth, setCurrentMonth] = useState('January');
  const [currentYear, setCurrentYear] = useState(2018);

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const goToPreviousMonth = () => {
    const currentMonthIndex = months.indexOf(currentMonth);
    if (currentMonthIndex === 0) {
      setCurrentMonth('December');
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(months[currentMonthIndex - 1]);
    }
  };

  const goToNextMonth = () => {
    const currentMonthIndex = months.indexOf(currentMonth);
    if (currentMonthIndex === 11) {
      setCurrentMonth('January');
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(months[currentMonthIndex + 1]);
    }
  };

  // Using useState to change the color of button
  const [selectedDate, setSelectedDate] = useState(null);

  const handleButtonClick = (value) => {
    setSelectedDate(value.date);
  }
  return (
    <div className={styles.primaryDiv}>
      <div className={styles.mainDiv} >
        <div className={styles.text}>
          <p>Upcoming Appointments</p>
        </div>

        <div className={styles.calendar}>
          <div className={styles.monthYear}>
            <FaCalendarDays className={styles.calIcon} />
            <span>{currentMonth}</span>
            <span>{currentYear}</span>
          </div>

          <div className={styles.nav}>
            <KeyboardArrowLeftIcon onClick={goToPreviousMonth} />
            <KeyboardArrowRightIcon onClick={goToNextMonth} />
          </div>
        </div>

        {/* Slider */}

        <Slider {...settings}>
          {item.map((value) => (
            <div className={styles.reactslider} key={value.date}>
              <button onClick={() => handleButtonClick(value)} className={selectedDate === value.date ? styles.buttonClicked : ''}>
                <div className={`${styles.paperone} ${selectedDate === value.date ? styles.paperClicked : ''}`}>
                  <p>
                    <span className={styles.days}>
                      {value.day}
                    </span><br />
                    <span className={styles.date}>
                      {value.date}
                    </span>
                  </p>
                </div>
              </button>
            </div>
          ))}
        </Slider>

        <div className={styles.appointmentDiv}>
          {
            data.map((value) => (
                <Paper className={styles.paper}>
                  <div className={styles.appointmentdetails}>
                    <div className={styles.content}>
                      <div className={styles.imgDiv}>
                        <img src={value.imgsrc} alt=''/>
                      </div>

                      <div className={styles.details}>
                        <p>{value.textOne}<br />
                          <span className={styles.spanOne}>{value.textTwo}</span><br />
                          <span className={styles.spanTwo}>{value.textThree}</span>
                        </p>
                      </div>
                    </div>


                    {/* <div>At Home</div> */}

                    <div className={styles.horizonIcon}>
                      <MoreHorizIcon className={styles.dots} />
                      <p>{value.price}</p>
                    </div>

                  </div>
                </Paper>
            ))
          }
        </div>
      </div>

      <h6 className={styles.view}>View All</h6>
    </div>
  )
}

export default UpcomingAppointment;
