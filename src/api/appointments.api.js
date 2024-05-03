import HTTP from "../service/http";
import { methods } from "../constants";
import { __endpoint_completedAppointments, __endpoint_ongoingAppointments, __endpoint_pendingAppointments } from "../constants/endpoints";

export const completedAppointments = (id,payload) => HTTP.Request(methods.GET, __endpoint_completedAppointments(id) , payload);
export const pendingAppointments = (id,payload) => HTTP.Request(methods.GET, __endpoint_pendingAppointments(id) , payload);
export const ongoingAppointments = (id,date) => HTTP.Request(methods.GET, `${__endpoint_ongoingAppointments(id)}?date=${date}`);

