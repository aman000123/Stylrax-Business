import HTTP from "../service/http";
import { methods } from "../constants";
import {
  __endpoint_addStaff,
  __endpoint_bankDetails,
  __endpoint_doLogin, __endpoint_resendOtp, __endpoint_verifyOtp
} from "../constants/endpoints";

export const doLogin = (payload) =>
 HTTP.Request(methods.POST, __endpoint_doLogin, payload);
 
 export const verifyOtp = (payload) =>
 HTTP.Request(methods.POST, __endpoint_verifyOtp, payload);
 export const resendOtp = (payload) =>
 HTTP.Request(methods.GET, __endpoint_addStaff, payload);
 export const bankDetails = (payload) =>
 HTTP.Request(methods.POST, __endpoint_bankDetails, payload);
//export const getCountries = (payload) =>
 //HTTP.Request(methods.GET, "https://restcountries.com/v2/all", payload);
//export const getFeature = () =>
//HTTP.Request(methods.GET, __endpoint_getFeature);
