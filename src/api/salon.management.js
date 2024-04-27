import HTTP from "../service/http";
import { methods } from "../constants";
import { __endpoint_addSalonService, __endpoint_addStaff, __endpoint_getSalonSingleService, __endpoint_getStaff, __endpoint_removeStaff, __endpoint_salonBusinessTime, __endpoint_salonService, __endpoint_serviceCategory } from "../constants/endpoints";

//salon staff
export const addStaff = (payload) => HTTP.Request(methods.POST, __endpoint_addStaff , payload);
export const getStaff = (id,payload) => HTTP.Request(methods.GET,  __endpoint_getStaff(id) , payload,id);
export const removeStaff = (id,payload) => HTTP.Request(methods.DELETE,  __endpoint_removeStaff(id) , payload,id);
export const editStaff = (id,payload) => HTTP.Request(methods.PUT,  __endpoint_removeStaff(id) , payload,id);

export const salonStaff = (payload) => HTTP.Request(methods.GET, __endpoint_addStaff , payload);

//salon service
export const salonService = (id,payload) => HTTP.Request(methods.GET, __endpoint_salonService(id) , payload,id);
export const getSalonSingleService = (salonId,id,payload) => HTTP.Request(methods.GET, __endpoint_getSalonSingleService(salonId,id) , payload);
export const serviceCategory = (payload) => HTTP.Request(methods.GET, __endpoint_serviceCategory, payload);
export const salonBusinessTime = (payload,id) => HTTP.Request(methods.GET, __endpoint_salonBusinessTime(id) , payload,id);
export const removeService = (salonId,id,payload) => HTTP.Request(methods.DELETE, __endpoint_getSalonSingleService(salonId,id) , payload);
export const serviceEdit = (salonId,id,payload) => HTTP.Request(methods.PUT, __endpoint_getSalonSingleService(salonId,id) , payload);

export const addSalonService = (payload,id) => HTTP.Request(methods.POST, __endpoint_addSalonService(id) , payload);
export const salonTime = (payload) => HTTP.Request(methods.POST, __endpoint_salonBusinessTime , payload);
