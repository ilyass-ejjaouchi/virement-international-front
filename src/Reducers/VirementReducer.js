import {
    GET_COMPTES,
    GET_RATES,
    OPEN_DIALOG,
    SELECT_COMPTE_DEBITE,
    SELECT_COMPTE_CREDITE, FETCHING_DATA
} from "../Constants/constants";

const initialState = {
    comptes:[],
    comptesDebite:[],
    comptesCredite:[],
    rates:[],
    currentCompteCredite:null,
    currentCompteDebite: null,
    contreValeur: null,
    isFetching: false
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
        case FETCHING_DATA:
            const fetching = action.payload;
            return {
                ...state,
                isFetching: fetching
            }
        default:
            return state;
    }
}
export default VirementReducer;
