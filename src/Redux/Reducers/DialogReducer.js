import {OPEN_DIALOG} from "../Constants/constants";

const initialState = {
    show:false,
    title:null,
    body: null,
    style: null,
    type: null
};

function dialogReducer(state = initialState, action) {
    switch (action.type) {
        case OPEN_DIALOG:
            const dialog = action.payload;
            return {
                ...state,
                show:   dialog.show,
                title:  dialog.title,
                body:   dialog.body,
                style:  dialog.style,
                type:   dialog.type
            }
        default:
            return state;
    }
}

export default dialogReducer;
