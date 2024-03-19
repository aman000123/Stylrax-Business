import React from 'react'
import styles from "../AboutUs/AboutUs.module.css";
import { Paper } from '@mui/material';
import { BsThreeDotsVertical } from "react-icons/bs";


function AboutUs() {
    return (
        <div className={styles.mainDiv}>
                <div className={styles.about}>
                    <button>About</button>
                    <BsThreeDotsVertical  className={styles.icon}/>
                </div>

                <div className={styles.content}>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore Lorem ipsum
                    dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                    labore </p>
                </div>
        </div>
    )
}

export default AboutUs
