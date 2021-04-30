import {OPEN_PASSWORD_MODEL, SET_ERROR_MSG} from "../Constants/constants";

export function openPasswordModel(payload) {
    return { type: OPEN_PASSWORD_MODEL, payload };
}
export function setErrorMsg(payload) {
    return { type: SET_ERROR_MSG, payload };
}
