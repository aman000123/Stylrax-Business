import React, { useState } from 'react'
import styles from "../Services/Services.module.css";
import servicesimg from "../../../assets/image/servicesimg.png"
import { Paper } from '@mui/material';
import { IoMdAddCircle } from "react-icons/io";
import AddService from '../AddService/AddService';

const data = [
    {
        img: servicesimg,
        textOne: "Hair Style",
        textTwo: "12 Types ",
        textThree: "View More",
    },

    {
        img: servicesimg,
        textOne: "Hair Style",
        textTwo: "12 Types ",
        textThree: "View More",
    },

    {
        img: servicesimg,
        textOne: "Hair Style",
        textTwo: "12 Types ",
        textThree: "View More",
    },

    {
        img: servicesimg,
        textOne: "Hair Style",
        textTwo: "12 Types ",
        textThree: "View More",
    },

    {
        img: servicesimg,
        textOne: "Hair Style",
        textTwo: "12 Types ",
        textThree: "View More",
    },

    {
        img: servicesimg,
        textOne: "Hair Style",
        textTwo: "12 Types ",
        textThree: "View More",
    },

    {
        img: servicesimg,
        textOne: "Hair Style",
        textTwo: "12 Types ",
        textThree: "View More",
    },

    {
        img: servicesimg,
        textOne: "Hair Style",
        textTwo: "12 Types ",
        textThree: "View More",
    },

    {
        img: servicesimg,
        textOne: "Hair Style",
        textTwo: "12 Types ",
        textThree: "View More",
    },

    {
        img: servicesimg,
        textOne: "Hair Style",
        textTwo: "12 Types ",
        textThree: "View More",
    },

]




function Services() {

    const [addServiceVisible, setAddServiceVisible] = useState(false);

    const handleOpen = () => {
        setAddServiceVisible(!addServiceVisible);
    };
    
    return (
        <div>
            <div className={styles.content}>
                <select name='mystate' id="state" className={styles.input}>
                    <option value="up" className={styles.options}>Male</option>
                    <option value="mp" className={styles.options}>Female</option>
                    <option value="cg" className={styles.options}>Other</option>
                </select><br />

                <select name='mystate' id="state" className={styles.input}>
                    <option value="up" className={styles.options}>Other</option>
                    <option value="mp" className={styles.options}>Other</option>
                    <option value="cg" className={styles.options}>Other</option>
                </select><br />
            </div>

            <div className={styles.secDiv}>
                {addServiceVisible ? (
                    <AddService/>
                ) : (
                    <>
                        {data.map((value, index) => (
                            <Paper className={styles.paper} key={index}>
                                <div className={styles.imgDiv}>
                                    <img src={value.img} alt='' />
                                </div>
                                <div className={styles.text}>
                                    <p>{value.textOne}<br />
                                        <span className={styles.spanOne}>{value.textTwo}</span><br />
                                        <span className={styles.spanTwo}><button>{value.textThree}</button></span>
                                    </p>
                                </div>
                            </Paper>
                        ))}
                        <div className={styles.iconDiv}>
                            <button onClick={handleOpen}><IoMdAddCircle className={styles.icon} /></button>
                            <p>Add Services</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Services








