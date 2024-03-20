import { Col } from 'react-bootstrap';
import styles from "../ManageStaff/ManageStaff.module.css";
import stylistimg1 from "../../../assets/image/stylistimg1.png"
import { Paper } from '@mui/material';
import { CiCalendar } from "react-icons/ci";


const paperTwoData = [
    {
        imgsrc: stylistimg1,
        t1: "Alberta Raya ",
        t2: "HairStyling, HairSPa, Spa ",
        t3: "10:30 Am - 11:00 Pm ",
        t4: "24 Dec, 2024 ",
        t5: " At Home",
        t6: " 100$",
    },

    {
        imgsrc: stylistimg1,
        t1: "Alberta Raya ",
        t2: "HairStyling, HairSPa, Spa ",
        t3: "10:30 Am - 11:00 Pm ",
        t4: "24 Dec, 2024 ",
        t5: " At Home",
        t6: " 100$",
    },

    {
        imgsrc: stylistimg1,
        t1: "Alberta Raya ",
        t2: "HairStyling, HairSPa, Spa ",
        t3: "10:30 Am - 11:00 Pm ",
        t4: "24 Dec, 2024 ",
        t5: " At Home",
        t6: " 100$",
    },

    {
        imgsrc: stylistimg1,
        t1: "Alberta Raya ",
        t2: "HairStyling, HairSPa, Spa ",
        t3: "10:30 Am - 11:00 Pm ",
        t4: "24 Dec, 2024 ",
        t5: " At Home",
        t6: " 100$",
    },

    {
        imgsrc: stylistimg1,
        t1: "Alberta Raya ",
        t2: "HairStyling, HairSPa, Spa ",
        t3: "10:30 Am - 11:00 Pm ",
        t4: "24 Dec, 2024 ",
        t5: " At Home",
        t6: " 100$",
    },

    {
        imgsrc: stylistimg1,
        t1: "Alberta Raya ",
        t2: "HairStyling, HairSPa, Spa ",
        t3: "10:30 Am - 11:00 Pm ",
        t4: "24 Dec, 2024 ",
        t5: " At Home",
        t6: " 100$",
    },

    {
        imgsrc: stylistimg1,
        t1: "Alberta Raya ",
        t2: "HairStyling, HairSPa, Spa ",
        t3: "10:30 Am - 11:00 Pm ",
        t4: "24 Dec, 2024 ",
        t5: " At Home",
        t6: " 100$",
    },

    {
        imgsrc: stylistimg1,
        t1: "Alberta Raya ",
        t2: "HairStyling, HairSPa, Spa ",
        t3: "10:30 Am - 11:00 Pm ",
        t4: "24 Dec, 2024 ",
        t5: " At Home",
        t6: " 100$",
    },
]


function ViewAllAddService() {
    return (
        <div className={styles.popup}>
            <Col md={4}>
                <div className={styles.popupFormDiv}>
                    <div className={styles.popupFormImgDiv}>
                        <span>Staff</span>
                        <img src={stylistimg1} alt='' />
                    </div>

                    <form className={styles.popupForm}>
                        <input type='text' placeholder='Name' />
                        <input type='text' placeholder='Mobile Number' />
                        <input type='text' placeholder='Date of Birth' />
                        <input type='text' placeholder='Email Id' />
                        <input type='text' placeholder='Gender' />
                        <input type='text' placeholder='Catrgory' />
                    </form>

                    <div className={styles.popupFormButton}>
                        <button className={styles.buttonOne}>Edit</button>
                        <button className={styles.buttonTwo}>Delete</button>
                    </div>
                </div>
            </Col>

            <Col md={8}>
                <div className={styles.appointmentDiv}>
                    <div className={styles.appointmentData}>
                        <span>Appointments</span>
                        <div className={styles.calendar}>
                            <div className={styles.week}>
                                <span className={styles.text1}>Monday</span>
                                <span className={styles.text2}>05 Nov, 2024</span>
                            </div>
                            <CiCalendar className={styles.calIcon} />
                        </div>
                    </div>

                    <div className={styles.popupMainData}>
                        {
                            paperTwoData.map((data) => (

                                <Paper key={data.id} className={styles.paperTwo}>
                                    <div className={styles.flex}>
                                        <img src={data.imgsrc} alt=''></img>
                                        <div className={styles.content}>
                                            <span className={styles.title}>
                                                {data.t1}
                                            </span>
                                            <span className={styles.same}>
                                                {data.t2}
                                            </span>
                                            <div className={styles.time}>
                                                <span className={styles.tspan}>{data.t3}</span>
                                                <span className={styles.tspan}>{data.t4}</span>
                                                <span className={styles.tspan}>{data.t5}</span>
                                            </div>

                                        </div>
                                    </div>
                                    <span>{data.t6}</span>
                                </Paper>
                            ))
                        }
                    </div>

                </div>
            </Col>
        </div>
    )
}

export default ViewAllAddService
