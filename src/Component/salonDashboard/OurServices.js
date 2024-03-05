import React from 'react'
import { Paper } from "@mui/material";
import { Row, Col } from "react-bootstrap";
import styles from "../../assets/scss/pages/home/ourServices.module.css";
import osImg1 from "../../assets/image/osImg1.png";
import osImg2 from "../../assets/image/osImg2.png";
import osImg3 from "../../assets/image/osImg3.png";
import osImg4 from "../../assets/image/osImg4.png";
import osImg5 from "../../assets/image/osImg5.png";
import osImg6 from "../../assets/image/osImg6.png";
import osImg7 from "../../assets/image/osImg7.png";
import osImg8 from "../../assets/image/osImg8.png";
import osImg9 from "../../assets/image/osImg9.png";
import osImg10 from "../../assets/image/osImg10.png";
import osImg11 from "../../assets/image/osImg11.png";
import osImg12 from "../../assets/image/osImg12.png";
import osImg13 from "../../assets/image/osImg13.png";
import osImg14 from "../../assets/image/osImg14.png";
import osImg15 from "../../assets/image/osImg15.png";
import osImg16 from "../../assets/image/osImg16.png";
import osImg17 from "../../assets/image/osImg17.png";

let ourServicesData = [
    {
        imgsrc1: osImg1,
        text1: "HairStyles",
        imgsrc2: osImg2,
        text2: "HairStyles",
        imgsrc3: osImg3,
        text3: "HairStyles",
        imgsrc4: osImg4,
        text4: "HairStyles"
    },

    {
        imgsrc1: osImg5,
        text1: "HairStyles",
        imgsrc2: osImg6,
        text2: "HairStyles",
        imgsrc3: osImg7,
        text3: "HairStyles",
        imgsrc4: osImg8,
        text4: "HairStyles"
    },

    {
        imgsrc1: osImg9,
        text1: "HairStyles",
        imgsrc2: osImg10,
        text2: "HairStyles",
        imgsrc3: osImg11,
        text3: "HairStyles",
        imgsrc4: osImg12,
        text4: "HairStyles"
    },

    {
        imgsrc1: osImg13,
        text1: "HairStyles",
        imgsrc2: osImg14,
        text2: "HairStyles",
        imgsrc3: osImg15,
        text3: "HairStyles",
        imgsrc4: osImg16,
        text4: "HairStyles"
    },

    {
        imgsrc1: osImg17,
        text1: "HairStyles",
        imgsrc2: osImg11,
        text2: "HairStyles",
        imgsrc3: osImg12,
        text3: "HairStyles",
        imgsrc4: osImg13,
        text4: "HairStyles"
    }
]


function OurServices() {
    return (
        <div className={styles.mainDiv}>
            <div>
                Our Services
            </div>

            {
                ourServicesData.map((data) => (
                    <Row className='mt-2'>
                        <Col className={styles.border}>
                            <Paper className={styles.paper}>
                                <img className={styles.hairStylist} src={data.imgsrc1} alt='' />
                                <p className={styles.hairStyle}>{data.text1}</p>
                            </Paper>
                        </Col>

                        <Col>
                            <Paper className={styles.paper}>
                                <img className={styles.hairStylist} src={data.imgsrc2} alt='' />
                                <p className={styles.hairStyle}>{data.text2}</p>
                            </Paper>
                        </Col>

                        <Col>
                            <Paper className={styles.paper}>
                                <img className={styles.hairStylist} src={data.imgsrc3} alt='' />
                                <p className={styles.hairStyle}>{data.text3}</p>
                            </Paper>
                        </Col>

                        <Col>
                            <Paper className={styles.paper}>
                                <img className={styles.hairStylist} src={data.imgsrc4} alt='' />
                                <p className={styles.hairStyle}>{data.text4}</p>
                            </Paper>
                        </Col>

                    </Row>

                ))
            }

        </div>
    )
}

export default OurServices
