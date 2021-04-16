import {
    FETCHING_DATA,
    GET_COMPTES,
    GET_RATES, SET_VIREMENTS,
    SELECT_COMPTE_CREDITE,
    SELECT_COMPTE_DEBITE, SELECT_DATE_EXECUTION, SET_CURRENT_VIREMENT, SET_FORM_HAS_ERROR, SET_INITIAL_FORM_VALUES
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
export function setInitialFormValues(payload) {
    return { type: SET_INITIAL_FORM_VALUES, payload };
}
export function setCurrentVirement(payload) {
    return { type: SET_CURRENT_VIREMENT, payload };
}
export function setViremets(payload) {
    return { type: SET_VIREMENTS, payload };
}
