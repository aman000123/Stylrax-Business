import HTTP from "../service/http";
import { methods } from "../constants";
import {
  __endpoint_doLogin
} from "../constants/endpoints";

export const doLogin = (payload) =>
 HTTP.Request(methods.POST, __endpoint_doLogin, payload);
//export const getCountries = (payload) =>
 //HTTP.Request(methods.GET, "https://restcountries.com/v2/all", payload);
//export const getFeature = () =>
//HTTP.Request(methods.GET, __endpoint_getFeature);
