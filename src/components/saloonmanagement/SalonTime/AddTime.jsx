import styles from "../ManageStaff/ManageStaff.module.css";
import { Paper} from '@mui/material';
import { Col ,Row} from 'react-bootstrap';
import { useFormik } from "formik"
import { addTimeSchema } from "../../../utils/schema.js";
import {salonTime } from "../../../api/salon.management.js";
import Notify from "../../../utils/notify.js";
import { RxCross2 } from "react-icons/rx";
const initialValues = {
    day: "",
    isOpen: "",
    openTime: "",
    closeTime: "",
};

function AddTime({ onClose }) {
    //const [showAddStaff, setShowAddStaff] = useState(true);
    const { values, errors, touched, handleBlurr, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema: addTimeSchema,
        onSubmit: async(values, action) => {
            console.log(values);
            //action.resetForm();
            try {
                const data = [{
                        day:values.day,
                        isOpen:values.isOpen,
                        openTime:values.openTime,
                        closeTime:values.closeTime,
            }]
                const Staff = await salonTime(data);
                console.log("addStaff::>",Staff)
                onClose()
                
            } catch (error) {
                Notify.error(error.message);  
            }

        }
    });
    return (
        <>
        <Row className={`${styles.addTime} justify-content-center align-items-center rounded`}>
        <Col md={4} >
            <Paper className={styles.popupFormDiv} elevation={13}>
            <div onClick={() => onClose()} className={styles.closeIcon}><RxCross2 /></div>             
             <form className={styles.popupForm} onSubmit={handleSubmit}>
                    <input
                        type='text'
                        placeholder='day'
                        name='day'
                        value={values.day}
                        onChange={handleChange}
                        onBlur={handleBlurr}
                    />

                    {
                        errors.day && touched.day ? (
                            <p className={styles.formError}>{errors.day}</p>
                        ) : null
                    }

                    <input
                        type='text'
                        placeholder='openTime'
                        name='openTime'
                        value={values.openTime}
                        onChange={handleChange}
                        onBlur={handleBlurr}
                    />
                    {
                        errors.openTime && touched.openTime ? (
                            <p className={styles.formError}>{errors.openTime}</p>
                        ) : null
                    }

                    <input
                        type='text'
                        placeholder='closeTime'
                        name="closeTime"
                        value={values.closeTime}
                        onChange={handleChange}
                        onBlur={handleBlurr}
                    />
                    {
                        errors.closeTime && touched.closeTime ? (
                            <p className={styles.formError}>{errors.closeTime}</p>
                        ) : null
                    } 

                    <input
                        type='text'
                        placeholder='isOpen'
                        name="isOpen"
                        value={values.isOpen}
                        onChange={handleChange}
                        onBlur={handleBlurr}
                    />
                    {
                        errors.isOpen && touched.isOpen ? (
                            <p className={styles.formError}>{errors.isOpen}</p>
                        ) : null
                    } 

                  
                    <div className={styles.popupFormButton}>
                        <button className={styles.buttonOne} type="submit">Submit</button>
                    </div>
                </form>


            </Paper>
        </Col>
          </Row>      
                
                </>
    )
}

export default AddTime;





