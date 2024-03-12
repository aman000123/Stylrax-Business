import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required"),
  });

  // salon Management -> Bank Detail -> form validation
  export const bankDetailsSchema  = Yup.object({
    accNum : Yup.string().notstring().min(11).max(16).required("Must have 11 numbers"),
    accName : Yup.string().min(3).max(25).required("Please enter atleast 3 characters"),
    bankName : Yup.string().min(11).max(25).required("Please enter atleast 11 characters"),
    ifscCode : Yup.string().min(11).required("Must have atleast 11 characters"),
    passbook : Yup.string().min(11).max(16).required("Please enter atleast 11 Numbers"),
  });