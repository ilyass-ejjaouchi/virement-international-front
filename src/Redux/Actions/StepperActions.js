import {SET_ACTIVE_STEP} from "../Constants/constants";

export function setActiveStep(payload) {
    return { type: SET_ACTIVE_STEP, payload };
}
