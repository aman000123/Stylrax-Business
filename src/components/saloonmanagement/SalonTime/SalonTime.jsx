import styles from "../SalonTime/SalonTime.module.css";
import { IoTimeSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { salonBusinessTime, salonTime } from "../../../api/salon.management";
import AddTime from "./AddTime";
import Session from "../../../service/session";
import Notify from "../../../utils/notify";
import Switch from '@mui/material/Switch';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const openTimeData = [
    { day: "Monday" },
    { day: "Tuesday" },
    { day: "Wednesday" },
    { day: "Thursday" },
    { day: "Friday" },
    { day: "Saturday" },
    { day: "Sunday" },
];
const initialValues = [
    {
        day:"Monday",
        isOpen:"",
        openTime:"",
        closeTime:""
    },
    {
        day:"Tuesday",
        isOpen:"",
        openTime:"",
        closeTime:""
    },
    {
        day:"Wednesday",
        isOpen:"",
        openTime:"",
        closeTime:""
    },
    {
        day:"Thursday",
        isOpen:"",
        openTime:"",
        closeTime:""
    },
    {
        day:"Friday",
        isOpen:"",
        openTime:"",
        closeTime:""
    },
    {
        day:"Saturday",
        isOpen:"",
        openTime:"",
        closeTime:""
    },
    {
        day:"Sunday",
        isOpen:"",
        openTime:"",
        closeTime:""
    },
]
console.log("Initial Values:", initialValues);
function SalonTime() {
    const salonId = Session.get("salonId");
    const [showAddTimePopup, setShowAddTimePopup] = useState(false);
    const [add, setAdd] = useState(false);
    const [timing, setTiming] = useState([]);

    useEffect(() => {
        const getSalonTime = async () => {
            try {
                const res = await salonBusinessTime(salonId);
                const timing = res.data;
                setTiming(timing);
            } catch (error) {
                Notify.error(error.message);
            }
        };
    
        if (salonId) {
            getSalonTime();
        } else {
            console.error("Salon ID is not valid.");
        }
    }, [salonId]);

    const toggleAddTimePopup = () => {
        setShowAddTimePopup(!showAddTimePopup);
    }

   

    const handleSubmit = async (values, { setSubmitting }) => {
        console.log("Form submitted with values:", values);
      
    }

 return (
        <div className={styles.mainDiv}>
            <div className={styles.actionButton}>
                <button className={styles.salon}>Salon</button>
                <button type="submit" className={styles.addTime} onClick={() => setAdd(!add)}>
                    {add ? "Save" : "Add"}
                </button>
            </div>

            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        {openTimeData.map((value, index) => {
                            return (
                                <div key={index} className={styles.secDiv}>
                                    <div className={styles.day}>{value.day}</div>

                                    <div className={styles.timeDiv}>
                                        <div className={styles.height}>
                                            <Field
                                                type="text"
                                                className={styles.spanOne}
                                            />
                                            <span className={styles.spanTwo}>Open</span>
                                        </div>
                                        <IoTimeSharp className={styles.timeIcon} />
                                    </div>

                                    <div className={styles.timeDiv}>
                                        <div className={styles.height}>
                                            <Field
                                                type="text"
                                                className={styles.spanOne}
                                            />
                                            <span className={styles.spanTwo}>Close</span>
                                        </div>
                                        <IoTimeSharp className={styles.timeIcon} />
                                    </div>

                                    <div >
                                        <Switch />
                                    </div>
                                </div>
                            );
                        })}

                       
                    </Form>
                )}
            </Formik>

        </div>
    )
}

export default SalonTime;
