import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  phoneNumber: Yup.string()
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
  bankName: Yup.string().min(10).required("Please enter bank name"),
  accountHolderName: Yup.string().min(2).max(15).required("Please enter your name"),
  ifscCode: Yup.string()
  .matches(/^[A-Za-z]{4}[0][A-Z0-9a-z]{6}$/, 'Invalid IFSC code')
   .required("Please enter your IFSC code"),
    bankDocumentUrl: Yup.string().required("Please upload passbook image"),
});

export const businessDetailsSchema = Yup.object({
  name: Yup.string().min(2).max(15).required("Please enter your name"),
  companyName: Yup.string().min(5).max(15).required("Please enter company name"),
  pinCode: Yup.string().min(4).required("Please enter pin code"),
  city:Yup.string().min(2).required("Please select your city"),
  state:Yup.string().min(2).required("Please select your state"),
  serviceType:Yup.string().min(4).max(15).required("Please select your service"),
  address: Yup.string().min(5).max(100).required("Please enter your address"),
  panNumber: Yup.string()
  .matches(/[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid pan number')
  .required("Please enter your pan number"),
  gst: Yup.string()
  .matches(/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/, 'Invalid gst number') // Matches the GST format
  .required("Please enter your gst number"),
 mainGateUrl: Yup.string().required("Please upload main gate image"),
 bannerImages: Yup.string().required("Please upload banner image"),
 //bannerImages: Yup.array().min(1, "Please upload at least one banner image"),
 galleryImageUrl: Yup.string().required("Please upload gallery image"),
 
})

//const MIN_AGE = 18;
//const getMinDOBDate = () => {
 // const currentDate = new Date();
 // return new Date(currentDate.getFullYear() - MIN_AGE, currentDate.getMonth(), currentDate.getDate());
//};
//export const detailsSchema = Yup.object().shape({
  //name: Yup.string().min(2).max(15).required("Please enter first your name"),
  //  middleName:Yup.string().min(2).max(15)("Please enter  middle name"),
  //lastName: Yup.string().min(2).max(15).required("Please enter your last name"),
 // email: Yup.string().email().required("Please enter your email"),
  //serviceType: Yup.string().required("Please select your gender"),
 // phoneNumber: Yup.string().matches(/^[0-9]{10}$/, 'Invalid phone number').required("Please enter  phone number"),
 // dob: Yup.date()
 //   .max(getMinDOBDate(), `You must be at least ${MIN_AGE} years old`)
 //   .required("Date of birth is required"),
  //image: Yup.mixed().required('required')
  // image: Yup.mixed().test(
  //   "filePresent",
  //   "Image is required",
  //   function (value) {
  //     return !!value;
  //   }
  // )
//})

// salonDetails Schema

export const salonDetailsSchema = Yup.object({
  salonName: Yup.string().min(2).max(15).required("Please enter your name"),
  email: Yup.string().email().required("Please enter your email"),
  gstNumber: Yup.string().required("Please enter your GST Nuber"),
  address: Yup.string().min(5).max(100).required("Please enter your address"),
  salonStatePinCode: Yup.string().min(4).required("Please enter pin code"),
  // mystate : Yup.
  // services: Yup.string().required("Select any one option")
})

// SalonOwnerDetails Schema.
const MIN_AGE = 18;
const getMinDOBDate = () => {
  const currentDate = new Date();
  return new Date(currentDate.getFullYear() - MIN_AGE, currentDate.getMonth(), currentDate.getDate());
};
export const salonProfileSchema = Yup.object().shape({
  firstName: Yup.string().min(2).max(15).required("Please enter first your name"),
  lastName: Yup.string().min(2).max(15).required("Please enter your last name"),
  email: Yup.string().email().required("Please enter your email"),
  dataOfBirth: Yup.date()
 .max(getMinDOBDate(), `You must be at least ${MIN_AGE} years old`)
.required("Date of birth is required"),
 gender: Yup.string().required("Please select your gender"),
 panCardImageUrl: Yup.string().required("Please upload pan image"),
 aadharFrontUrl: Yup.string().required("Please upload aadhar front image"),
 aadharBackUrl: Yup.string().required("Please upload aadhar back image"),
 
})

//  Bank Details schema

export const bankSchema = Yup.object({
  accNum: Yup.string().min(11).max(16).required("Please enter valid Account Number"),
  accName: Yup.string().min(3).max(15).required("Please enter valid Account Name"),
  bankName: Yup.string().min(11).max(25).required("Enter  valid Bank Name"),
  ifscCode: Yup.string().matches(/^[A-Za-z]{4}[0][A-Z0-9a-z]{6}$/, 'Invalid IFSC code').required("Please enter valid IFSC code"),
 // passbook: Yup.mixed().required("Please upload a passbook image")
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
  category: Yup.string().min(3).max(15).required("Enter Valid Category"),
});

//add time
 export const addTimeSchema = Yup.object().shape({
  day: Yup.string().required('Day is required'),
  isOpen: Yup.string().required('IsOpen is required'),
  openTime: Yup.string()
    .required('OpenTime is required'),
   closeTime: Yup.string()
   .required('CloseTime is required'),
  
});

//add service

export const addServiceSchema = Yup.object().shape({
  serviceName: Yup.string().required('service name is required'),
  servicePrice: Yup.number().required('service price is required'),
  type: Yup.string().min(4).max(15).required("type is required"),
});
