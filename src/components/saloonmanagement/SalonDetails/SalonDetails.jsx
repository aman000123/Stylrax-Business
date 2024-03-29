import styles from "../SalonDetails/SalonDetails.module.css";
import salondetailimg from "../../../assets/image/salondetailimg.png";
// import { MdEdit } from "react-icons/md";
import { Formik, Form, Field, ErrorMessage } from "formik"
import { salonDetailsSchema } from "../../../utils/schema.js";
import { salonDetails } from "../../../api/account.api.js";

const initialValues = {
    salonName: "",
    email: "",
    gstNumber: "",
    address: "",
    salonStatePinCode: "",
    state: "",
    services: "",
};

function SalonDetails() {

    const onSubmit = async (values) => {
        try {
            const data = {
                "name":values.salonName,
                "email":values.email,
                "gstNumber":values.gstNumber,
                "companyName":"Unique Style",
                "address":values.address,
                "latitude":"332.343",
                "longitude":"23.343",
                "city":"Delhi",
                "state":values.state,
                "pincode":values.salonStatePinCode,
                "serviceType":values.services,
                "homeService":false,
                "mainGateImageUrl":"maingateImageUrl",
                "bannerImages":["url1","url2"],
                "gallaryImages":["gi_url1","gi_url2"]
            
            }
            const response = await salonDetails(data);
            console.log(response); 
            console.log('Form submitted successfully');
            action.resetForm();
        } catch (error) {
            console.error('There was an error submitting the form:', error);
        }
    }

    return (
        <div className={styles.mainDiv}>
            <div className={styles.imgDiv}>
                <div>
                    <img src={salondetailimg} alt=''></img>
                </div>
            </div>

            <Formik
                initialValues={initialValues}
                validationSchema={salonDetailsSchema}
                onSubmit={onSubmit}
            >
                <Form className={styles.forms}>
                    <label className={styles.lab}> Salon Name</label><br />
                    <Field
                        type='textarea'
                        placeholder='Jhon'
                        name='salonName'
                        className={styles.inputs}
                    /><br />

                    <ErrorMessage name="salonName" className={styles.formError} component="div" />

                    <label className={styles.lab}> Email Id</label><br />
                    <Field
                        type='email'
                        placeholder='Jhon'
                        name='email'
                        className={styles.inputsTwo}
                    /><br />

                    <ErrorMessage name="email" className={styles.formError} component="div" />


                    <label className={styles.lab}> Gst Number</label><br />
                    <Field
                        type='text'
                        placeholder='Jhon'
                        name='gstNumber'
                        className={styles.inputs}
                    /><br />

                    <ErrorMessage name="gstNumber" className={styles.formError} component="div" />

                    <label className={styles.lab}> Address</label><br />
                    <Field
                        type='text'
                        placeholder='Jhon'
                        name='address'
                        className={styles.inputsTwo}
                    /><br />

                    <ErrorMessage name="address" className={styles.formError} component="div" />


                    <label className={styles.lab}>
                        Salon State
                        <br />
                        <Field
                            as="select"
                            name="state" 
                            className={styles.inputsThree}
                        >
                            <option value="">select</option>
                            <option value="uttar-pradesh">Uttar-Pradesh</option>
                            <option value="madhya-pradesh">Madhya-Pradesh</option>
                            <option value="andra-pradesh">Andra-Pradesh</option>
                        </Field><br />

                        <ErrorMessage name="state" className={styles.formError} component="div" />
                    </label><br/>

                    <label className={styles.lab}> Salon State pincode</label><br />
                    <Field
                        type='text'
                        placeholder='209625'
                        name='salonStatePinCode'
                        className={styles.inputsThree}
                    /><br />

                    <ErrorMessage name="salonStatePinCode" className={styles.formError} component="div" />

                    <label className={styles.lab}>
                        Service For
                        <br />
                        <Field
                            as="select"
                            name="services" 
                            className={styles.inputsThree}
                        >
                            <option value="">select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </Field><br />

                        <ErrorMessage name="services" className={styles.formError} component="div" />
                    </label><br/>

                    <button type='submit' className={styles.btn}>Submit</button>
                </Form>
            </Formik>

        </div>
    )
}

export default SalonDetails
