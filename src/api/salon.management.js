import HTTP from "../service/http";
import { methods } from "../constants";
import { __endpoint_addSalonService, __endpoint_addStaff, __endpoint_getSalonSingleService, __endpoint_getStaff, __endpoint_myQr, __endpoint_removeStaff, __endpoint_salonBusinessTime, __endpoint_salonGallery, __endpoint_salonService, __endpoint_serviceCategory } from "../constants/endpoints";

//salon staff
export const addStaff = (salonId,payload) => HTTP.Request(methods.POST, __endpoint_addStaff(salonId) , payload);
export const getStaff = (salonId,id,payload) => HTTP.Request(methods.GET,  __endpoint_getStaff(salonId,id) , payload);
export const removeStaff = (salonId,id,payload) => HTTP.Request(methods.DELETE,  __endpoint_removeStaff(salonId,id) , payload);
export const editStaff = (salonId,id,payload) => HTTP.Request(methods.PUT,  __endpoint_removeStaff(salonId,id) , payload);

export const salonStaff = (id,payload) => HTTP.Request(methods.GET, __endpoint_addStaff(id) , payload);

//salon service
export const salonService = (salonId,payload) => HTTP.Request(methods.GET, __endpoint_salonService(salonId) , payload);
export const getSalonSingleService = (salonId,id,payload) => HTTP.Request(methods.GET, __endpoint_getSalonSingleService(salonId,id) , payload);
export const serviceCategory = (payload) => HTTP.Request(methods.GET, __endpoint_serviceCategory, payload);
export const salonBusinessTime = (salonId,payload) => HTTP.Request(methods.GET, __endpoint_salonBusinessTime(salonId) , payload);
export const removeService = (salonId,id,payload) => HTTP.Request(methods.DELETE, __endpoint_getSalonSingleService(salonId,id) , payload);
export const serviceEdit = (salonId,id,payload) => HTTP.Request(methods.PUT, __endpoint_getSalonSingleService(salonId,id) , payload);

export const addSalonService = (salonId,payload) => HTTP.Request(methods.POST, __endpoint_addSalonService(salonId) , payload);
export const salonTime = (salonId,payload) => HTTP.Request(methods.POST, __endpoint_salonBusinessTime(salonId) , payload);

//salon gallery
export const salonGallery = (salonId,payload) => HTTP.Request(methods.GET, __endpoint_salonGallery(salonId) , payload);
export const myQr = (id,payload) => HTTP.Request(methods.GET,  __endpoint_myQr(id),payload);
export const getCityRequest = (payload) =>
    HTTP.Request(methods.GET, "https://countriesnow.space/api/v0.1/countries/states", payload);