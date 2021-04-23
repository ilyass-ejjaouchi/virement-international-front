import {OPEN_SNACKBAR} from "../Constants/constants";

const initialState = {
    openSnackbar:false,
    message:null,
    style: null
};

function SnackbarReducer(state = initialState, action) {
    switch (action.type) {
        case OPEN_SNACKBAR:
            return {
                ...state,
                openSnackbar:   action.payload.openSnackbar,
                message:  action.payload.message,
                style:  action.payload.style,
            }
        default:
            return state;
    }
}

export default SnackbarReducer;
