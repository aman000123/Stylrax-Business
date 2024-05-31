import styles from "./UpcomingAppointment.module.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Paper } from "@mui/material";
import { FaCalendarDays } from "react-icons/fa6";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Session from "../../../service/session";
import { ongoingAppointments } from "../../../api/appointments.api";
import Notify from "../../../utils/notify";

const generateUpcomingWeek = () => {
  const today = new Date();
  const upcomingWeek = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    upcomingWeek.push({
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      date: date.getDate(),
      fullDate: date.toISOString().split("T")[0],
    });
  }
  return upcomingWeek;
};

function UpcomingAppointment() {
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split("T")[0];
  const currentDay = currentDate.getDate();
  const currentDayOfWeek = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
  });
  const formattedCurrentDate = ` ${currentDate.toLocaleString(
    "default",
    { month: "long" }
  )} ${currentDate.getFullYear()}`;

  const [ongoing, setOngoing] = useState([]);
  const [selectedDate, setSelectedDate] = useState(formattedDate);
  const [showNoAppointments, setShowNoAppointments] = useState(false);

  const salonId = Session.get("salonId");

  const fetchAppointments = async (date) => {
    try {
      const response = await ongoingAppointments(salonId, date);
      return response.data;
    } catch (error) {
      Notify.error(error.message);
      return [];
    }
  };

  useEffect(() => {
    const initFetch = async () => {
      if (salonId) {
        const initialAppointments = await fetchAppointments(formattedDate);
        setOngoing(initialAppointments);
        setShowNoAppointments(initialAppointments.length === 0);
      } else {
        Notify.error("Invalid salon ID");
      }
    };
    initFetch();
  }, [salonId, formattedDate]);



  const handleButtonClick = async (value) => {
    if (salonId) {
      const appointments = await fetchAppointments(value.fullDate);
      setSelectedDate(value.fullDate);
      setOngoing(appointments);
      if (value.fullDate === formattedDate) {
        setShowNoAppointments(appointments.length === 0);
      } else {
        setShowNoAppointments(false);
      }
    } else {
      Notify.error("Invalid salon ID");
    }
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 7,
    initialSlide: 0,
    arrows: false,
    responsive: [
      {
        breakpoint: 1252,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 8,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 8,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 8,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
    ],
  };

  return (
    <div className={styles.primaryDiv}>
      <div className={styles.mainDiv}>
        <div className={styles.text}>
          <p>Upcoming Appointments</p>
        </div>

        <div className={styles.calendar}>
          <div className={styles.monthYear}>
            <FaCalendarDays className={styles.calIcon} />
          </div>
          <div className={styles.todayDate}>
            <span className="fw-bold">{formattedCurrentDate}</span>
          </div>
          <div className={styles.nav}>
            <KeyboardArrowLeftIcon
              onClick={() => console.log("Previous month")}
            />
            <KeyboardArrowRightIcon onClick={() => console.log("Next month")} />
          </div>
        </div>

        <Slider {...settings}>
          {generateUpcomingWeek().map((value) => (
            <div className={styles.reactslider} key={value.date}>
              <button
                onClick={() => handleButtonClick(value)}
                className={
                  selectedDate === value.fullDate ? styles.buttonClicked : ""
                }
              >
                <div
                  className={`${styles.paperone} ${
                    selectedDate === value.fullDate ? styles.paperClicked : ""
                  }`}
                >
                  <p>
                    <span className={styles.days}>{value.day}</span>
                    <br />
                    <span className={styles.date}>{value.date}</span>
                  </p>
                </div>
              </button>
            </div>
          ))}
        </Slider>

        <div className={styles.appointmentDiv}>
          {ongoing.length > 0 && !showNoAppointments ? (
            ongoing.map((appointment) => (
              <Paper
                className={styles.paper}
                elevation={0}
                key={appointment.id}
              >
                <div className={styles.appointmentdetails}>
                  <div className={styles.content}>
                    <div className={styles.imgDiv}>
                      <img
                        src={appointment.user.profileImageUrl}
                        alt={appointment.user.firstName}
                      />
                    </div>
                    <div className={styles.details}>
                      <p>
                        {appointment.user.firstName}
                        <br />
                        <span className={styles.spanOne}>
                          {appointment.serviceType}
                        </span>
                        <br />
                        <span className={styles.spanTwo}>
                          {appointment.startTime}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className={styles.horizonIcon}>
                    <MoreHorizIcon className={styles.dots} />
                    <p>{appointment.price}</p>
                  </div>
                </div>
              </Paper>
            ))
          ) : showNoAppointments && selectedDate === formattedDate ? (
            <div className={styles.noAppointment}>
              <p>Oops, there are no appointments</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default UpcomingAppointment;
