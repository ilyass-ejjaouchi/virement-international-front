import {
    FETCHING_DATA,
    GET_COMPTES,
    GET_RATES,
    SELECT_COMPTE_CREDITE,
    SELECT_COMPTE_DEBITE, SELECT_DATE_EXECUTION
} from "../Constants/constants";

export function getComptes(payload) {
    return { type: GET_COMPTES, payload };
}
export function getRates(payload) {
    return { type: GET_RATES, payload };
}
export function selectCompteCredite(payload) {
    return { type: SELECT_COMPTE_CREDITE, payload };
}
export function selectDateExecution(payload) {
    return { type: SELECT_DATE_EXECUTION, payload };
}
export function selectCompteDebite(payload) {
    return { type: SELECT_COMPTE_DEBITE, payload };
}
export function fetchingData(payload) {
    return { type: FETCHING_DATA, payload };
}
