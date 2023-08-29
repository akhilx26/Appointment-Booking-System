import { commonrequest } from "./ApiCall";
import {BACKEND_URL} from "./helper";

export const registerfunction = async(data) => {
    return await commonrequest("POST",`${BACKEND_URL}/user/register`,data);
}
export const sendOtpFunction = async(data) => {
    return await commonrequest("POST",`${BACKEND_URL}/user/otp`,data);
}
export const userVerify = async(data) => {
    return await commonrequest("POST",`${BACKEND_URL}/user/login`,data);
}
export const timeSlot = async(data) => {
    return await commonrequest("POST",`${BACKEND_URL}/user/booking`,data);
}