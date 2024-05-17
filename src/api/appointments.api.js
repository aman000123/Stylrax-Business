import HTTP from "../service/http";
import { methods } from "../constants";
import { __endpoint_cancelledAppointments, __endpoint_completedAppointments, __endpoint_ongoingAppointments, __endpoint_pendingAppointments,__endpoint_detailsAppointments, __endpoint_acceptAppointment, __endpoint_rejectAppointment, __endpoint_startAppointment, __endpoint_completeAppointment } from "../constants/endpoints";

export const completedAppointments = (id,payload) => HTTP.Request(methods.GET, __endpoint_completedAppointments(id) , payload);
export const pendingAppointments = (id,payload) => HTTP.Request(methods.GET, __endpoint_pendingAppointments(id) , payload);
export const ongoingAppointments = (id,date) => HTTP.Request(methods.GET, `${__endpoint_ongoingAppointments(id)}?date=${date}`);
export const cancelledAppointments = (id,payload) => HTTP.Request(methods.GET, __endpoint_cancelledAppointments(id) , payload);
export const detailsAppointments = (id,payload) => HTTP.Request(methods.GET, __endpoint_detailsAppointments(id) , payload);
export const acceptAppointments = (id,payload) => HTTP.Request(methods.PUT, __endpoint_acceptAppointment(id) , payload);
export const rejectAppointments = (id,payload) => HTTP.Request(methods.PUT, __endpoint_rejectAppointment(id) , payload);
export const startAppointments = (id,payload) => HTTP.Request(methods.PUT, __endpoint_startAppointment(id) , payload);
export const completeAppointments = (id,payload) => HTTP.Request(methods.PUT, __endpoint_completeAppointment(id) , payload);
