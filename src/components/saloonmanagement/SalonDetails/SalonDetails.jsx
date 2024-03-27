import styles from "../SalonDetails/SalonDetails.module.css";
import salondetailimg from "../../../assets/image/salondetailimg.png";
// import { MdEdit } from "react-icons/md";
import { useFormik } from "formik"
import { salonDetailsSchema } from "../../../utils/schema.js";
import { salonDetails } from "../../../api/account.api.js";

const initialValues = {
    salonName: "",
    email: "",
    gstNumber: "",
    address: "",
    salonStatePinCode: "",
    mystate: "",
    services: "",
};

function SalonDetails() {

    const { values, errors, touched, handleBlurr, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema: salonDetailsSchema,
        onSubmit: async () => {
            try {
                // const {accNum, accName, bankName, ifscCode} = values
                const data = {
                        "name":values.salonName,
                        "email":values.email,
                        "gstNumber":values.gstNumber,
                        "companyName":"",
                        "address":values.address,
                        "latitude":"",
                        "longitude":"",
                        "city":"",
                        "state":values.mystate,
                        "pincode":values.salonStatePinCode,
                        "serviceType":values.services,
                        "homeService":"",
                        "mainGateImageUrl":"",
                        "bannerImages":"",
                        "gallaryImages":""
                }
                // Call the bankDetails function
                const response = await salonDetails(data);
                console.log(response); // Assuming the response is logged by the bankDetails function
                console.log('Form submitted successfully');
                action.resetForm();
            } catch (error) {
                console.error('There was an error submitting the form:', error);
            }
        }
    });
    console.log(errors);

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

            <form className={styles.forms} onSubmit={handleSubmit}>
                <label  className={styles.lab}> Salon Name</label><br />
                <input
                    type='textarea'
                    placeholder='Jhon'
                    name='salonName'
                    id='salonName'
                    className={styles.inputs}
                    value={values.salonName}
                    onChange={handleChange}
                    onBlur={handleBlurr}
                /><br />

                {
                    errors.salonName && touched.salonName ? (
                        <p className={styles.formError}>{errors.salonName}</p>
                    ) : null
                }

                <label  className={styles.lab}> Email Id</label><br />
                <input
                    type='email'
                    placeholder='Jhon'
                    name='email'
                    id="email"
                    className={styles.inputsTwo}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlurr}
                /><br />

                {
                    errors.email && touched.email ? (
                        <p className={styles.formError}>{errors.email}</p>
                    ) : null
                }

                <label  className={styles.lab}> Gst Number</label><br />
                <input
                    type='text'
                    placeholder='Jhon'
                    name='gstNumber'
                    id="gstNumber"
                    className={styles.inputs}
                    value={values.gstNumber}
                    onChange={handleChange}
                    onBlur={handleBlurr}
                /><br />
                {
                    errors.gstNumber && touched.gstNumber ? (
                        <p className={styles.formError}>{errors.gstNumber}</p>
                    ) : null
                }

                <label  className={styles.lab}> Address</label><br />
                <input
                    type='text'
                    placeholder='Jhon'
                    name='address'
                    id="address"
                    className={styles.inputsTwo}
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlurr}
                /><br />

                {
                    errors.address && touched.address ? (
                        <p className={styles.formError}>{errors.address}</p>
                    ) : null
                }

                <label  className={styles.lab}> Salon State</label><br />
                <select
                    name='mystate'
                    id="mystate"
                    className={styles.inputsThree}
                    value={values.mystate}
                    onChange={handleChange}
                    onBlur={handleBlurr}
                >
                    <option value="uttarPradesh">Uttar Pradesh</option>
                    <option value="madhyaPradesh">Madhya Pradesh</option>
                    <option value="chattishgarh">Chattisgarh</option>
                    <option value="harayana">Haryana</option>
                    <option value="arunachalPradesh">Arunachal Pradesh</option>
                </select><br />

                <label  className={styles.lab}> Salon State pincode</label><br />
                <input
                    type='text'
                    placeholder='209625'
                    name='salonStatePinCode'
                    id="salonStatePinCode"
                    className={styles.inputsThree}
                    value={values.salonStatePinCode}
                    onChange={handleChange}
                    onBlur={handleBlurr}
                /><br />
                 {
                    errors.salonStatePinCode && touched.salonStatePinCode ? (
                        <p className={styles.formError}>{errors.salonStatePinCode}</p>
                    ) : null
                }

                <label  className={styles.lab}> Services For</label><br />
                <select
                    name='services'
                    id="services"
                    className={styles.inputsThree}
                    value={values.services}
                    onChange={handleChange}
                    onBlur={handleBlurr}
                >
                    <option value="uttarPradesh">Uttar Pradesh</option>
                    <option value="madhyaPradesh">Madhya Pradesh</option>
                    <option value="chandigarh">Chattisgarh</option>
                    <option value="harayana">Haryana</option>
                    <option value="arunachalPradesh">Arunachal Pradesh</option>
                </select><br />

                <button type='submit' className={styles.btn}>Submit</button>
            </form>
        </div>
    )
}

export default SalonDetails
