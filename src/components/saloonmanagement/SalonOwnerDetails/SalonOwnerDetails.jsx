import styles from "../SalonOwnerDetails/SalonOwnerDetails.module.css";
import salonownerdetailimg from "../../../assets/image/salonownerdetailimg.png";
// import { MdEdit } from "react-icons/md";
import { useFormik } from "formik";
import { salonOwnerDetails } from "../../../utils/schema.js";
import { createProfile } from "../../../api/user.api";



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

    const { values, errors, touched, handleBlurr, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema: salonOwnerDetails,
        onSubmit: async () => {
            try {
                // const {accNum, accName, bankName, ifscCode} = values
                const data = {
                    
                        "profileType":"Salon",
                        "firstName":values.firstName,
                        "middleName":values.middleName,
                        "lastName":values.lastName,
                        "email":values.email,
                        "dataOfBirth":values.dob,
                        "gender":values.gender,
                        "panCardImageUrl":values.panCard,
                        "aadharFrontUrl":values.aadharCard,
                        "aadharBackUrl":"someurl",
                        "profileImageUrl":"someUrl",
                        "serviceType":"Male" 
                }
                // Call the bankDetails function
                const response = await createProfile(data);
                console.log(response); // Assuming the response is logged by the bankDetails function
                console.log('Form submitted successfully');
                action.resetForm();
            } catch (error) {
                console.error('There was an error submitting the form:', error);
            }
        }
    });

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

            <form onSubmit={handleSubmit}>
                <label  className={styles.lab}> First Name</label><br />
                <input
                    type='text'
                    placeholder='Jhon'
                    name='firstName'
                    id='firstName'
                    className={styles.inputs}
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlurr}
                /><br />

                {
                    errors.firstName && touched.firstName ? (
                        <p className={styles.formError}>{errors.firstName}</p>
                    ) : null
                }

                <label  className={styles.lab}> Middle Name</label><br />
                <input
                    type='text'
                    placeholder='Jhon'
                    name='middleName'
                    id='middleName'
                    className={styles.inputs}
                    value={values.middleName}
                    onChange={handleChange}
                    onBlur={handleBlurr}
                /><br />

                {
                    errors.middleName && touched.middleName ? (
                        <p className={styles.formError}>{errors.middleName}</p>
                    ) : null
                }

                <label className={styles.lab}> Last Name</label><br />
                <input
                    type='text'
                    placeholder='Jhon'
                    name='lastName'
                    id='lastName'
                    className={styles.inputs}
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlurr}
                /><br />

                {
                    errors.lastName && touched.lastName ? (
                        <p className={styles.formError}>{errors.lastName}</p>
                    ) : null
                }

                <label className={styles.lab}> Email ID</label><br />
                <input
                    type='email'
                    placeholder='Jhon'
                    name='email'
                    id='email'
                    className={styles.email}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlurr}
                /><br />

                {
                    errors.email && touched.email ? (
                        <p className={styles.formError}>{errors.email}</p>
                    ) : null
                }

                <label  className={styles.lab}> Date of Birth</label><br />
                <input
                    type='date'
                    placeholder='Jhon'
                    name='dob'
                    id='dob'
                    className={styles.dob}
                    value={values.dob}
                    onChange={handleChange}
                    onBlur={handleBlurr}
                /><br />

                {
                    errors.dob && touched.dob ? (
                        <p className={styles.formError}>{errors.dob}</p>
                    ) : null
                }

                <label  className={styles.lab}> Gender</label><br />
                <select
                    name='gender'
                    id="gender"
                    className={styles.inputs}
                    value={values.gender}
                    onChange={handleChange}
                    onBlur={handleBlurr}
                >
                    <option value="other">Other</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select><br />

                {
                    errors.gender && touched.gender ? (
                        <p className={styles.formError}>{errors.gender}</p>
                    ) : null
                }

                <label className={styles.lab}> Aadhar Card</label><br />
                <input
                    type='file'
                    name='aadharCard'
                    id='aadharCard'
                    className={styles.aadharCard}
                    value={values.aadharCard}
                    onChange={handleChange}
                    onBlur={handleBlurr}
                /><br />

                {
                    errors.aadharCard && touched.aadharCard ? (
                        <p className={styles.formError}>{errors.aadharCard}</p>
                    ) : null
                }

                <label  className={styles.lab}> Pan Card</label><br />
                <input
                    type='file'
                    name='panCard'
                    id='panCard'
                    className={styles.panCard}
                    value={values.panCard}
                    onChange={handleChange}
                    onBlur={handleBlurr}
                /><br />

                {
                    errors.panCard && touched.panCard ? (
                        <p className={styles.formError}>{errors.panCard}</p>
                    ) : null
                }

                <button type='submit' className={styles.btn}>Submit</button>
            </form>
        </div>
    )
}

export default SalonOwnerDetails
