import HTTP from "../service/http";
import { methods } from "../constants";
import {__endpoint_userProfile} from "../constants/endpoints";


export const createProfile = (payload) => HTTP.Request(methods.POST, __endpoint_userProfile, payload);
