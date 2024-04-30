import styles from "../SalonTime/SalonTime.module.css";
import { IoTimeSharp } from "react-icons/io5";
import { FaCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { salonBusinessTime, salonTime } from "../../../api/salon.management";
import AddTime from "./AddTime";
import Session from "../../../service/session";
import Notify from "../../../utils/notify";

function SalonTime() {
    const [timing, setTiming] = useState([]);
    const salonId = Session.get("salonId");
    const [showAddTimePopup, setShowAddTimePopup] = useState(false);

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

    const addTime = async () => {
        try {
            const data = [
                {
                    "day": "Monday",
                    "isOpen": true,
                    "openTime": "10:00 AM",
                    "closeTime": "08:00 PM"
                },
                {
                    "day": "Tuesday",
                    "isOpen": true,
                    "openTime": "10:00 AM",
                    "closeTime": "08:00 PM"
                },
                {
                    "day": "Wednesday",
                    "isOpen": true,
                    "openTime": "10:00 AM",
                    "closeTime": "08:00 PM"
                }
            ];
            const res = await salonTime(salonId, data);
            Notify.success(res.message);
        } catch (error) {
            Notify.error(error.message);
        }
    }

    return (
        <div className={styles.mainDiv}>
            <div className={styles.actionButton}>
                <button className={styles.salon}>Salon</button>
                <button className={styles.doorBuddy}>Doorbuddy</button>
            </div>

            {timing?.map((value) => (
                <div key={value.id} className={styles.secDiv}>
                    <div className={styles.day}> {value.day} </div>

                    <div className={styles.timeDiv}>
                        <div className={styles.height}>
                            <span className={styles.spanOne}>{value.openTime}</span>
                            <span className={styles.spanTwo}>open</span>
                        </div>

                        <IoTimeSharp className={styles.timeIcon}/>
                    </div>

                    <div className={styles.timeDiv}>
                        <div className={styles.height}>
                            <span className={styles.spanOne}>{value.closeTime}</span>
                            <span className={styles.spanTwo}>Close</span>
                        </div>

                        <IoTimeSharp className={styles.timeIcon}/>
                    </div>

                    <div className={styles.circleDiv}>
                        <FaCircle className={styles.blackCircle} onClick={addTime}/>
                    </div>
                </div>
            ))}
            
            {/* <div className={styles.addTime}>
                <button type="button" className="bg-black text-white rounded p-2 flex-end" onClick={toggleAddTimePopup}>ADD</button>
            </div> */}
            
            {showAddTimePopup && <AddTime onClose={toggleAddTimePopup} />}
        </div>
    )
}

export default SalonTime;
