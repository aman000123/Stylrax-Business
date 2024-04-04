import HTTP from "../service/http";
import { methods } from "../constants";
import { __endpoint_bankDetails, __endpoint_salons } from "../constants/endpoints";




 export const createSalon = (payload) => HTTP.Request(methods.POST, __endpoint_salons , payload);

//fake api  
export const createBankAccount = (payload) => HTTP.Request(methods.POST, __endpoint_salons, payload);

//Bank Details
export const bankDetails = (payload) => HTTP.Request(methods.POST, __endpoint_bankDetails , payload);
