import { endpoint } from '../constants';

/* user Login */
export const __endpoint_doLogin = endpoint + "b2b/account/otp/login";
//export const __endpoint_doLogin = "https://devapi.stylrax.com/b2b/account/otp/login";
//export const __endpoint_getFeature = endpoint + "admin/role/feature";
export const __endpoint_verifyOtp = endpoint + "b2b/account/otp/verify";
export const __endpoint_resendOtp = endpoint + "b2b/account/otp/resend";