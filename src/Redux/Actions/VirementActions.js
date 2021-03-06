import {
    FETCHING_DATA,
    GET_COMPTES,
    GET_RATES,
    SET_VIREMENTS,
    SELECT_COMPTE_CREDITE,
    SELECT_COMPTE_DEBITE,
    SELECT_DATE_EXECUTION,
    SET_CURRENT_VIREMENT,
    SET_FORM_HAS_ERROR,
    SET_INITIAL_FORM_VALUES,
    SET_CURRENT_PAGE_NUMBER,
    SET_CURRENT_PAGE_SIZE,
    SET_TOTAL_PAGES,
    SET_PARAMS,
    GET_CURRENT_USER_COMPTES,
    GET_CURRENT_USER
} from "../Constants/constants";

export function getComptes(payload) {
    return { type: GET_COMPTES, payload };
}
export function getCurrentUser(payload) {
    return { type: GET_CURRENT_USER, payload };
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
export function deleteVirement(payload) {
    return { type: SET_VIREMENTS, payload };
}
export function confirmerVirement(payload) {
    return { type: SET_VIREMENTS, payload };
}
export function setCurrentPageNumber(payload) {
    return { type: SET_CURRENT_PAGE_NUMBER, payload };
}
export function setCurrentPageSize(payload) {
    return { type: SET_CURRENT_PAGE_SIZE, payload };
}
export function setTotalPages(payload) {
    return { type: SET_TOTAL_PAGES, payload };
}
export function setParams(payload) {
    return { type: SET_PARAMS, payload };
}
