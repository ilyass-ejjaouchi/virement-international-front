import {
    FETCHING_DATA,
    GET_BANQUES,
    GET_COUNTRIES,
    GET_RATES, SET_CURRENT_BANQUE,
    SET_CURRENT_DEMANDE, SET_DEMANDES_BENEFICIARES,
    SET_INITIAL_FORM_VALUES
} from "../Constants/constants";

const initialState = {
    banques:[],
    countries: [],
    isFetching: false,
    rates:[],
    formValues: null,
    currentDemande:null,
    currentBanque:null,
    demandesBeneficiares:[]
};

function BeneficiareReducer(state = initialState, action) {
    switch (action.type) {
        case GET_BANQUES:
            return {
                ...state,
                banques: action.payload
            }
        case GET_RATES:
            return {
                ...state,
                rates: action.payload
            }
        case GET_COUNTRIES:
            return  {
                ...state,
                countries: action.payload
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
        case SET_CURRENT_DEMANDE:
            return {
                ...state,
                currentDemande: action.payload
            }
        case SET_CURRENT_BANQUE:
            return {
                ...state,
                currentBanque: action.payload
            }
        case SET_DEMANDES_BENEFICIARES:
            return {
                ...state,
                demandesBeneficiares: action.payload
            }
        default:
            return state;
    }
}
export default BeneficiareReducer;
