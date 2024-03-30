import styles from "../SalonOwnerDetails/SalonOwnerDetails.module.css";
import salonownerdetailimg from "../../../assets/image/salonownerdetailimg.png";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { salonOwnerDetails } from "../../../utils/schema.js";
import { salonownerDetails, fileUploader } from "../../../api/account.api.js";
import { GrFormUpload } from "react-icons/gr";
import { useEffect, useRef, useState } from "react";


const initialValues = {
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    dob: "",
    gender: ""
};


function SalonOwnerDetails() {
    
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
                "profileType": "Salon",
                "firstName": values.firstName,
                "middleName": values.middleName,
                "lastName": values.lastName,
                "email": values.email,
                "dataOfBirth": values.dob,
                "gender": values.gender,
                "panCardImageUrl": "someurl",
                "aadharFrontUrl": "someurl",
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
                    </label><br />

                    <label className={styles.lab}> Aadhar Card</label><br />
                    <div className={styles.aadhar}>
                        <label className={styles.front}>
                            <span>Aadhar Front</span>
                            <br />
                            <button
                                className={`${styles.Btn} align-items-center-start`}
                                onClick={handleUploadIconClick}
                                type="button"
                            >
                                <input
                                    id="image"
                                    type="file"
                                    name="aadhar-front"
                                    ref={fileInputRef}
                                    style={{ display: "none" }}
                                    onChange={handleFileChange}
                                />
                                <br />
                                <GrFormUpload className={styles.uploadIcon} />
                                Upload
                            </button>
                        </label><br />

                        <label className={styles.back}>
                            Aadhar Back<br />
                            <button
                                className={`${styles.Btn} align-items-center-start`}
                                onClick={handleUploadIconClick}
                                type="button"
                            >
                                <input
                                    type="file"
                                    name="aadhar-back"
                                    ref={fileInputRef}
                                    style={{ display: "none" }}
                                    onChange={handleFileChange}
                                />
                                <br />
                                <GrFormUpload className={styles.uploadIcon} />
                                Upload
                            </button>
                        </label>

                    </div>



                    <label className={styles.lab}>
                        Pan Card
                        <button
                            className={`${styles.Btn} align-items-center-start`}
                            onClick={handleUploadIconClick}
                            type="button"
                        >
                            <input
                                type="file"
                                name="image"
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
    )
}

export default SalonOwnerDetails
