import  { useEffect, useState } from 'react'
import styles from "./Services.module.css";
import servicesimg from "../../../assets/image/servicesimg.png"
import { Paper } from '@mui/material';
import { IoMdAddCircle } from "react-icons/io";
import AddService from '../AddService/AddService';
import ViewMore from '../Viewmore/ViewMore';
import { salonService, serviceCategory } from '../../../api/salon.management';
import Notify from "../../../utils/notify";
import Session from '../../../service/session';
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
    const salonId = Session.get("salonId");
    console.log("salonID:::>", salonId);
    const viewAll = (id) => {
        setSelectedServiceId(id);
        setHaircut(!haircut);
    }

 
    const handleOpen = () => {
        setAddServiceVisible(!addServiceVisible);
    };

    useEffect(()=>{
        const getService = async()=>{
        const res = await salonService(salonId)
        const service = res.data;
        setService(service)
        }
        getService();
        },[])

        useEffect(()=>{
            
             const category = async()=>{
               try {
                const res = await serviceCategory()
                console.log("category::>",res)
                Notify.success(res.data.message)
               } catch (error) {
                Notify.error(error.message)
               }
             }   
           category()
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








