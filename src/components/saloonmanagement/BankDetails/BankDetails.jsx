import styles from "../BankDetails/BankDetails.module.css";
import { useFormik } from "formik"
import {  bankSchema } from "../../../utils/schema.js";
const initialValues = {
    accNum: "",
    accName: "",
    bankName: "",
    ifscCode: "",
    passbook: "",
};

function BankDetails() {

    const { values, errors, touched, handleBlurr, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema: bankSchema,
        onSubmit: async () => {
            // try {
            //     // Call the bankDetails function
            //     const response = await bankDetails(values);
            //     console.log(response); // Assuming the response is logged by the bankDetails function

            //     console.log('Form submitted successfully');
            //     action.resetForm();
            // } catch (error) {
            //     console.error('There was an error submitting the form:', error);
            // }
        }
    });

 

    return (
        <div className={styles.mainDiv}>
            <div>
                <form onSubmit={handleSubmit}>
                    <label  className={styles.lab}> Account Number</label><br />
                    <input
                        type='text'
                        placeholder='85651248769654'
                        name='accNum'
                        id='accNum'
                        className={styles.inputs}
                        value={values.accNum}
                        onChange={handleChange}
                        onBlur={handleBlurr}
                    /><br />
                    {
                        errors.accNum && touched.accNum ? (
                            <p className={styles.formError}>{errors.accNum}</p>
                        ) : null
                    }

                    <label  className={styles.lab}> Account Holder Name</label><br />
                    <input
                        type='text'
                        placeholder='Jhon'
                        name='accName'
                        id='accName'
                        className={styles.inputs}
                        value={values.accName}
                        onChange={handleChange}
                        onBlur={handleBlurr}
                    />
                    <br />
                    {
                        errors.accName && touched.accName ? (
                            <p className={styles.formError}>{errors.accName}</p>
                        ) : null
                    }

                    <label  className={styles.lab}> Bank Name</label><br />
                    <input
                        type='text'
                        placeholder='Jhon'
                        name='bankName'
                        id='bankName'
                        className={styles.inputs}
                        value={values.bankName}
                        onChange={handleChange}
                        onBlur={handleBlurr}
                    /><br />

                    {
                        errors.bankName && touched.bankName ? (
                            <p className={styles.formError}>{errors.bankName}</p>
                        ) : null
                    }

                    <label  className={styles.lab}> IFSC Code</label><br />
                    <input
                        type='text'
                        placeholder='Jhon'
                        name='ifscCode'
                        id='ifscCode'
                        className={styles.ifsc}
                        value={values.ifscCode}
                        onChange={handleChange}
                        onBlur={handleBlurr}
                    /><br />

                    {
                        errors.ifscCode && touched.ifscCode ? (
                            <p className={styles.formError}>{errors.ifscCode}</p>
                        ) : null
                    }



                    {/* <label for="passbook" className={styles.lab}> Passbook/Cancel Cheque</label><br />
                    <input
                        type='text'
                        placeholder='Jhon'
                        name='passbook'
                        id='passbook'
                        className={styles.passbook}
                        value={values.passbook}
                        onChange={handleChange}
                        onBlur={handleBlurr}
                    /><br />

                    {
                        errors.passbook && touched.passbook ? (
                            <p className={styles.formError}>{errors.passbook}</p>
                        ) : null
                    } */}

                    <button type='submit' className={styles.btn}>Submit</button>
                </form>
            </div>

            {/* <div className={styles.text}>
                <span>Edit</span>
                <MdEdit className={styles.icon} />
            </div> */}


        </div>
    )
}

export default BankDetails;



   // const { values, errors, touched, handleBlurr, handleChange, handleSubmit } = useFormik({
    //     initialValues,
    //     validationSchema: bankSchema,
    //     onSubmit: (values, action) => {
    //         console.log(values);
    //         action.resetForm();
    //     }
    // });

    // console.log(errors);