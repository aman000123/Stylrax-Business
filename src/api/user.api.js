import HTTP from "../service/http";
import { methods } from "../constants";
import {__endpoint_userProfile} from "../constants/endpoints";

export const createProfile = (payload) => HTTP.Request(methods.POST, __endpoint_userProfile, payload);
export const getProfile = (payload) => HTTP.Request(methods.GET, __endpoint_userProfile, payload);
// export const createProfile = (payload,token) => 
// {return axios.post(__endpoint_userProfile, payload, {
//     headers: {
//       'Content-Type': 'application/json',
//        'Authorization': `Bearer ${token}`
//     }
//   })}