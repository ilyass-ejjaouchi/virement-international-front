import {SET_IDENTIFIANT, SET_IS_LOGGED, SET_TOKEN} from "../Constants/constants";

const initialState = {
    token: null,
    isLogged: false,
    identifiant: null
};

function AuthenticationReducer(state = initialState, action) {
    switch (action.type) {
        case SET_TOKEN:
            return {
                ...state,
               token: action.payload
            }
        case SET_IS_LOGGED:
            return {
                ...state,
               isLogged: action.payload
            }
        case SET_IDENTIFIANT:
            return {
                ...state,
                identifiant: action.payload
            }
        default:
            return state;
    }
}

export default AuthenticationReducer;
