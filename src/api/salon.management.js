import HTTP from "../service/http";
import { methods } from "../constants";
import { __endpoint_addSalonService, __endpoint_addStaff, __endpoint_getSalonSingleService, __endpoint_getStaff, __endpoint_removeStaff, __endpoint_salonBusinessTime, __endpoint_salonService } from "../constants/endpoints";

//salon staff
export const addStaff = (payload) => HTTP.Request(methods.POST, __endpoint_addStaff , payload);
export const getStaff = (id,payload) => HTTP.Request(methods.GET,  __endpoint_getStaff(id) , payload,id);
export const removeStaff = (id,payload) => HTTP.Request(methods.DELETE,  __endpoint_removeStaff(id) , payload,id);
export const editStaff = (id,payload) => HTTP.Request(methods.PUT,  __endpoint_removeStaff(id) , payload,id);

export const salonStaff = (payload) => HTTP.Request(methods.GET, __endpoint_addStaff , payload);

//salon service
export const salonService = (payload) => HTTP.Request(methods.GET, __endpoint_salonService , payload);
export const getSalonSingleService = (id,payload) => HTTP.Request(methods.GET, __endpoint_getSalonSingleService(id) , payload,id);

export const salonBusinessTime = (payload) => HTTP.Request(methods.GET, __endpoint_salonBusinessTime , payload);
export const addSalonService = (payload) => HTTP.Request(methods.POST, __endpoint_addSalonService , payload);
export const salonTime = (payload) => HTTP.Request(methods.POST, __endpoint_salonBusinessTime , payload);
