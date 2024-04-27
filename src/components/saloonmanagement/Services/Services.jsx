import  { useEffect, useState } from 'react';
import styles from "./Services.module.css";
import servicesimg from "../../../assets/image/servicesimg.png";
import { Paper, Button } from '@mui/material';
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
    // Add more data items as needed
];

function Services() {
    const [addServiceVisible, setAddServiceVisible] = useState(false);
    const [haircut, setHaircut] = useState(false);
    const [selectedStaffId, setSelectedStaffId] = useState(null);
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await salonService(Session.get("salonId"));
                setServices(res.data);
                Notify.success(res.data.message);
            } catch (error) {
                Notify.error(error.message);
            }
        };
        fetchServices();
    }, []);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await serviceCategory();
                Notify.success(res.data.message);
            } catch (error) {
                Notify.error(error.message);
            }
        };
        fetchCategories();
    }, []);

    const handleViewMore = (id) => {
        setSelectedStaffId(id);
        setHaircut(true);
    };

    const handleOpenAddService = () => {
        setAddServiceVisible(true);
    };

    const handleCloseAddService = () => {
        setAddServiceVisible(false);
    };

    return (
        <div>
            {haircut ? (
                <ViewMore id={selectedStaffId} onViewMore={() => setHaircut(false)} onClose={()=> setAddServiceVisible(false)}/>
            ) : (
                <div className={styles.secDiv}>
                    {addServiceVisible ? (
                        <AddService onClose={handleCloseAddService} />
                    ) : (
                        <div className={styles.addService}>
                            <div className={styles.services}>
                                {services.map((service, index) => (
                                    <Paper className={styles.paper} key={index}>
                                        <div className={styles.imgDiv}>
                                        <img src={servicesimg} alt='' />
                                        </div>
                                        <div className={styles.text}>
                                            <p>{service.textOne}<br />
                                                <span className={styles.spanOne}>{service.serviceName}</span><br />
                                                <span className={styles.spanOne}>{service.servicePrice}</span><br />
                                                <span className={styles.spanTwo}>
                                                    <button onClick={() => handleViewMore(service.id)}>View All</button>
                                                </span>
                                            </p>
                                        </div>
                                    </Paper>
                                ))}
                                <div className={styles.iconDiv}>
                                    <Button onClick={handleOpenAddService} style={{ color: 'black' }}><IoMdAddCircle className={styles.icon} /></Button>
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

export default Services;
