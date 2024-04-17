import HTTP from "../service/http";
import { methods } from "../constants";
import {__endpoint_userProfile} from "../constants/endpoints";
import axios from 'axios';

//export const createProfile = (payload) => HTTP.Request(methods.POST, __endpoint_userProfile, payload);
export const getOwnerDetails = (payload) => HTTP.Request(methods.GET, __endpoint_userProfile, payload);

export const createProfile = (payload,token) => {
    if (!token) {
        console.error("Miss authentication token");
        return; // Exit the function if token is missing
      }
return axios.post(__endpoint_userProfile, payload, {
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      
    }
  })}
