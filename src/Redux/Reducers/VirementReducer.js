import {
    GET_COMPTES,
    GET_RATES,
    SELECT_COMPTE_DEBITE,
    SELECT_COMPTE_CREDITE,
    FETCHING_DATA,
    SELECT_DATE_EXECUTION,
    SET_INITIAL_FORM_VALUES,
    SET_CURRENT_VIREMENT,
    SET_VIREMENTS,
    DELETE_VIREMENT,
    CONFIRMER_VIREMENT,
    SET_CURRENT_PAGE_NUMBER,
    SET_CURRENT_PAGE_SIZE, SET_TOTAL_PAGES, SET_PARAMS, GET_CURRENT_USER_COMPTES
} from "../Constants/constants";

const initialState = {
    comptes:[],
    currentUserComptes:[],
    comptesDebite:[],
    comptesCredite:[],
    rates:[],
    currentCompteCredite:null,
    currentCompteDebite: null,
    contreValeur: null,
    isFetching: false,
    date: null,
    formValues: null,
    idcurrentVirement: null,
    virements: null,
    currentPageNumber:0,
    currentPageSize:5,
    totalPages: null,
    params: null
};

function VirementReducer(state = initialState, action) {
    switch (action.type) {
        case GET_COMPTES:
            return {
                ...state,
                comptes: action.payload,
                comptesCredite: action.payload
            }
        case GET_CURRENT_USER_COMPTES:
            return {
                ...state,
                currentUserComptes: action.payload,
                comptesDebite: action.payload
            }
        case GET_RATES:
            return {
                ...state,
                rates: action.payload
            }
        case SELECT_COMPTE_DEBITE:
            const compteDebite = action.payload
            return {
                ...state,
                comptesCredite: [...state.comptes.filter(c => c !== compteDebite )],
                currentCompteDebite: compteDebite
            }
        case SELECT_COMPTE_CREDITE:
            const compteCredite = action.payload;
            return {
                ...state,
                comptesDebite: [...state.currentUserComptes.filter(c => c !== compteCredite)],
                currentCompteCredite: compteCredite
            }
        case SELECT_DATE_EXECUTION:
            const date = action.payload;
            return {
                ...state,
                date: date
            }
        case FETCHING_DATA:
            const fetching = action.payload;
            return {
                ...state,
                isFetching: fetching
            }
        case SET_INITIAL_FORM_VALUES:
            return {
                ...state,
                formValues: action.payload
            }
        case SET_CURRENT_VIREMENT:
            return {
                ...state,
                idcurrentVirement: action.payload
            }
        case SET_VIREMENTS:
            return {
                ...state,
                virements: action.payload
            };
        case DELETE_VIREMENT:
            return {
                ...state,
                virements: action.payload
            }
        case CONFIRMER_VIREMENT:
            return {
                ...state,
                virements: action.payload
            }
        case SET_CURRENT_PAGE_NUMBER:
            return {
                ...state,
                currentPageNumber: action.payload
            }
        case SET_CURRENT_PAGE_SIZE:
            return {
                ...state,
                currentPageSize: action.payload
            }
        case SET_TOTAL_PAGES:
            return {
                ...state,
                totalPages: action.payload
            }
        case SET_PARAMS:
            return {
                ...state,
                params: action.payload
            }
        default:
            return state;
    }
}
export default VirementReducer;
