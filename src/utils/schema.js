import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    //.matches(/^[0-9]{10}$/, "Invalid phone number")
    .matches(/^\d{10}$/, "Invalid phone number")    
    .required("Phone number is required"),
});

  export const OTPSchema = Yup.object().shape({
       otp: Yup.string()
      .matches(/^\d{4}$/, "OTP must be 4 digits")
      .required("OTP is required"),
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
 // city:Yup.string().min(2).max(15).required("Please select your city"),
  //state:Yup.string().min(2).required("Please select your state"),
  //gender:Yup.string().min(5).max(15).required("Please select your gender"),
  address:Yup.string().min(5).max(100).required("Please enter your address"),
  panNumber: Yup.string()
  .matches(/[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid pan number')
  .required("Please enter your pan number"),
  gst: Yup.string()
  .matches(/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/, 'Invalid gst number') // Matches the GST format
  .required("Please enter your gst number"),
 
  })

  const MIN_AGE = 18;
  const getMinDOBDate = () => {
    const currentDate = new Date();
    return new Date(currentDate.getFullYear() - MIN_AGE, currentDate.getMonth(), currentDate.getDate());
  };
  export const detailsSchema = Yup.object().shape({
      name:Yup.string().min(2).max(15).required("Please enter first your name"),
    //  middleName:Yup.string().min(2).max(15)("Please enter  middle name"),
      lastName:Yup.string().min(2).max(15).required("Please enter your last name"),
      email:Yup.string().email().required("Please enter your email"),
      gender:Yup.string().required("Please select your gender"),
      phoneNumber: Yup.string().matches(/^[0-9]{10}$/, 'Invalid phone number').required("Please enter  phone number"),
      dob: Yup.date()
      .max(getMinDOBDate(), `You must be at least ${MIN_AGE} years old`)
      .required("Date of birth is required"),
      //image: Yup.mixed().required('required')
      // image: Yup.mixed().test(
      //   "filePresent",
      //   "Image is required",
      //   function (value) {
      //     return !!value;
      //   }
      // )
   } )

   // salonDetails Schema

   export const salonDetailsSchema = Yup.object({
    salonName: Yup.string().min(3).max(15).required("Please enter your Salon name"),
    email: Yup.string().email().required("Please enter your email"),
    gstNumber: Yup.string().required("Please enter valid gst number "),
    address: Yup.string().min(5).max(100).required("Please enter your address"),
    salonStatePinCode : Yup.string().min(4).required("Please enter pin code"),
    state: Yup.string().required("Please select any one option"),
    services: Yup.string().required("Select any one option")
   })

   // SalonOwnerDetails Schema.

   export const salonOwnerDetails = Yup.object({
    firstName: Yup.string().min(2).max(15).required("Please enter your First Name"),
    middleName: Yup.string().min(2).max(15).required("Please enter your Middle Name"),
    lastName: Yup.string().min(2).max(15).required("Please enter your Last Name"),
    email: Yup.string().email().required("Please enter your email"),
    dob: Yup.date().max(new Date(), 'Date of birth must be in the past').required("Please enter your DOB"),
    gender: Yup.string().min(4).max(15).required("Please select your gender"),
    // aadharCard: Yup.mixed()
    // .required('Aadhar card photo is required')
    // .test('fileType', 'Only JPG, JPEG, or PNG files are allowed', (value) => {
    //   if (value) return true; // allow empty value
    //   return (
    //     value && ['image/jpeg', 'image/jpg', 'image/png'].includes(value.type)
    //   );
    // }),
    // panCard: Yup.mixed()
    // .required('PAN card photo is required')
    // .test('fileType', 'Only JPG, JPEG, or PNG files are allowed', (value) => {
    //   if (value) return true; // allow empty value
    //   return (
    //     value && ['image/jpeg', 'image/jpg', 'image/png'].includes(value.type)
    //   );
    // }),

   })

  //  Bank Details schema
  
  export const bankSchema = Yup.object({
    accNum: Yup.string().min(11).max(16).required("Please enter valid Account Number"),
    accName: Yup.string().min(3).max(15).required("Please enter valid Account Name"),
    bankName: Yup.string().min(11).max(25).required("Enter  valid Bank Name"),
    ifscCode: Yup.string().matches(/^[A-Za-z]{4}[0][A-Z0-9a-z]{6}$/, 'Invalid IFSC code').required("Please enter valid IFSC code"),
  //   passbook: Yup.mixed().test('fileSize', "Passbook file is too large", value => {
  //     if (value) {
  //         return value.size <= 1024 * 1024; // 1MB
  //     }
  //     return true;
  // }).test('fileType', "Invalid file format for passbook", value => {
  //     if (value) {
  //         return ['image/jpeg', 'image/png', 'application/pdf'].includes(value.type);
  //     }
  //     return true;
  // }).required("Please upload a passbook image")
  });

//   export const bankSchema = Yup.object({
//     accNum: Yup.string().min(11, 'Account Number must be at least 11 characters').max(16, 'Account Number must be at most 16 characters').required("Please enter a valid Account Number"),
//     accName: Yup.string().min(3, 'Account Name must be at least 3 characters').max(50, 'Account Name must be at most 50 characters').required("Please enter a valid Account Name"),
//     bankName: Yup.string().min(3, 'Bank Name must be at least 3 characters').max(50, 'Bank Name must be at most 50 characters').required("Please enter a valid Bank Name"),
//     ifscCode: Yup.string().matches(/^[A-Za-z]{4}[0][A-Z0-9a-z]{6}$/, 'Invalid IFSC code').required("Please enter a valid IFSC code"),
// });

  // Add staff schema

  export const addStaffSchema = Yup.object({
    name: Yup.string().min(3).max(15).required("Please enter valid Account Name"),
    mobileNumber: Yup.string().matches(/^[0-9]{10}$/, 'Invalid phone number').required("Please enter  phone number"),
    dob: Yup.date().max(new Date(), 'Date of birth must be in the past').required("Please enter your DOB"),
    email: Yup.string().email().required("Please enter your email"),
    gender: Yup.string().min(4).max(15).required("Please select your gender"),
    category:Yup.string().min(3).max(15).required("Enter Valid Category"),
  });
   
