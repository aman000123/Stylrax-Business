import styles from "../SalonOwnerDetails/SalonOwnerDetails.module.css";
import salonownerdetailimg from "../../../assets/image/salonownerdetailimg.png";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { salonOwnerDetails } from "../../../utils/schema.js";
import { salonownerDetails } from "../../../api/account.api.js";



const initialValues = {
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    dob: "",
    gender: "",
    aadharCard: "",
    panCard: "",
};

function SalonOwnerDetails() {

    const onSubmit = async (values) => {
        try {
            const data = {
                "profileType": "Salon",
                "firstName": values.firstName,
                "middleName": values.middleName,
                "lastName": values.lastName,
                "email": values.email,
                "dataOfBirth": values.dob,
                "gender": values.gender,
                "panCardImageUrl": values.panCard,
                "aadharFrontUrl": values.aadharCard,
                "aadharBackUrl": "someurl",
                "profileImageUrl": "someUrl",
                "serviceType": "Male"
            }
            console.log(values);
            const response = await salonownerDetails(data);
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
                    <img src={salonownerdetailimg} alt=''></img>
                </div>

            </div>
            <Formik
                initialValues={initialValues}
                validationSchema={salonOwnerDetails}
                onSubmit={onSubmit}
            >
                <Form>
                    <label className={styles.lab}> First Name</label><br />
                    <Field
                        type='text'
                        placeholder='Jhon'
                        name='firstName'
                        className={styles.inputs}
                    /><br />

                    <ErrorMessage name="firstName" className={styles.formError} component="div" />

                    <label className={styles.lab}> Middle Name</label><br />
                    <Field
                        type='text'
                        placeholder='Jhon'
                        name='middleName'
                        className={styles.inputs}
                    /><br />

                    <ErrorMessage name="middleName" className={styles.formError} component="div" />


                    <label className={styles.lab}> Last Name</label><br />
                    <Field
                        type='text'
                        placeholder='Jhon'
                        name='lastName'
                        className={styles.inputs}
                    /><br />

                    <ErrorMessage name="lastName" className={styles.formError} component="div" />

                    <label className={styles.lab}> Email ID</label><br />
                    <Field
                        type='email'
                        placeholder='Jhon'
                        name='email'
                        className={styles.email}
                    /><br />

                    <ErrorMessage name="email" className={styles.formError} component="div" />

                    <label className={styles.lab}> Date of Birth</label><br />
                    <Field
                        type='date'
                        placeholder='Jhon'
                        name='dob'
                        className={styles.dob}
                    /><br />

                    <ErrorMessage name="dob" className={styles.formError} component="div" />

                    <label className={styles.lab}>
                        Gender
                        <br />
                        <Field
                            as="select"
                            name="gender"
                            // placeholder="select"
                            className={styles.inputs}
                        >
                            <option value="">select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </Field><br />

                        <ErrorMessage name="gender" className={styles.formError} component="div" />
                    </label><br/>

                    <label className={styles.lab}> Aadhar Card</label><br />
                    <Field
                        type='file'
                        name='aadharCard'
                        placeholder="Eg : 574673102568"
                        className={styles.aadharCard}
                    /><br />

                    <ErrorMessage name="aadharCard" className={styles.formError} component="div" />

                    <label className={styles.lab}> Pan Card</label><br />
                    <Field
                        type='file'
                        name='panCard'
                        placeholder="Eg : LEUPS4916J"
                        className={styles.panCard}
                    /><br />

                    <ErrorMessage name="panCard" className={styles.formError} component="div" />

                    <button type='submit' className={styles.btn}>Submit</button>
                </Form>
            </Formik>

        </div>
    )
}

export default SalonOwnerDetails
