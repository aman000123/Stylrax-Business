import React from 'react'
import styles from "../SalonTime/SalonTime.module.css";
import Switch from '@mui/material/Switch';
import { IoTimeSharp } from "react-icons/io5";
import { FaCircle } from "react-icons/fa";

const openTimeData = [
    {
        day:"Monday",
        time: "10:30 Am",
        status: "Open"
    },

    {
        day:"Monday",
        time: "10:30 Am",
        status: "Open"
    },

    {
        day:"Monday",
        time: "10:30 Am",
        status: "Open"
    },

    {
        day:"Monday",
        time: "10:30 Am",
        status: "Open"
    },

    {
        day:"Monday",
        time: "10:30 Am",
        status: "Open"
    },

    {
        day:"Monday",
        time: "10:30 Am",
        status: "Open"
    },

    {
        day:"Monday",
        time: "10:30 Am",
        status: "Open"
    },

]


const label = { inputProps: { 'aria-label': 'Size switch demo' } };

function SalonTime() {
    return (
        <div className={styles.mainDiv}>
            <div className={styles.actionButton}>
                <button className={styles.salon}>Salon</button>
                <button className={styles.doorBuddy}>Doorbuddy</button>
            </div>

            {
                openTimeData.map((value) => (
                    <div className={styles.secDiv}>
                    <div className={styles.day}> {value.day} </div>
    
                    <div className={styles.timeDiv}>
                        <div className={styles.height}>
                            <span className={styles.spanOne}>{value.time}</span>
                            <span className={styles.spanTwo}>{value.status}</span>
                        </div>
    
                        <IoTimeSharp className={styles.timeIcon}/>
                    </div>

                    <div className={styles.timeDiv}>
                        <div className={styles.height}>
                            <span className={styles.spanOne}>10:30 Pm</span>
                            <span className={styles.spanTwo}>Close</span>
                        </div>
    
                        <IoTimeSharp className={styles.timeIcon}/>
                    </div>
    
                    {/* <Switch {...label} defaultChecked color="default" /> */}
                    <div className={styles.circleDiv}>
                    <FaCircle className={styles.blackCircle}/>
                    </div>
                </div>
                ))
            }
  
        </div>
    )
}

export default SalonTime
