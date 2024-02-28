import React from 'react'
import { Paper } from "@mui/material";
import { Row, Col } from "react-bootstrap";
import styles from "../../assets/scss/pages/home/salonClinic.module.css";
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { FaClipboardList } from "react-icons/fa";




function SalonClinic() {
    return (
        <>
            <Row>
                <Col md={7}>
                    <Row>
                        <Col md={6}>
                            <Paper className={styles.paper}>
                                <div className={styles.mainDiv}>
                                    <div className={styles.clientImage}>
                                        <AccountBoxIcon className={styles.clientIcon}/>
                                    </div>
                                    <div className={styles.clientDetails}>
                                        <p>Client</p>
                                        <span className={styles.spanOne}>Number of Clients</span>
                                        <span className={styles.spanTwo}>900</span>
                                    </div>
                                    <div className={styles.icon}>
                                        <MoreHorizIcon/>
                                    </div>
                                </div>
                            </Paper>
                        </Col>
                        <Col md={6}> 
                        <Paper>
                                <div className={styles.mainDiv}>
                                    <div className={styles.clientImage}>
                                        <FaClipboardList/>
                                    </div>
                                    <div className={styles.clientDetails}>
                                        <p>Client<br/>
                                        <span>Number of Clients</span><br/>
                                        <span>900</span></p>
                                    </div>
                                    <div className={styles.icon}>
                                        <MoreHorizIcon/>
                                    </div>
                                </div>
                            </Paper>
                        </Col>
                    </Row>
                    <Row className='mt-2'>
                        <Col md={6}>
                        <Paper>
                                <div className={styles.mainDiv}>
                                    <div className={styles.clientImage}>
                                        <AccountBoxIcon/>
                                    </div>
                                    <div className={styles.clientDetails}>
                                        <p>Client<br/>
                                        <span>Number of Clients</span><br/>
                                        <span>900</span></p>
                                    </div>
                                    <div className={styles.icon}>
                                        <MoreHorizIcon/>
                                    </div>
                                </div>
                            </Paper>
                        </Col>
                        <Col md={6}>
                        <Paper>
                                <div className={styles.mainDiv}>
                                    <div className={styles.clientImage}>
                                        <AccountBoxIcon/>
                                    </div>
                                    <div className={styles.clientDetails}>
                                        <p>Client<br/>
                                        <span>Number of Clients</span><br/>
                                        <span>900</span></p>
                                    </div>
                                    <div className={styles.icon}>
                                        <MoreHorizIcon/>
                                    </div>
                                </div>
                            </Paper>
                        </Col>
                    </Row>
                </Col>
                <Col md={5}>
                    <Paper>
                        Client
                    </Paper>
                </Col>
            </Row>
        </>
    )
}

export default SalonClinic
