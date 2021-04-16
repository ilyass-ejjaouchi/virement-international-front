import {FETCHING_DATA, GET_BANQUES, GET_COUNTRIES, GET_RATES} from "../Constants/constants";

const initialState = {
    banques:[],
    countries: [],
    isFetching: false,
    rates:[]
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
        default:
            return state;
    }
}
export default BeneficiareReducer;
