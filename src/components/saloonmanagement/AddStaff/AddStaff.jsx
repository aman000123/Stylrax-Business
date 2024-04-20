import styles from "../ManageStaff/ManageStaff.module.css";
import stylistimg1 from "../../../assets/image/stylistimg1.png"
import { Col } from 'react-bootstrap';
import { useFormik } from "formik"
import { addStaffSchema } from "../../../utils/schema.js";
import { addStaff } from "../../../api/salon.management.js";
import Notify from "../../../utils/notify.js";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
const initialValues = {
    name: "",
    mobileNumber: "",
    dob: "",
    email: "",
    gender: "",
    category: "",
};

function AddStaff({onClose}) {
    const [open, setOpen] = useState(false)
    const { values, errors, touched, handleBlurr, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema: addStaffSchema,
        onSubmit: async(values, action) => {
            console.log(values);
            //action.resetForm();
            try {
                const data = {
                        firstName:values.name,
                        lastName:"Prasad",
                        email:values.email,
                        dataOfBirth:values.dob,
                        gender:values.gender,
                        profileImageUrl:"someUrl",
                        specialization:"All Rounder",
                        phoneNumber:values.mobileNumber,
                        aadharFrontUrl:"aadharFrontUrl",
                        aadharBackUrl: "aadharBackUrl"
                
                }
                const Staff = await addStaff(data);
                console.log("addStaff::>",Staff)
                onClose()
                
            } catch (error) {
                Notify.error(error.message);  
            }

        }
    });
    const handleClose = () => {
       onClose();
    };

    return (
        <>
     
        <Col md={4}>
            <div className={styles.popupFormDiv}>
                <div className={styles.popupFormImgDiv}>
                    <span>Staff</span>
                    <div onClick={handleClose} className={styles.crossIcon}><RxCross2 /></div>             
                    <img src={stylistimg1} alt='' />
                </div>

                <form className={styles.popupForm} onSubmit={handleSubmit}>
                    <input
                        type='text'
                        placeholder='Name'
                        name='name'
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlurr}
                    />

                    {
                        errors.name && touched.name ? (
                            <p className={styles.formError}>{errors.name}</p>
                        ) : null
                    }

                    <input
                        type='text'
                        placeholder='Mobile Number'
                        name='mobileNumber'
                        value={values.mobileNumber}
                        onChange={handleChange}
                        onBlur={handleBlurr}
                    />
                    {
                        errors.mobileNumber && touched.mobileNumber ? (
                            <p className={styles.formError}>{errors.mobileNumber}</p>
                        ) : null
                    }

                    <input
                        type='text'
                        placeholder='Date of Birth'
                        name="dob"
                        value={values.dob}
                        onChange={handleChange}
                        onBlur={handleBlurr}
                    />
                    {
                        errors.dob && touched.dob ? (
                            <p className={styles.formError}>{errors.dob}</p>
                        ) : null
                    }

                    <input
                        type='text'
                        placeholder='Email Id'
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlurr}
                    />
                    {
                        errors.email && touched.email ? (
                            <p className={styles.formError}>{errors.email}</p>
                        ) : null
                    }

                    <input
                        type='text'
                        placeholder='Gender'
                        name="gender"
                        value={values.gender}
                        onChange={handleChange}
                        onBlur={handleBlurr}
                    />
                    {
                        errors.gender && touched.gender ? (
                            <p className={styles.formError}>{errors.gender}</p>
                        ) : null
                    }

                    <input
                        type='text'
                        placeholder='Category'
                        name="category"
                        value={values.category}
                        onChange={handleChange}
                        onBlur={handleBlurr}
                    />

                    {
                        errors.category && touched.category ? (
                            <p className={styles.formError}>{errors.category}</p>
                        ) : null
                    }

                    <div className={styles.popupFormButton}>
                        <button className={styles.buttonOne} type="submit">Submit</button>
                    </div>
                </form>


            </div>
        </Col>
                
                
                </>
    )
}

export default AddStaff





