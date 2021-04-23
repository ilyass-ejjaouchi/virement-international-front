import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import {connect} from "react-redux";
import {openSnackbar} from "../../Redux/Actions/SnackbarActions";
import './CustomSnackbar.css';
import {DANGER, SUCCESS, WARNING} from "../../Redux/Constants/constants";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


function CustomSnackbar(props) {


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        props.openSnackbar({openSnackbar:false});
    };
    const vertical = 'top', horizontal= 'right';
    let style = null;
    if (props.style === SUCCESS) style = 'successAlert';
    else if (props.style === DANGER) style = 'dangerAlert';
    else if (props.style === WARNING) style = 'warningAlert';
    return (
        <Snackbar  anchorOrigin={{ vertical, horizontal }} open={props.open} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} className={style}>
                {props.message}
            </Alert>
        </Snackbar>
    );
}
function mapDispatchToProps(dispatch) {
    return {
        openSnackbar: open => dispatch(openSnackbar(open))
    }
};

const mapStateToProps = state => {
    return {
        open: state.SnackbarReducer.openSnackbar,
        message: state.SnackbarReducer.message,
        style: state.SnackbarReducer.style
    };
};

export default CustomSnackbar = connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomSnackbar);
