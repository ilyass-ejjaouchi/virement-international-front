import {
    CONFIRMER_VIREMENT,
    DELETE_VIREMENT,
    FETCHING_DATA,
    GET_COMPTES,
    GET_CURRENT_USER,
    GET_RATES,
    SELECT_COMPTE_CREDITE,
    SELECT_COMPTE_DEBITE,
    SELECT_DATE_EXECUTION,
    SET_CURRENT_PAGE_NUMBER,
    SET_CURRENT_PAGE_SIZE,
    SET_CURRENT_VIREMENT,
    SET_INITIAL_FORM_VALUES,
    SET_PARAMS,
    SET_TOTAL_PAGES,
    SET_VIREMENTS
} from "../Constants/constants";

const initialState = {
    currentUser:null,
    comptesDebite:[],
    comptesCredite:[],
    rates:[],
    currentCompteCredite:null,
    currentCompteDebite: null,
    contreValeur: null,
    isFetching: false,
    date: null,
    formValues: null,
    currentVirement: null,
    virements: null,
    currentPageNumber:0,
    currentPageSize:5,
    totalPages: null,
    params: null
};

function VirementReducer(state = initialState, action) {
    switch (action.type) {
        case GET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload,
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
                currentCompteDebite: compteDebite
            }
        case SELECT_COMPTE_CREDITE:
            const compteCredite = action.payload;
            return {
                ...state,
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
                currentVirement: action.payload
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
