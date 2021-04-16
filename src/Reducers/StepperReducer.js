import {SET_ACTIVE_STEP} from "../Constants/constants";

const initialState = {
    activeStep: 0,
};

function StepperReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ACTIVE_STEP:
            return {
                ...state,
                activeStep: action.payload
            }
        default:
            return state;
    }
}

export default StepperReducer;
