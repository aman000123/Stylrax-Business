import { useEffect, useState } from "react";
import styles from "./UpcomingAppointment.module.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Paper, Skeleton } from "@mui/material"; // Import Skeleton from Material-UI
import { FaCalendarDays } from "react-icons/fa6";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ongoingAppointments } from "../../../api/appointments.api";
import Notify from "../../../utils/notify";

// Utility function to format date to DD-MM-YYYY
const formatDateToAPI = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
};

// Utility function to format date to DD-MMM-YYYY
const formatDateToDisplay = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = d.toLocaleString("default", { month: "short" });
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
};

const generateUpcomingWeek = () => {
  const today = new Date();
  const upcomingWeek = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    upcomingWeek.push({
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      date: date.getDate(),
      fullDate: formatDateToAPI(date), // Format the date for API
    });
  }
  return upcomingWeek;
};

function UpcomingAppointment({ selectedSalon }) {
  const currentDate = new Date();
  const formattedDate = formatDateToAPI(currentDate);
  const formattedCurrentDate = formatDateToDisplay(currentDate);

  const [ongoing, setOngoing] = useState([]);
  const [selectedDate, setSelectedDate] = useState(formattedDate);
  const [showNoAppointments, setShowNoAppointments] = useState(false);
  const [loading, setLoading] = useState(true); // State for loading indicator

  const salonId = selectedSalon.id;

  const fetchAppointments = async (date) => {
    try {
      const response = await ongoingAppointments(salonId, date);
      setLoading(false); // Set loading to false once data is fetched
      return response.data;
    } catch (error) {
      setLoading(false); // Set loading to false on error as well
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
      }
    };
    initFetch();
  }, [salonId, formattedDate]);

  const handleButtonClick = async (value) => {
    if (salonId) {
      setLoading(true); // Set loading to true when fetching new appointments
      const appointments = await fetchAppointments(value.fullDate);
      setSelectedDate(value.fullDate);
      setOngoing(appointments);
      setLoading(false); // Set loading to false after updating appointments
      setShowNoAppointments(value.fullDate === formattedDate && appointments.length === 0);
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
            <KeyboardArrowLeftIcon onClick={() => console.log("Previous month")} />
            <KeyboardArrowRightIcon onClick={() => console.log("Next month")} />
          </div>
        </div>

        <Slider {...settings}>
          {generateUpcomingWeek().map((value) => (
            <div className={styles.reactslider} key={value.date}>
              <button
                onClick={() => handleButtonClick(value)}
                className={selectedDate === value.fullDate ? styles.buttonClicked : ""}
              >
                <div
                  className={`${styles.paperone} ${selectedDate === value.fullDate ? styles.paperClicked : ""
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
          {loading ? (
            // Render loading skeleton while fetching data
            <div className={styles.loadingSkeleton}>
              {[...Array(4)].map((_, index) => (
                <Paper key={index} className={styles.loadingPaper} elevation={0}>
                  <Skeleton variant="rectangular" width="100%" height={100} />
                </Paper>
              ))}
            </div>
          ) : ongoing.length > 0 && !showNoAppointments ? (
            ongoing.map((appointment) => (
              <Paper className={styles.paper} elevation={0} key={appointment.id}>
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
                        <span className={styles.spanOne}>{appointment.serviceType}</span>
                        <br />
                        <span className={styles.spanTwo}>{appointment.startTime}</span>
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
