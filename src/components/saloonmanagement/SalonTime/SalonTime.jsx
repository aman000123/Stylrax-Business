import styles from "../SalonTime/SalonTime.module.css";
import { IoTimeSharp } from "react-icons/io5";
import { FaCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { salonBusinessTime } from "../../../api/salon.management";
import AddTime from "./AddTime";

function SalonTime() {
    const [timing, setTiming] = useState([]);
    const [showAddTimePopup, setShowAddTimePopup] = useState(false);
    console.log("time",timing)
    useEffect(() => {
        const getSalonTime = async () => {
            const res = await salonBusinessTime();
            const timing = res.data;
            setTiming(timing);
        }
        getSalonTime();
    }, []);

    const toggleAddTimePopup = () => {
        setShowAddTimePopup(!showAddTimePopup);
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
                        <FaCircle className={styles.blackCircle}/>
                    </div>
                </div>
            ))}
            
            <div className={styles.addTime}>
                <button type="button" className="bg-black text-white rounded p-2 flex-end" onClick={toggleAddTimePopup}>ADD</button>
            </div>
            
            {showAddTimePopup && <AddTime onClose={toggleAddTimePopup} />}
        </div>
    )
}

export default SalonTime;
