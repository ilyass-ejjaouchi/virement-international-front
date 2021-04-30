import {
    FETCHING_DATA,
    GET_BANQUES,
    GET_COUNTRIES,
    SET_CURRENT_BANQUE,
    SET_CURRENT_DEMANDE,
    SET_CURRENT_PAGE_NUMBER, SET_CURRENT_PAGE_SIZE,
    SET_DEMANDES_BENEFICIARES,
    SET_INITIAL_FORM_VALUES, SET_TOTAL_PAGES,
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
export function setInitialFormValues(payload) {
    return { type: SET_INITIAL_FORM_VALUES, payload };
}
export function setCurrentDemande(payload) {
    return { type: SET_CURRENT_DEMANDE, payload };
}
export function setCurrentBanque(payload) {
    return { type: SET_CURRENT_BANQUE, payload };
}
export function setDemandesBeneficiares(payload) {
    return { type: SET_DEMANDES_BENEFICIARES, payload };
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
