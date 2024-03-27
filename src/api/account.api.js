import HTTP from "../service/http";
import { methods } from "../constants";
import { __endpoint_Salon, __endpoint_createSalon, __endpoint_bankDetails,__endpoint_salonownerDetails,
  __endpoint_doLogin, __endpoint_verifyOtp, __endpoint_salonDetails, __endpoint_resendOtp,__endpoint_fileUploader
} from "../constants/endpoints";

export const doLogin = (payload) =>
 HTTP.Request(methods.POST, __endpoint_doLogin, payload);
 
 export const verifyOtp = (payload) =>
 HTTP.Request(methods.POST, __endpoint_verifyOtp, payload);

 export const resendOtp = (payload) =>
 HTTP.Request(methods.POST, __endpoint_resendOtp, payload);

 export const createSalon = (payload) =>
 HTTP.Request(methods.POST, __endpoint_createSalon, payload);

 export const Salon = (payload) =>
 HTTP.Request(methods.POST, __endpoint_Salon, payload);

 export const bankDetails = (payload) =>
 HTTP.Request(methods.POST, __endpoint_bankDetails, payload);
 
 export const salonownerDetails = (payload) =>
 HTTP.Request(methods.POST, __endpoint_salonownerDetails, payload);

 export const salonDetails = (payload) =>
 HTTP.Request(methods.POST, __endpoint_salonDetails, payload);

 export const fileUploader = (payload) =>
 HTTP.Request(methods.GET, __endpoint_fileUploader, payload);

//export const getCountries = (payload) =>
 //HTTP.Request(methods.GET, "https://restcountries.com/v2/all", payload);
//export const getFeature = () =>
//HTTP.Request(methods.GET, __endpoint_getFeature);
