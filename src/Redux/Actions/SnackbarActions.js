import {OPEN_SNACKBAR} from "../Constants/constants";

export function openSnackbar(payload) {
    return { type: OPEN_SNACKBAR, payload };
}
