import React, {Component} from 'react';
import {connect} from "react-redux";
import FindVirementForm from "./FindVirementForm/FindVirementForm";
import BasicTable from "./VirementTable/VirementTable";
import {openDialog} from "../../../Redux/Actions/DialogActions";
import {Redirect} from "react-router-dom";


function mapDispatchToProps(dispatch) {
    return {
        openDialog: o => dispatch(openDialog(o)),
    }};
const mapStateToProps = state => {
    return {
        findVirementForm: state.form.findVirements,
        isLogged: state.AuthenticationReducer.isLogged,
        token: state.AuthenticationReducer.token,
    };
};

class ChercherVirement extends Component {

    render() {
        if (!this.props.isLogged) return <Redirect to="/" />
        return <div>
            <FindVirementForm></FindVirementForm>
            <BasicTable ></BasicTable>
        </div>
    }}

ChercherVirement = connect(
    mapStateToProps,
    mapDispatchToProps
)(ChercherVirement);

export default ChercherVirement;
