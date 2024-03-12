import React from 'react'
import styles from "../SalonOwnerDetails/SalonOwnerDetails.module.css";
import salonownerdetailimg from "../../../assets/image/salonownerdetailimg.png";
import { MdEdit } from "react-icons/md";


function SalonOwnerDetails() {
  return (
    <div className={styles.mainDiv}>
    <div className={styles.imgDiv}>
        <div>
            <img src={salonownerdetailimg} alt=''></img>
        </div>

        {/* <div className={styles.text}>
            <span>Edit</span>
            <MdEdit className={styles.icon}/>
        </div> */}
    </div>

    <form>
        <label for="fname" className={styles.lab}> First Name</label><br/>
        <input type='text'  placeholder='Jhon' name='fname' id='fname' className={styles.inputs}/><br/>
        
        <label for="mname" className={styles.lab}> Middle Name</label><br/>
        <input type='text' placeholder='Jhon' name='mname'id='mname' className={styles.inputs}/><br/>

        <label for="lname" className={styles.lab}> Last Name</label><br/>
        <input type='text' placeholder='Jhon' name='lname' id='lname' className={styles.inputs}/><br/>

        <label for="mail" className={styles.lab}> Email ID</label><br/>
        <input type='email' placeholder='Jhon' name='mail' id='mail' className={styles.email}/><br/>

        <label for="date" className={styles.lab}> Date of Birth</label><br/>
        <input type='date' placeholder='Jhon' name='date' id='date' className={styles.dob}/><br/>

        <label for="gender" className={styles.lab}> Gender</label><br/>
        <select name='mystate' id="gender" className={styles.inputs}>
                <option value="up">Male</option>
                <option value="mp">Female</option>
                <option value="mp">Other</option>
        </select><br/>

        <label for="myfile" className={styles.lab}> Aadhar Card</label><br/>
        <input type='text'  name='myfile' id='myfile' className={styles.inputs}/><br/>
 
        <label for="mycard" className={styles.lab}> Pan Card</label><br/>
        <input type='text'  name='mycard' id='mycard' className={styles.inputs}/><br/> 
    </form> 
</div>
  )
}

export default SalonOwnerDetails
