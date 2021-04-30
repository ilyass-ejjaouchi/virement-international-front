import {OPEN_PASSWORD_MODEL, SET_ERROR_MSG} from "../Constants/constants";

const initialState = {
    show:false,
    errorMsg: null
};

function PasswordModelReducer(state = initialState, action) {
    switch (action.type) {
        case OPEN_PASSWORD_MODEL:

            return {
                ...state,
                show: action.payload
            }
        case SET_ERROR_MSG:

            return {
                ...state,
                errorMsg: action.payload
            }
        default:
            return state;
    }
}

export default PasswordModelReducer;
