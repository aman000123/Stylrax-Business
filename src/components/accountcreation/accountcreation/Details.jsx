import client3 from "../../../assets/image/client3.svg";
import { Container } from "react-bootstrap";
import { IoCheckbox } from "react-icons/io5";
import { GrFormUpload } from "react-icons/gr";
import { detailsSchema } from "../../../utils/schema";
import styles from "./Details.module.css";
import PropTypes from 'prop-types';
import { createSalon, fileUploader } from "../../../api/account.api";
import Notify from "../../../utils/notify";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useRef, useState } from "react";

const initialValues = {
  name: "",
  middleName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  dob: "",
  aadharFrontUrl:"",
  gender:"",
};

const Details = ({ setShowServicePage }) => {
  const[selectedFile,setSelectedFile] = useState(null);
  const [url,setUrl] = useState("");
  console.log("url:::>",url)
  const [fileName, setFileName] = useState("");
  useEffect(()=>{
   
  },[])
  const fileInputRef = useRef(null);
  const handleFileChange = async(event) => {
    const file = event.target.files[0];
    console.log('Selected File 1:', file.name);
    
      // setSelectedFile(file);
      // setFileName(file?file.name:"");
      // console.log('Selected File:', file);
     const fileUrl =  await fileUploader({fileName:file.name });

     console.log("fileUrl:::>",fileUrl)

    uploadFileToS3(file.file,  fileUrl.data.url)
    
  };
  const handleUploadIconClick = () => {
    fileInputRef.current.click();
  };

  //File Upload to S3
  const uploadFileToS3 = async (file, url) => {
   
  try {
    const response = await fetch(url, {
      method: 'PUT',
      body: file
    });
    if (response.ok) {
      console.log('File uploaded successfully!');
    } else {
      console.error('Failed to upload file:', response.statusText);
    }
  } catch (error) {
    console.error('Error uploading file:', error);
  }
    console.log("File Upload response ", result)
  
  };


  const onSubmit = async (values) => {
    console.log("values:::>",values)
    try {
      const verifyForm = {
        profileType: "Salon",
        firstName: values.name,
        middleName: values.middleName,
        lastName: values.lastName,
        email: values.email,
        dataOfBirth: values.dob,
        gender: values.gender,
        aadharFrontUrl: values.aadharFrontUrl,
       // aadharFrontUrl: "someurl",
        aadharBackUrl: "someurl"
      };
      const res = await createSalon(verifyForm);
      setShowServicePage(true);
      createSalon.append(selectedFile)
      console.log("response:::>",res.data)
    } catch (error) {
      Notify.error(error.message);
    }
  };

  return (
    <Container>
      <div className="d-flex flex-column align-items-center">
        <div
          className={styles.main}
        >
          <div className="d-flex flex-column align-items-center mb-1">
            <img src={client3} className={styles.client} alt="client" />
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={detailsSchema}
            onSubmit={onSubmit}
          >
            <Form className="d-flex flex-column align-items-center">
              <div className="d-flex flex-column align-items-center-start mb-1">
                <label className="fw-bold">
                  First Name
                  <br />
                  <Field
                    name="name"
                    placeholder="Jhon"
                    className={styles.input}
                  />
                  <ErrorMessage
                    name="name"
                    className={styles.error}
                    component="div"
                  />
                </label>
              </div>
              <div className="d-flex flex-column align-items-center-start mb-1">
                <label className="fw-bold">
                  Middle Name
                  <br />
                  <Field
                    name="middleName"
                    placeholder="Optional"
                    className={styles.input}
                  />
                </label>
              </div>
             
              <div className="d-flex flex-column align-items-center-start mb-1">
                <label className="fw-bold">
                  Last Name
                  <br />
                  <Field
                    name="lastName"
                    placeholder="Abrahim"
                    className={styles.input}
                  />
                  <ErrorMessage
                    name="lastName"
                    className={styles.error}
                    component="div"
                  />
                </label>
              </div>
              <div className="d-flex flex-column align-items-center-start mb-1">
                <label className="fw-bold">
                  Email
                  <br />
                  <Field
                    name="email"
                    placeholder="Samplemail.com"
                    className={styles.input}
                  />
                   <IoCheckbox className={styles.calendar} />
                  <ErrorMessage
                    name="email"
                    className={styles.error}
                    component="div"
                  />
                </label>
              </div>
              <div className="d-flex flex-column align-items-center-start mb-1">
                <label className="fw-bold">
                  Date of Birth
                  <br />
                  <Field
                    type="date"
                    name="dob"
                    placeholder="Jhon"
                    className={styles.input}
                    max={new Date().toISOString().split("T")[0]}
                  />
                  <ErrorMessage
                    name="dob"
                    className={styles.error}
                    component="div"
                  />
                </label>
              </div>
              <div className="d-flex flex-column align-items-center-start mb-1">
                <label className="fw-bold">
                
                  Contact Number
                  <br />
                  <Field
                    name="phoneNumber"
                    placeholder="8318893508"
                    className={styles.number}
                  />
                  <ErrorMessage
                  component="div"
                    name="phoneNumber"
                    className={styles.error}
                  />
                </label>
              </div>
              <div className="d-flex flex-column align-items-center-start mb-1">
                <label className="fw-bold">
                  Gender
                  <br />
                   <Field
                   as="select"
                    name="gender"
                    // placeholder="select"
                    className={styles.input}
                  >
                  <option value="">select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  </Field> 
                
                  <ErrorMessage
                    name="gender"
                    className={styles.error}
                    component="div"
                  />
                </label>
              </div>
              <div className="d-flex flex-column align-items-center-start mb-1">
              <label className="fw-bold ">
                Adhar Card Image
                <br />
                <div className="d-flex">
                  <label className={styles.front}>
                    Front
                    <br />
                    <div>
                      <input
                      
                        type="file"
                        name="aadharFrontUrl"
                        ref={fileInputRef}
                        //  style={{ display: "none" }}
                         onChange={handleFileChange}
                      />
                      
                      <br />
                    
                      {/* <button
              
                        className={`${styles.btn} align-items-center-start`}
                      
                        onClick={handleUploadIconClick}
                        type="button"

                      > */}
                        {/* <GrFormUpload className={styles.uploadIcon} />
                        Upload
                       
                      </button> */}
                      <ErrorMessage
                    component="div"
                    name="aadharFrontUrl"
                    className={styles.error}
                  /> 
                     
                    </div>
                    <span>{fileName}</span>
                  </label>
                  
                  <label className={styles.back}>
                    Back
                    <br />
                    <input
                      type="file"
                      name="aadharFrontUrl"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleUploadIconClick}
                    
                    />
                    <br />
                    <button
                      className={`${styles.btn} align-items-center-start`}
                      onClick={handleUploadIconClick}
                     type="button"
                    >
                      <GrFormUpload className={styles.uploadIcon} />
                      Upload
                    </button>
                  </label>
                  <span>{fileName}</span>
                </div>
              </label>
            </div>

            <div className="d-flex flex-column align-items-center-start mb-1">
              <label className="fw-bold">
                Pan Card
                <br />
                <p className={styles.panCard}>
                
                  <br />
                  <input
                    type="file"
                    ref={fileInputRef}
                    //style={{ display: "none" }}
                 //   onChange={handleChange}
                    className={styles.fileUpload}
                  />
                  <button className={styles.panBtn}>
                    <GrFormUpload className={styles.uploadIcon} />
                    Upload
                  </button>
                </p>
              </label>
            </div>
              {/* Other form fields */}
              <div className="d-flex flex-column align-items-center">
                <button type="submit" className={styles.continue}>
                  Continue
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </Container>
  );
};

Details.propTypes = {
  setShowServicePage: PropTypes.func.isRequired,
};

export default Details;
