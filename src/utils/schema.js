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
  bankName: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, 'Bank name must contain only alphabets')
    .required("Please enter bank name"),
  accountHolderName: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, 'Account Holder name must contain only alphabets')
    .required("Please enter your name"),
  ifscCode: Yup.string()
    .matches(/^[A-Za-z]{4}[0][A-Z0-9a-z]{6}$/, 'Invalid IFSC code')
    .required("Please enter your IFSC code"),
  bankDocumentUrl: Yup.string().required("Please upload passbook image"),
});

export const businessDetailsSchema = Yup.object({
  name: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, 'Salon name must contain only alphabets')
    .required("Please enter salon name"),
  // email: Yup.string().email().required("Please enter your email"),
  companyName: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, 'Company name must contain only alphabets')
    .required("Please enter company name"),
  pinCode: Yup.string()
    .matches(/^[0-9]+$/, "PIN code must contain only numbers")
    .length(6, "PIN code must be exactly 6 digits")
    .required("Please enter salon pin code"),
  city: Yup.string().required("Please select salon city"),
  state: Yup.string().required("Please select salon state"),
  serviceType: Yup.string().required("Please select salon service"),
  address: Yup.string().required("Please enter salon address"),
  panNumber: Yup.string()
    .matches(/[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid pan number')
    .required("Please enter your pan number"),
  gst: Yup.string()
    .matches(/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/, 'Invalid gst number'),
  // .required("Please enter your gst number"),
  mainGateUrl: Yup.string().required("Please upload main gate image"),
  bannerImages: Yup.array().min(1, "Please upload at least one banner image"),
  galleryImageUrl: Yup.array().min(1, "Please upload at least one gallery image"),
  email: Yup.string().email().required("Please enter your email"),
})



export const salonDetailsSchema = Yup.object({
  salonName: Yup.string().required("Please enter your name"),
  email: Yup.string().email().required("Please enter your email"),
  gstNumber: Yup.string().required("Please enter your GST Nuber"),
  address: Yup.string().required("Please enter your address"),
  salonStatePinCode: Yup.string().required("Please enter pin code"),

})

// SalonOwnerDetails Schema.
export const salonProfileSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, 'first name must contain only alphabets')
    .required("Please enter first your name"),
  // lastName: Yup.string()
  //   .matches(/^[a-zA-Z\s]+$/, 'last name must contain only alphabets')
  //   .required("Please enter your last name"),
  email: Yup.string().email().required("Please enter your email"),
  dataOfBirth: Yup.date()
    .required("Date of birth is required"),
  gender: Yup.string().required("Please select your gender"),
  panCardImageUrl: Yup.string().required("Please upload pan image"),
  aadharFrontUrl: Yup.string().required("Please upload aadhar front image"),
  aadharBackUrl: Yup.string().required("Please upload aadhar back image"),
  profileImageUrl: Yup.string().required("Please upload profile image"),

})

//  Bank Details schema

export const bankSchema = Yup.object({
  accNum: Yup.string()
    .matches(/^[0-9]+$/, "Account Number must contain only numbers")
    .required("Please enter valid Account Number"),
  accName: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, 'Account Name must contain only alphabets')
    .required("Please enter valid Account Name"),
  bankName: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, 'Bank Name must contain only alphabets')
    .required("Enter  valid Bank Name"),
  ifscCode: Yup.string().matches(/^[A-Za-z]{4}[0][A-Z0-9a-z]{6}$/, 'Invalid IFSC code').required("Please enter valid IFSC code"),
});


const onlyAlphabets = (value) =>
  /^[a-zA-Z]+$/.test(value) || 'Only alphabetic characters are allowed';
// Add staff schema
const imageFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
export const addStaffSchema = Yup.object({
  firstName: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, 'Name must contain only alphabets')
    .required("Please enter your first name"),
  lastName: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, 'Name must contain only alphabets')
    .required("Please enter your last Name"),
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, 'Mobile number must be exactly 10 digits')
    .required("Please enter a valid phone number"),
  dob: Yup.date()
    .required("Date of birth is required"),
  email: Yup.string().email().required("Please enter your email"),
  gender: Yup.string().required("Please select your gender"),
  specialization: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, 'Account Name must contain only alphabets')
    .required("Please enter your specilization"),
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
  // serviceName: Yup.string().matches(/^[a-zA-Z\s]*$/, 'Service name must contain only letters').required('Please enter service name'),
  serviceName: Yup.string()
    .required('Service name is required')
    .test('onlyAlphabets', onlyAlphabets),
  serviceDuration: Yup.string().matches(/^\d+$/, 'Service duration must contain only numbers').required('Please select service duration'),
  // servicePrice: Yup.number()
  //  .required('Please enter service price'),
  categoryId: Yup.number().required('Category Id must be a number'),

  type: Yup.string().matches(/^[a-zA-Z\s]*$/, 'Service type must contain only letters').required("Please select your gender"),

});

export const viewMoreSchema = Yup.object().shape({
  // categoryId: Yup.number().required('Category ID must be a number'),
  serviceDuration: Yup.number().required('Service duration must be a number'),
  serviceName: Yup.string().required('Service Name is required'),
  servicePrice: Yup.number().required('Service price must be a number'),
  type: Yup.string().required('Type is required'),
});
