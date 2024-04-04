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



//File Management APIs
export const __endpoint_files = endpoint + "b2b/file/presignedUrl";

//Bank Details APIs
export const __endpoint_bankDetails = endpoint + "b2b/salons/38/bank";
