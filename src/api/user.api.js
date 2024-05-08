import HTTP from "../service/http";
import { methods } from "../constants";
import { __endpoint_userProfile } from "../constants/endpoints";
import axios from "axios";

export const updateProfile = (payload) => HTTP.Request(methods.PUT, __endpoint_userProfile, payload);
export const getProfile = (payload) => HTTP.Request(methods.GET, __endpoint_userProfile, payload);
// export const createProfile = (payload,token) => 
// {return axios.post(__endpoint_userProfile, payload, {
//     headers: {
//       'Content-Type': 'application/json',
//        'Authorization': `Bearer ${token}`
//     }
//   })}
//export const createProfile = (payload,token) => HTTP.Request(methods.POST, __endpoint_userProfile, payload,token);
export const getOwnerDetails = (payload) => HTTP.Request(methods.GET, __endpoint_userProfile, payload);

export const createProfile = (payload, token) => {
    console.log("temp Token:", token);
    return axios.post(__endpoint_userProfile, payload, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
}