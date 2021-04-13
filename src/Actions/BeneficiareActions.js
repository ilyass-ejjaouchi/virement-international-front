import {
    FETCHING_DATA, GET_BANQUES,
    GET_COUNTRIES,
} from "../Constants/constants";

export function getBanques(payload) {
    return { type: GET_BANQUES, payload };
}
export function getCountries(payload) {
    return { type: GET_COUNTRIES, payload };
}

export function fetchingData(payload) {
    return { type: FETCHING_DATA, payload };
}
