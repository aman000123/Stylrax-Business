import styles from "../BankDetails/BankDetails.module.css";
import { Field, Formik, Form, ErrorMessage } from "formik"
import { bankSchema } from "../../../utils/schema.js";
import { bankDetails , fileUploader } from "../../../api/account.api.js";
import { GrFormUpload } from "react-icons/gr";
import { useEffect, useRef, useState } from "react";

const initialValues = {
    accNum: "",
    accName: "",
    bankName: "",
    ifscCode: ""
};

function BankDetails() {

    const [selectedFile, setSelectedFile] = useState(null);
    const [url, setUrl] = useState("");
    console.log("url:::>", url);
    const [fileName, setFileName] = useState("");
    useEffect(() => { }, []);
    const fileInputRef = useRef(null);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        console.log("Selected File 1:", file.name);
        const fileUrl = await fileUploader({ fileName: file.name });
        console.log("fileUrl:::>", fileUrl);
        uploadFileToS3(file, fileUrl.data.url);
        // onSubmit(fileUrl);
    };
    const handleUploadIconClick = () => {
        fileInputRef.current.click();
    };

    //File Upload to S3
    const uploadFileToS3 = async (file, url) => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const requestOptions = {
                method: "PUT",
                body: file,
                headers: {
                    "Content-Type": file.type,
                },
            };
            await fetch(url, requestOptions);
        } catch (error) {
            Notify.error("Error uploading file:", error);
        }
    };

    const onSubmit = async (values) => {
        try {
            const data = {
                "accountNumber": values.accNum,
                "accountHolderName": values.accName,
                "bankName": values.bankName,
                "ifscCode": values.ifscCode
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
                        <ErrorMessage name="ifscCode" className={styles.formError} component="div" />
 
                        <label className={styles.lab}>
                            Passbook/Cancel cheque
                            <br />
                            <button
                                className={`${styles.Btn} align-items-center-start`}
                                onClick={handleUploadIconClick}
                                type="button"
                            >
                                <input
                                    type="file"
                                    name="passbook"
                                    ref={fileInputRef}
                                    style={{ display: "none" }}
                                    onChange={handleFileChange}
                                />
                                <br />
                                <GrFormUpload className={styles.uploadIcon} />
                                Upload
                            </button>

                        </label><br /> 

                        <button type='submit' className={styles.btn}>Submit</button>
                    </Form>
                </Formik>

            </div>
        </div>
    )
}

export default BankDetails;