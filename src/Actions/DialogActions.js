import { OPEN_DIALOG } from "../Constants/constants";

export function openDialog(payload) {
    return { type: OPEN_DIALOG, payload };
}
