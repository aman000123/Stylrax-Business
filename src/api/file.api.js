import HTTP from "../service/http";
import { methods } from "../constants";
import {__endpoint_files} from "../constants/endpoints";

export const getPresignedUrl = (payload) => HTTP.Request(methods.GET, __endpoint_files, payload);