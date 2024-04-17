import  { useEffect, useState } from 'react'
import styles from "./Services.module.css";
import servicesimg from "../../../assets/image/servicesimg.png"
import { Paper } from '@mui/material';
import { IoMdAddCircle } from "react-icons/io";
import AddService from '../AddService/AddService';
import ViewMore from '../Viewmore/ViewMore';
import { salonService } from '../../../api/salon.management';

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
    const [selectedServiceId, setSelectedServiceId] = useState(null);
    const [haircut, setHaircut] = useState(false);
    const [service,setService] = useState([]);
    console.log("service::>",service)

    const viewAll = (id) => {
        setSelectedServiceId(id);
        setHaircut(!haircut);
    }

 
    const handleOpen = () => {
        setAddServiceVisible(!addServiceVisible);
    };

    useEffect(()=>{
        const getService = async()=>{
        const res = await salonService()
        const service = res.data;
        setService(service)
        }
        getService();
        },[])
    return (
        <div>

            {haircut ? (<ViewMore  id={selectedServiceId}/>) : (
                <div className={styles.secDiv}>
                    {addServiceVisible ? (
                        <AddService />
                    ) : (
                        <div className={styles.addService}>
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
                            <div className={styles.services}>
                                {service?.map((value, index) => (
                                    <Paper className={styles.paper} key={index}>
                                        <div className={styles.imgDiv}>
                                            <img src={servicesimg} alt='' />
                                        </div>
                                        <div className={styles.text}>
                                            <p>{value.textOne}<br />
                                                <span className={styles.spanOne}>{value.serviceName}</span><br />
                                                <span className={styles.spanOne}>{value.servicePrice}</span><br />
                                                <span className={styles.spanTwo}><button onClick={() => viewAll(value.id)}>view all</button></span>
                                            </p>
                                        </div>
                                    </Paper>
                                ))}
                                <div className={styles.iconDiv}>
                                    <button onClick={handleOpen}><IoMdAddCircle className={styles.icon} /></button>
                                    <p>Add Services</p>
                                </div>
                            </div>

                        </div>
                    )}
                </div>
            )}

        </div>
    );
}

export default Services








