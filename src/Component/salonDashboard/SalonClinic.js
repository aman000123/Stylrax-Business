import React from 'react'
import { Paper } from "@mui/material";
import { Row, Col } from "react-bootstrap";
import styles from "../../assets/scss/pages/home/salonClinic.module.css";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Stylist from './Stylist';
import OurServices from './OurServices';
import ClientIcon from "../../assets/image/ClientIcon.png"
import appointment from "../../assets/image/appointment.png"
import services1 from "../../assets/image/services1.png"
import cancelledAppointment from "../../assets/image/cancelledAppointment.png"
import triangleSquare from "../../assets/image/triangleSquare.png"
import greenline from "../../assets/image/greenline.png"
import redline from "../../assets/image/redline.png"
import RunningBanner from './RunningBanner';


let clientData = [
    {
        imgsrc: ClientIcon,
        clients: "Clients",
        num: "Number of Clients",
        digit: 900,
    },
]

let appointmentData = [
    {
        imgsrc: appointment,
        clients: "Appointments",
        num: "Number of Appointments",
        digit: 900,
    }
]

let servicesData = [
    {
        imgsrc: services1,
        clients: "Services",
        num: " Total Number of Services",
        digit: "06",
    }
]

let cancelledAppointmentsData = [
    {
        imgsrc: cancelledAppointment,
        clients: "Cancelled Appointments",
        num: "Total Cancelled Appointments",
        digit: "06",
    }
]

function SalonClinic() {
    return (
        <>
            <Row>
                <Col md={7}>
                    <Row>
                        <Col md={6}>
                            {
                                clientData.map((data) => (
                                    <Paper className={styles.border}>
                                        <div className={styles.mainDiv}>
                                            <div className={styles.content}>
                                                <div className={styles.clientImage}>
                                                    <img src={data.imgsrc} alt='' className={styles.clientIcon} />
                                                </div>
                                                <div className={styles.clientDetails}>
                                                    <p>{data.clients}<br />
                                                        <span className={styles.spanOne}>{data.num}</span><br />
                                                        <span className={styles.spanTwo}>{data.digit} </span></p>
                                                </div>
                                            </div>


                                            <div className={styles.icon}>
                                                <MoreHorizIcon className={styles.dots} />
                                            </div>
                                        </div>
                                    </Paper>

                                ))
                            }
                        </Col>

                        <Col md={6} >
                            {
                                appointmentData.map((data) => (
                                    <Paper className={styles.border}>
                                        <div className={styles.mainDiv}>

                                            <div className={styles.content}>
                                                <div className={styles.appointmentImage}>
                                                    <img src={data.imgsrc} alt='' className={styles.clientIcon} />
                                                </div>
                                                <div className={styles.appointmentDetails}>
                                                    <p>{data.clients}<br />
                                                        <span className={styles.spanOne}>{data.num}</span><br />
                                                        <span className={styles.spanTwo}>{data.digit} </span></p>
                                                </div>
                                            </div>

                                            <div className={styles.icon}>
                                                <MoreHorizIcon className={styles.dots} />
                                            </div>
                                        </div>
                                    </Paper>

                                ))
                            }
                        </Col>
                    </Row>
                    <Row className='mt-2 mb-2'>

                        <Col md={6} >
                            {
                                servicesData.map((data) => (
                                    <Paper className={styles.border}>
                                        <div className={styles.mainDiv}>

                                            <div className={styles.content}>
                                                <div className={styles.serviceImage}>
                                                    <img src={data.imgsrc} alt='' className={styles.serviceIcon} />
                                                </div>
                                                <div className={styles.serviceDetails}>
                                                    <p>{data.clients}<br />
                                                        <span className={styles.spanOne}>{data.num}</span><br />
                                                        <span className={styles.spanTwo}>{data.digit} </span></p>
                                                </div>
                                            </div>

                                            <div className={styles.icon}>
                                                <MoreHorizIcon className={styles.dots} />
                                            </div>
                                        </div>
                                    </Paper>

                                ))
                            }

                        </Col>
                        <Col md={6}>
                            {
                                cancelledAppointmentsData.map((data) => (
                                    <Paper className={styles.border}>
                                        <div className={styles.mainDiv}>
                                            <div className={styles.content}>
                                                <div className={styles.cancelledImage}>
                                                    <img src={data.imgsrc} alt='' className={styles.serviceIcon} />
                                                </div>
                                                <div className={styles.cancelledDetails}>
                                                    <p>{data.clients}<br />
                                                        <span className={styles.spanOne}>{data.num}</span><br />
                                                        <span className={styles.spanTwo}>{data.digit} </span></p>
                                                </div>
                                            </div>

                                            <div className={styles.icon}>
                                                <MoreHorizIcon className={styles.dots} />
                                            </div>
                                        </div>
                                    </Paper>
                                ))
                            }
                        </Col>
                    </Row>
                </Col>
                <Col md={5}>
                    <Paper>
                        <div className={styles.maincontent}>
                            <div className={styles.salesDiv}>
                                <div className={styles.square}>
                                    <h5>Sales</h5>
                                    <img src={triangleSquare} alt='' />
                                    <p className={styles.p1}>Total Profit</p>
                                    <p className={styles.p2}>2555.80</p>
                                </div>
                                <div className={styles.sales}>
                                    <p>Total Sales<br />
                                        <span className={styles.spanOne}>255.50</span><br />
                                        <span className={styles.spanTwo}>Year over year</span><br />
                                        <span className={styles.spanTwo}>Year over year</span></p>
                                </div>
                            </div>

                            <div className={styles.lines}>
                                <img className={styles.redLine} src={redline} alt='' />
                                <img className={styles.greenLine} src={greenline} alt='' />
                            </div>

                        </div>





                    </Paper>
                </Col>
            </Row>

            {/* Running Banner */}

            <RunningBanner />

            <Row>
                <Col md={6}>
                    <Stylist />
                </Col>

                <Col md={6}>
                    <OurServices />
                </Col>
            </Row>
        </>
    )
}

export default SalonClinic
