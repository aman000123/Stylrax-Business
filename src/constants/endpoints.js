import { endpoint } from '../constants';

//Account Management APIs
export const __endpoint_doLogin = endpoint + "b2b/account/otp/login";
export const __endpoint_verifyOtp = endpoint + "b2b/account/otp/verify";
export const __endpoint_resendOtp = endpoint + "b2b/account/otp/resend";
export const __endpoint_profile = endpoint + "b2b/account/profile";


//User Management APIs

export const __endpoint_userProfile= endpoint + "b2b/user/profile";



//Salon Management APIs
export const __endpoint_salons = endpoint + "b2b/salons";
export const __endpoint_addStaff = endpoint + "b2b/salons/38/employees";
export const __endpoint_getStaff = (id)=>{return ` ${endpoint}b2b/salons/38/employees/${id}`};

export const __endpoint_removeStaff = (id) => {
    return `${endpoint}b2b/salons/38/employees/${id}`;
  };
  
export const __endpoint_getSalonSingleService = (id) => {
  return `${endpoint}b2b/salons/38/services/${id}`;
};
export const __endpoint_salonService = endpoint + "b2b/salons/38/services?categoryId=11";
export const __endpoint_salonBusinessTime = endpoint + "b2b/salons/38/businessHours";
export const __endpoint_addSalonService = endpoint + "b2b/salons/38/services";

//File Management APIs
export const __endpoint_files = endpoint + "b2b/file/presignedUrl";

//Bank Details APIs
//export const __endpoint_bankDetails = endpoint + "b2b/salons/38/bank";
export const __endpoint_bankDetails = (id)=>{return ` ${endpoint}b2b/salons/${id}/bank`};
