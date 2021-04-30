import React, {Component} from 'react';
import {connect} from "react-redux";
import FindBeneficiareForm from "./FindBeneficiareForm/FindBeneficiareForm";
import BeneficiareTable from "./BeneficiareTable/BeneficiareTable";
import {Container} from "react-bootstrap";
import {Redirect} from "react-router-dom";


function mapDispatchToProps(dispatch) {
    return {

    }};
const mapStateToProps = state => {
    return {
        demandesBeneficiares: state.BeneficiareReducer.demandesBeneficiares,
        isLogged: state.AuthenticationReducer.isLogged,
        token: state.AuthenticationReducer.token,
    };
};

class ChercherBeneficiare extends Component {

    constructor() {
        super();
    }
    render() {
        if (!this.props.isLogged) return <Redirect to="/" />
        return <Container>
                <FindBeneficiareForm/>
                <BeneficiareTable/>
            </Container>
    }}

ChercherBeneficiare = connect(
    mapStateToProps,
    mapDispatchToProps
)(ChercherBeneficiare);

export default ChercherBeneficiare;
