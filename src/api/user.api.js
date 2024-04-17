import HTTP from "../service/http";
import { methods } from "../constants";
import {__endpoint_userProfile} from "../constants/endpoints";
import axios from 'axios';

export const createProfile = (payload) => HTTP.Request(methods.POST, __endpoint_userProfile, payload);
// export const createProfile = (payload,token) => 
// {return axios.post(__endpoint_userProfile, payload, {
//     headers: {
//       'Content-Type': 'application/json',
//        'Authorization': `Bearer ${token}`
//     }
//   })}