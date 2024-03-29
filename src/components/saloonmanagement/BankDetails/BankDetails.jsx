import styles from "../BankDetails/BankDetails.module.css";
import { Field, Formik, useFormik, Form, ErrorMessage } from "formik"
import { bankSchema } from "../../../utils/schema.js";
import { bankDetails } from "../../../api/account.api.js";

const initialValues = {
    accNum: "",
    accName: "",
    bankName: "",
    ifscCode: "",
    passbook: "",
};

function BankDetails() {

    const onSubmit = async (values) => {
        try {
            const { accNum, accName, bankName, ifscCode } = values
            const data = {
                "accountNumber": accNum,
                "accountHolderName": accName,
                "bankName": bankName,
                "ifscCode": ifscCode
            }
            console.log(values)
            // Call the bankDetails function
            const response = await bankDetails(data);
            console.log(response); // Assuming the response is logged by the bankDetails function
            console.log('Form submitted successfully');
            action.resetForm();
        } catch (error) {
            console.error('There was an error submitting the form:', error);
        }
    }

    return (
        <div className={styles.mainDiv}>
            <div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={bankSchema}
                    onSubmit={onSubmit}
                >
                    <Form>
                        <label className={styles.lab}> Account Number</label><br />
                        <Field
                            type='text'
                            placeholder='85651248769654'
                            name='accNum'
                            className={styles.inputs}
                        /><br />

                        <ErrorMessage name="accNum" className={styles.formError} component="div" />

                        <label className={styles.lab}> Account Holder Name</label><br />
                        <Field
                            type='text'
                            placeholder='Jhon'
                            name='accName'
                            className={styles.inputs}
                        />
                        <br />

                        <ErrorMessage name="accName" className={styles.formError} component="div" />

                        <label className={styles.lab}> Bank Name</label><br />
                        <Field
                            type='text'
                            placeholder='Jhon'
                            name='bankName'
                            className={styles.inputs}
                        /><br />

                        <ErrorMessage name="bankName" className={styles.formError} component="div" />

                        <label className={styles.lab}> IFSC Code</label><br />
                        <Field
                            type='text'
                            placeholder='Jhon'
                            name='ifscCode'
                            className={styles.ifsc}
                        /><br />
                          <ErrorMessage name="ifscCode" className={styles.formError} component="div"/>

                        <label for="passbook" className={styles.lab}> Passbook/Cancel Cheque</label><br />
                        <Field
                            type='file'
                            placeholder='Jhon'
                            name='passbook'
                            className={styles.passbook}
                        /><br />

                        <ErrorMessage name="passbook" className={styles.formError} component="div" />

                        <button type='submit' className={styles.btn}>Submit</button>
                    </Form>
                </Formik>

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