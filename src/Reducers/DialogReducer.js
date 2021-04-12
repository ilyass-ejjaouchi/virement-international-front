import { OPEN_DIALOG } from "../Constants/constants";
import { CLOSE_DIALOG } from "../Constants/constants";

const initialState = {
    show:false,
    title:null,
    body: null,
    style: null
};

function dialogReducer(state = initialState, action) {
    if (action.type === OPEN_DIALOG) {
        return {
            ...state,
            show: action.payload.show,
            title: action.payload.title,
            body: action.payload.body,
            style: action.payload.style
        }
    }
    return state;
}

export default dialogReducer;
