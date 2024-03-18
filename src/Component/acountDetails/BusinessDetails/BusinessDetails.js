import React, { useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { GrFormUpload } from "react-icons/gr";
import styles from "./BusinessDetails.module.css";
import Notify from "../../../utils/notify";
import { useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import {businessDetailsSchema} from "../../../utils/schema";
import { Salon } from "../../../api/account.api";

const states = ["Select State", "Alabama", "Alaska"];
const cities = {
  "Select State": ["Select City"],
  Alabama: ["Select City", "Birmingham", "Montgomery"],
  Alaska: ["Select City", "Anchorage", "Fairbanks"],
};
const validatePAN = (value) => {
  const panRegex = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

  if (!value) {
    return 'PAN number is required';
  } else if (!panRegex.test(value)) {
    return 'Invalid PAN number';
  }

  return undefined;
};
const initialValues = {
  name:"",
  email:"",
  gst:"",
  companyName:"",
  pinCode:"",
  gender:"",
  city:"",
  state:"",
  address:"",
  panNumber:"",
  // validate: (values) => {
  //   const errors = {};

  //   if (!values.panNumber) {
  //     errors.panNumber = 'PAN number is required';
  //   } else {
  //     const panError = validatePAN(values.panNumber);
  //     if (panError) {
  //       errors.panNumber = panError;
  //     }
  //   }

  //   return errors;
  // },
}

const BusinessDetails = ({nextStep,prevStep}) => {
  const {values,errors,handleBlur,handleChange,handleSubmit,touched,isValid} = useFormik
  ({
    initialValues:initialValues,
    validationSchema:businessDetailsSchema,
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit:(values)=>{
      console.log(values)
      nextStep()
    }
})
  const [selectedCity, setSelectedCity] = useState("Select City");
  const [selectedState, setSelectedState] = useState("Select State");
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const handleStateChange = (event) => {
    const state = event.target.value;
    setSelectedState(state);
  };
  const handleUploaded = () => {
    fileInputRef.current.click();
  };
  const handleCityChange = (event) => {
    const city = event.target.value;
    setSelectedCity(city);
  };
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  
  //const formSubmit = async(event)=>{
   // event.preventDefault();
   
      //console.log("data");
     // try{
      //  setIsSubmitting(true);
       // const verifyForm ={
    // name:values.name,
    //email:values.email,
    //gstNumber:values.gstNumber,
    //companyName:values.companyName,
    //address:values.address,
            // gender:"Male",
            // panCardImageUrl:"someurl",
            // aadharFrontUrl:"someurl",
            // aadharBackUrl:"someurl",
            // profileImageUrl:"someUrl",
            // serviceType:"Male"
        
       // }
        //const res= await Salon(verifyForm);
        //console.log("Business api data",res)
        //if(res.data.statusCode == "200"){
          //navigate('/salon-dashboard')
          //nextStep()
       // }
      //} catch (error){
       // Notify.error(error.message);
    //  } finally {
        //setIsSubmitting(false);
      //}}
  return (
    <Container>
   
      <div className="d-flex flex-column align-items-center">
        <form className={styles.form} onSubmit={handleSubmit}>
          <div>
            <label className="fw-bold">Name</label>
            <br />
            <input type="text"
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur} />
          </div>
          {errors.name && touched.name?(
            <p className={styles.error}>{errors.name}</p>
          ):null}
          <div>
            <label className="fw-bold">Email</label>
            <br />
            <input id="email" name="email"
             value={values.email}
             onChange={handleChange}
             onBlur={handleBlur} 
             />
          </div>
          {errors.email && touched.email?(
            <p className={styles.error}>{errors.email}</p>
          ):null}
          <div>
            <label className="fw-bold">GST Number</label>
            <br />
            <input type="gst"name="gst"
            value={values.gst}
            onChange={handleChange}
            onBlur={handleBlur} 
             />
          </div>
          {errors.gst && touched.gst?(
            <p className={styles.error}>{errors.gst}</p>
          ):null}
          <div>
            <label className="fw-bold">Company Name</label>
            <br />
            <input type="text" 
            name="companyName"
             value={values.companyName}
             onChange={handleChange}
             onBlur={handleBlur} 
            />
          </div>
          {errors.companyName && touched.companyName?(
            <p className={styles.error}>{errors.companyName}</p>
          ):null}
          <div>
            <label className="fw-bold">Pan Number</label>
            <br />
            <input 
              type="text"
              id="panNumber"
              name="panNumber"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.panNumber}
             />
          </div>
          {errors.panNumber && touched.panNumber?(
            <p className={styles.error}>{errors.panNumber}</p>
          ):null}
          <div>
            <label className="fw-bold">Salon Address</label>
            <br />
            <textarea type="address" className={styles.textarea} 
            name="address"
            value={values.address}
            onChange={handleChange}
            onBlur={handleBlur} 
            />
          </div>
          {errors.address && touched.address?(
            <p className={styles.error}>{errors.address}</p>
          ):null}
          <div>
            <label className="fw-bold">Salon City</label>
            <br />
            <select value={selectedCity} onChange={handleCityChange}
            name="city"
             onBlur={handleBlur} 
            >
              {cities[selectedState].map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
           
          </div>
          {/* {errors.city && touched.city?(
            <p className={styles.error}>{errors.city}</p>
          ):null} */}
          <div>
            <label className="fw-bold">Salon State</label>
            <br />
            <select
              value={selectedState}
              onChange={handleStateChange}
              className={styles.state}
              name="state"
            >
              {states.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          {/* {errors.state && touched.state?(
            <p className={styles.error}>{errors.state}</p>
          ):null} */}
          <div>
            <label className="fw-bold">Pin Code</label>
            <br />
            <input name="pinCode" placeholder="209861" className="ps-2"
            value={values.pinCode}
            onChange={handleChange}
            onBlur={handleBlur} 
             />
          </div>
          {errors.pinCode && touched.pinCode?(
            <p className={styles.error}>{errors.pinCode}</p>
          ):null}
          <div>
            <label className="fw-bold">
              Services For
              <br />
              <select
                id="dropdown"
                value={selectedOption}
                onChange={handleOptionChange}
                className={styles.dropDown}
                name="gender"
              >
                <option
                  value="option1"
                  className="d-flex flex-column align-items-center-start"
                >
                  Male
                </option>
                <option value="option2">Female</option>
                <option value="option3">Others</option>
              </select>
            </label>
          </div>
         
          <div>
            <label className="fw-bold">Salon Main Gate Image</label>
            <p>lorem ipsum</p>
            <input
              type="file"
              id="image"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <button
              className="align-items-center-start"
              onClick={handleUploaded}
            >
              <GrFormUpload />
              Upload
            </button>
          </div>
          <div>
            <label className="fw-bold">Pan Card</label>
            <p>lorem ipsum</p>
            <input
              type="file"
              id="image"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <button
              className="align-items-center-start"
              onClick={handleUploaded}
            >
              <GrFormUpload />
              Upload
            </button>
          </div>
          <div>
            <label className="fw-bold">Salon Gallery</label>
            <p>lorem ipsum</p>
            <input
              type="file"
              id="image"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <button
              className="align-items-center-start"
              onClick={handleUploaded}
            >
              <GrFormUpload />
              Upload
            </button>
          </div>
          <div>
          <button className={styles.continue}
          type="submit"
          
          >Continue</button>
          {/* <button className={styles.continue} onClick={handleButton}>Continue</button> */}
          </div>
        </form>
      </div>
       
    </Container>
  );
};

export default BusinessDetails;
