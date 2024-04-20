import HTTP from "../service/http";
import { methods } from "../constants";
import {  __endpoint_salons } from "../constants/endpoints";




 export const createSalon = (payload) => HTTP.Request(methods.POST, __endpoint_salons , payload);
 export const getSalon = (payload) => HTTP.Request(methods.GET, __endpoint_salons , payload);

//fake api  
export const createBankAccount = (payload) => HTTP.Request(methods.POST, __endpoint_salons, payload);

