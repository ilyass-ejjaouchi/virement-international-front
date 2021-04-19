import {
    GET_COMPTES,
    GET_RATES,
    SELECT_COMPTE_DEBITE,
    SELECT_COMPTE_CREDITE,
    FETCHING_DATA,
    SELECT_DATE_EXECUTION,
    SET_INITIAL_FORM_VALUES,
    SET_CURRENT_VIREMENT, SET_VIREMENTS, DELETE_VIREMENT, CONFIRMER_VIREMENT
} from "../Constants/constants";

const initialState = {
    comptes:[],
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
    virements: null
};

function VirementReducer(state = initialState, action) {
    switch (action.type) {
        case GET_COMPTES:
            return {
                ...state,
                comptes: action.payload,
                comptesDebite: action.payload,
                comptesCredite: action.payload,
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
                comptesDebite: [...state.comptes.filter(c => c !== compteCredite)],
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
        default:
            return state;
    }
}
export default VirementReducer;
