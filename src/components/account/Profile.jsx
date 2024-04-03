import { Form, Formik } from "formik";
import { Container } from "react-bootstrap";

import { salonProfileSchema } from "../../utils/schema";
import {  getPresignedUrl } from "../../api/file.api";
import { InputText, InputSelect, InputFile, Label } from "../../ux/controls";

import client3 from "../../assets/image/client3.svg";
import styles from "./account.module.css";
import Section from "../../ux/Section";
import Notify from "../../utils/notify";
import FormContainer from "./FormContainer";


const initialValues = {
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dataOfBirth: "",
    gender: "",
    aadharFrontUrl: "",
    aadharBackUrl: "",
    panUrl: ""
    
};

//Gender List for dropdown
const genderOptions = [
    { value: "", text: "Select" },
    { value: "male", text: "Male" },
    { value: "female", text: "Female" },
    { value: "other", text: "Other" }
]

const Profile = ({onContinue}) => {
    // //File Upload to S3
    const uploadFileToS3 = async (file, url) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const requestOptions = {
                method: 'PUT',
                body: file,
                headers: {
                    'Content-Type': file.type,
                }
            };
            await fetch(url, requestOptions);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };


    const handleOnSubmit = async (values) => {
        console.log(values)
        onContinue(values);
    };

    const handleOnFileSelect = async(file, type, setFieldValue) => {
        if (!file){
            setFieldValue(type, "");
        }else{
         const fileUrl = await getPresignedUrl({ fileName: file.name });
         setFieldValue(type, fileUrl.data.path);
         uploadFileToS3(file, fileUrl.data.url);
        }
             
    }

    return (
        <Container>
            <Section className="d-flex flex-column align-items-center">
                <FormContainer>
                    <Section className="d-flex flex-column align-items-center mb-1">
                        <img src={client3} className={styles.client} alt="client" />
                    </Section>
                    <Formik
                        initialValues={initialValues}
                       
                        onSubmit={handleOnSubmit}
                    >
                        {({ setFieldValue }) => (
                            <Form className="d-flex flex-column">
                            <InputText type="text" name="firstName" label="First Name" placeholder="Jhon" />
                            <InputText type="text" name="middleName" label="Middle Name" placeholder="Optional" />
                            <InputText type="text" name="lastName" label="Last Name" placeholder="Abrahim" />
                            <InputText type="email" name="email" label="Email" placeholder="Samplemail.com" />
                            <InputText type="date" name="dataOfBirth" label="Date of Birth" max={new Date().toISOString().split("T")[0]} />
                            <InputText type="text" name="phoneNumber" label="Contact Number" placeholder="8318893508" />
                            <InputSelect name="gender" label="Gender" options={genderOptions} />
                            <Section className="d-flex flex-column align-items-start mb-1">
                                <Label text="Aadhar Card" />
                                <InputFile name="aadharFrontUrl" helperText="Front" onFileSelect={(e)=>handleOnFileSelect(e,"aadharFrontUrl", setFieldValue)} />
                                <InputFile name="aadharBackUrl" helperText="Back" onFileSelect={(e)=> handleOnFileSelect(e, "aadharBackUrl", setFieldValue)} />
                            </Section>
                            <Section className="d-flex flex-column align-items-start mb-4">
                                <InputFile name="panUrl" label="Pan Card" onFileSelect={(e)=> handleOnFileSelect(e, "panUrl", setFieldValue)} />
                            </Section>
                            <Section className="d-flex flex-column align-items-center">
                                <button type="submit" className={styles.registration__submit_button}>
                                    Continue
                                </button>
                            </Section>
                        </Form>
                        )}
                    </Formik>
                </FormContainer>
            </Section>
        </Container>

    );
};

export default Profile;