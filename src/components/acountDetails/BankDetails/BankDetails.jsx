import React, { useState } from 'react';
import {Container} from "react-bootstrap";
import { GrFormUpload } from "react-icons/gr";
import styles from "./BankDetails.module.css";


import { useFormik } from "formik";

import {bankDetailsSchema} from "../../../utils/schema";
const initialValues = {
  accountNumber:"",
  accountHolderName:"",
  bankName:"",
  ifscCode:"",
}


const BankDetails = ({nextStep,prevStep}) => {
  const {values,errors,handleBlur,handleChange,handleSubmit,touched,isValid} = useFormik
  ({
    initialValues:initialValues,
    validationSchema:bankDetailsSchema,
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit:(values)=>{
      console.log(values)
      nextStep()
    }
})
   
   
    
const handleNext = () => {
  // Check if the form is valid before allowing navigation
  if (isValid) {
    nextStep();
  } else {
    alert("Please fill all required fields.");
  }
};
    
  return (
    <Container>
    
      <div className="d-flex flex-column align-items-center">
        <form className={styles.form} onSubmit={handleSubmit}>
        <div>
          <label className='fw-bold'>Account Number</label><br/>
          <input type='text'
          id="accountNumber"
          name="accountNumber"
          value={values.accountNumber}
          onChange={handleChange}
          onBlur={handleBlur} 
          />
        </div>
        {errors.accountNumber && touched.accountNumber?(
            <p className={styles.error}>{errors.accountNumber}</p>
          ):null}
        <div>
          <label className='fw-bold'>Account Holder Name</label><br/>
          <input 
           name="accountHolderName"
           value={values.accountHolderName}
           onChange={handleChange}
           onBlur={handleBlur} 
          />
        </div>
        {errors.accountHolderName && touched.accountHolderName?(
            <p className={styles.error}>{errors.accountHolderName}</p>
          ):null}
        <div>
          <label className='fw-bold'>Bank Name</label><br/>
          <input type='text'
           name="bankName"
           value={values.bankName}
           onChange={handleChange}
           onBlur={handleBlur} 
          />
        </div>
        {errors.bankName && touched.bankName?(
            <p className={styles.error}>{errors.bankName}</p>
          ):null}
        <div>
          <label className='fw-bold'>IFSC Code</label><br/>
          <input type='text'
           name="ifscCode"
           value={values.ifscCode}
           onChange={handleChange}
           onBlur={handleBlur} 
          />
        </div>
        {errors.ifscCode && touched.ifscCode?(
            <p className={styles.error}>{errors.ifscCode}</p>
          ):null}
        <div>
          <label className='fw-bold'>Passbook/Cancel Cheque</label><br/>
          <p>lorem ipsum</p>
          <input
              type="file"
              id="image"
              accept="image/*"
              style={{ display: "none" }}
              
            />
            <button
              className="align-items-center-start"
             
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
}

export default BankDetails;
