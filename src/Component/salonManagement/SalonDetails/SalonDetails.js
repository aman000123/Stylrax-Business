import React from 'react'
import styles from "../SalonDetails/SalonDetails.module.css";
import salondetailimg from "../../../assets/image/salondetailimg.png";
import { MdEdit } from "react-icons/md";


function SalonDetails() {
  return (
    <div className={styles.mainDiv}>
        <div className={styles.imgDiv}>
            <div>
                <img src={salondetailimg} alt=''></img>
            </div>

            {/* <div className={styles.text}>
                <span>Edit</span>
                <MdEdit className={styles.icon}/>
            </div> */}
        </div>

        <form className={styles.forms}>
            <label for="fname" className={styles.lab}> Salon Name</label><br/>
            <input type='textarea'  placeholder='Jhon' name='fname' id='fname' className={styles.inputs}/><br/>
            
            <label for="mail" className={styles.lab}> Email Id</label><br/>
            <input type='email' placeholder='Jhon' name='mail' id className={styles.inputsTwo}></input><br/>

            <label for="gst" className={styles.lab}> Gst Number</label><br/>
            <input type='text' placeholder='Jhon' name='gst' className={styles.inputs}></input><br/>

            <label for="add" className={styles.lab}> Address</label><br/>
            <input type='text' placeholder='Jhon' name='add' className={styles.inputsTwo}></input><br/>

            <label for="state" className={styles.lab}> Salon State</label><br/>
            <select name='mystate' id="state" className={styles.inputsThree}>
                    <option value="up">Uttar Pradesh</option>
                    <option value="mp">Madhya Pradesh</option>
                    <option value="cg">Chattisgarh</option>
                    <option value="hr">Haryana</option>
                    <option value="ap">Arunachal Pradesh</option>
            </select><br/>

            <label for="fname" className={styles.lab}> Salon State pincode</label><br/>
            <input type='number' placeholder='209625' name='fname' className={styles.inputsThree}></input><br/>

            <label for="fname" className={styles.lab}> Services For</label><br/>
            <select name='mystate' id="state" className={styles.inputsThree}>
                    <option value="up">Uttar Pradesh</option>
                    <option value="mp">Madhya Pradesh</option>
                    <option value="cg">Chattisgarh</option>
                    <option value="hr">Haryana</option>
                    <option value="ap">Arunachal Pradesh</option>
            </select><br/>
        </form>
    </div>
  )
}

export default SalonDetails
