import { OPEN_DIALOG } from "../Constants/constants";
import { CLOSE_DIALOG } from "../Constants/constants";

const initialState = {
    show:false
};

function dialogReducer(state = initialState, action) {
    if (action.type === OPEN_DIALOG) {
        return {
            ...state,
            show: action.payload
        }
    }
    return state;
}

export default dialogReducer;
