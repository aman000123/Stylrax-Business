import HTTP from "../service/http";
import { methods } from "../constants";
import { __endpoint_doLogin, __endpoint_verifyOtp, __endpoint_resendOtp, __endpoint_profile, __endpoint_bankDetails, __endpoint_verifyEmail, __endpoint_verifyEmailOtp, __endpoint_getInvoice, } from "../constants/endpoints";

export const doLogin = (payload) => HTTP.Request(methods.POST, __endpoint_doLogin, payload);
export const verifyOtp = (payload) => HTTP.Request(methods.POST, __endpoint_verifyOtp, payload);
export const resendOtp = (payload) => HTTP.Request(methods.POST, __endpoint_resendOtp, payload);
export const getProfile = (payload) => HTTP.Request(methods.GET, __endpoint_profile, payload);
export const verifyEmail = (payload) => HTTP.Request(methods.POST, __endpoint_verifyEmail, payload);
export const verifyEmailOtp = (payload) => HTTP.Request(methods.POST, __endpoint_verifyEmailOtp, payload);

//Bank Details
export const bankDetails = (id,payload) => HTTP.Request(methods.POST, __endpoint_bankDetails(id) , payload);

//  export const createSalon = (payload) =>
//  HTTP.Request(methods.POST, __endpoint_createSalon, payload);

//  export const Salon = (payload) =>
//  HTTP.Request(methods.POST, __endpoint_Salon, payload);

  //export const bankDetails = (payload) =>
 // HTTP.Request(methods.POST, __endpoint_bankDetails, payload);
 


//  export const salonDetails = (payload) =>
//  HTTP.Request(methods.POST, __endpoint_salonDetails, payload);

export const getInvoice = (id) =>
  HTTP.Request(methods.GET, `${__endpoint_getInvoice}/${id}/invoice`);
