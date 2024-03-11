import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
      phoneNumber: Yup.string()
      .matches(/^\d{10}$/, "Invalid phone number")
      .required("Phone number is required"),
  });

 export const bankDetailsSchema = Yup.object({
    accountNumber: Yup.string()
    .matches(/^\d{9,18}$/, 'Account number must be between 9 and 18 digits') 
    .required("Please enter your account number"),
     bankName:Yup.string().min(2).max(15).required("Please enter bank name"),
     accountHolderName:Yup.string().min(2).max(15).required("Please enter your name"),
     ifscCode: Yup.string()
    .matches(/^[A-Za-z]{4}[0][A-Z0-9a-z]{6}$/, 'Invalid IFSC code') 
    .required("Please enter your IFSC code"),
});

export const businessDetailsSchema = Yup.object({
  name:Yup.string().min(2).max(15).required("Please enter your name"),
  email:Yup.string().email().required("Please enter your email"),
  companyName:Yup.string().min(5).max(15).required("Please enter company name"),
  pinCode:Yup.string().min(4).required("Please enter pin code"),
  city:Yup.string().min(2).max(15).required("Please select your city"),
  state:Yup.string().min(2).required("Please select your state"),
  gender:Yup.string().min(5).max(15).required("Please select your gender"),
  address:Yup.string().min(5).max(100).required("Please enter your address"),
  panNumber: Yup.string()
  .matches(/[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid pan number')
  .required("Please enter your pan number"),
  gst: Yup.string()
  .matches(/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/, 'Invalid gst number') // Matches the GST format
  .required("Please enter your gst number"),
  })

  export const detailsSchema = Yup.object().shape({
      name:Yup.string().min(2).max(15).required("Please enter your name"),
      middleName:Yup.string().min(2).max(15).required("Please enter  middle name"),
      lastName:Yup.string().min(2).max(15).required("Please enter your last name"),
      email:Yup.string().email().required("Please enter your email"),
      gender:Yup.string().min(5).max(15).required("Please select your gender"),
      phoneNumber: Yup.string().matches(/^[0-9]{10}$/, 'Invalid phone number').required("Please enter  phone number"),
      dob: Yup.date().max(new Date(), 'Date of birth must be in the past').required("Please enter your DOB"),
     
   } )
   
   
