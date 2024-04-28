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
export const __endpoint_addStaff = (id)=>{return ` ${endpoint}b2b/salons/${id}/employees`};

export const __endpoint_getStaff = (salonId,id)=>{return ` ${endpoint}b2b/salons/${salonId}/employees/${id}`};

export const __endpoint_removeStaff = (salonId,id) => {
    return `${endpoint}b2b/salons/${salonId}/employees/${id}`;
  };
  
export const __endpoint_getSalonSingleService = (salonId,id) => {
  return `${endpoint}b2b/salons/${salonId}/services/${id}`;
};
export const __endpoint_salonService = (id)=>{return ` ${endpoint}b2b/salons/${id}/services`};
//export const __endpoint_salonBusinessTime = endpoint + "b2b/salons/38/businessHours";
export const __endpoint_salonBusinessTime = (id)=>{return ` ${endpoint}b2b/salons/${id}/businessHours`};
export const __endpoint_addSalonService = (salonId)=>{return ` ${endpoint}b2b/salons/${salonId}/services`};
export const __endpoint_serviceCategory = endpoint + "b2b/services/categories";

//File Management APIs
export const __endpoint_files = endpoint + "b2b/file/presignedUrl";

//Bank Details APIs
export const __endpoint_bankDetails = (id)=>{return ` ${endpoint}b2b/salons/${id}/bank`};
