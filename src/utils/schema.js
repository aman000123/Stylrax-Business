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
  .matches(/^[0-9]+$/, "Account number must contain only digits")
  .required("Please enter your account number"),
  bankName: Yup.string().required("Please enter bank name"),
  accountHolderName: Yup.string().required("Please enter your name"),
  ifscCode: Yup.string()
  .matches(/^[A-Za-z]{4}[0][A-Z0-9a-z]{6}$/, 'Invalid IFSC code')
   .required("Please enter your IFSC code"),
    bankDocumentUrl: Yup.string().required("Please upload passbook image"),
});

export const businessDetailsSchema = Yup.object({
  name: Yup.string().required("Please enter your name"),
  companyName: Yup.string().required("Please enter company name"),
  pinCode: Yup.string().required("Please enter pin code"),
  city:Yup.string().required("Please select your city"),
  state:Yup.string().required("Please select your state"),
  serviceType:Yup.string().required("Please select your service"),
  address: Yup.string().required("Please enter your address"),
  panNumber: Yup.string()
  .matches(/[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid pan number')
  .required("Please enter your pan number"),
  // gst: Yup.string()
  // .matches(/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/, 'Invalid gst number') // Matches the GST format
  // .required("Please enter your gst number"),
 mainGateUrl: Yup.string().required("Please upload main gate image"),
 bannerImages: Yup.array().min(1, "Please upload at least one banner image"),
 galleryImageUrl: Yup.array().min(1, "Please upload at least one gallery image"),
 
})



export const salonDetailsSchema = Yup.object({
  salonName: Yup.string().required("Please enter your name"),
  email: Yup.string().email().required("Please enter your email"),
  gstNumber: Yup.string().required("Please enter your GST Nuber"),
  address: Yup.string().required("Please enter your address"),
  salonStatePinCode: Yup.string().required("Please enter pin code"),
 
})

// SalonOwnerDetails Schema.
const MIN_AGE = 18;
const getMinDOBDate = () => {
  const currentDate = new Date();
  return new Date(currentDate.getFullYear() - MIN_AGE, currentDate.getMonth(), currentDate.getDate());
};
export const salonProfileSchema = Yup.object().shape({
  firstName: Yup.string().required("Please enter first your name"),
  lastName: Yup.string().required("Please enter your last name"),
  email: Yup.string().email().required("Please enter your email"),
  dataOfBirth: Yup.date()
 .max(getMinDOBDate(), `You must be at least ${MIN_AGE} years old`)
.required("Date of birth is required"),
 gender: Yup.string().required("Please select your gender"),
 panCardImageUrl: Yup.string().required("Please upload pan image"),
 aadharFrontUrl: Yup.string().required("Please upload aadhar front image"),
 aadharBackUrl: Yup.string().required("Please upload aadhar back image"),
 profileImageUrl: Yup.string().required("Please upload profile image"),

})

//  Bank Details schema

export const bankSchema = Yup.object({
  accNum: Yup.string().required("Please enter valid Account Number"),
  accName: Yup.string().required("Please enter valid Account Name"),
  bankName: Yup.string().required("Enter  valid Bank Name"),
  ifscCode: Yup.string().matches(/^[A-Za-z]{4}[0][A-Z0-9a-z]{6}$/, 'Invalid IFSC code').required("Please enter valid IFSC code"),
});



// Add staff schema
const imageFileTypes = ['image/jpeg','image/jpg', 'image/png'];
export const addStaffSchema = Yup.object({
  name: Yup.string().required("Please enter valid Account Name"),
  mobileNumber: Yup.string()
  .matches(/^\d{10}$/, 'Mobile number must be exactly 10 digits')
  .required("Please enter a valid 10-digit phone number"),
  dob: Yup.date()
  .max(getMinDOBDate(), `You must be at least ${MIN_AGE} years old`)
 .required("Date of birth is required"),
   email: Yup.string().email().required("Please enter your email"),
  gender: Yup.string().required("Please select your gender"),
  specialization: Yup.string().required("Please enter your specilization"),
  profileImageUrl: Yup.string()
  .test('fileType', 'Only image files are allowed', (value) => {
    if (value) {
      const extension = value.split('.').pop();
      return imageFileTypes.includes(`image/${extension}`);
    }
    return false; // Force to upload a file, so if no file is uploaded, validation should fail
  })

  .required("Please upload profile image"),
      aadharFrontUrl: Yup.string().required("Please upload aadhar front image"),
  aadharBackUrl: Yup.string().required("Please upload aadhar back image"),

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
  serviceName: Yup.string().matches(/^[a-zA-Z\s]*$/, 'Service name must contain only letters').required('Service name is required'),
  serviceDuration: Yup.string().matches(/^\d+$/, 'Service duration must contain only numbers').required('Service duration is required'),
  servicePrice: Yup.number()
    .max(99999, 'Service price cannot exceed 99999')
    .required('Service price is required'),
  type: Yup.string().matches(/^[a-zA-Z\s]*$/, 'Service type must contain only letters').required("Please select your service"),

});

export const viewMoreSchema = Yup.object().shape({
 // categoryId: Yup.number().required('Category ID must be a number'),
  serviceDuration: Yup.number().required('Service duration must be a number'),
  serviceName: Yup.string().required('Service Name is required'),
  servicePrice: Yup.number().required('Service price must be a number'),
  type: Yup.string().required('Type is required'),
});
