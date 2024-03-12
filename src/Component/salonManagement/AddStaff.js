import React from 'react'
import styles from "../salonManagement/ManageStaff/ManageStaff.module.css";
import stylistimg1 from "../../assets/image/stylistimg1.png"
import { Col } from 'react-bootstrap';




function AddStaff() {

  return (        

                        <Col md={4}>
                            <div className={styles.popupFormDiv}>
                                <div className={styles.popupFormImgDiv}>
                                    <span>Staff</span>
                                    <img src={stylistimg1} alt='' />
                                </div>

                                <form className={styles.popupForm}>
                                    <input type='text' placeholder='Name' />
                                    <input type='text' placeholder='Mobile Number' />
                                    <input type='text' placeholder='Date of Birth' />
                                    <input type='text' placeholder='Email Id' />
                                    <input type='text' placeholder='Gender' />
                                    <input type='text' placeholder='Catrgory' />
                                </form>

                                <div className={styles.popupFormButton}>
                                    <button className={styles.buttonOne}>Submit</button>  
                                </div>
                            </div>
                        </Col>
        
    
  )
}

export default AddStaff





