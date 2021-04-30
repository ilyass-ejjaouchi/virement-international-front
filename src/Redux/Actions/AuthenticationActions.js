import {SET_IDENTIFIANT, SET_IS_LOGGED, SET_TOKEN} from "../Constants/constants";

export function setToken(payload) {
    return { type: SET_TOKEN, payload };
}
export function setIsLogged(payload) {
    return { type: SET_IS_LOGGED, payload };
}
export function setIdentifiant(payload) {
    return { type: SET_IDENTIFIANT, payload };
}
