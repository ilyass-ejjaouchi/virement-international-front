import React, {Component} from 'react';
import {connect} from "react-redux";
import FindBeneficiareForm from "./FindBeneficiareForm/FindBeneficiareForm";
import BeneficiareTable from "./BeneficiareTable/BeneficiareTable";
import {Container} from "react-bootstrap";

function mapDispatchToProps(dispatch) {
    return {

    }};
const mapStateToProps = state => {
    return {
        demandesBeneficiares: state.BeneficiareReducer.demandesBeneficiares
    };
};

class ChercherBeneficiare extends Component {

    constructor() {
        super();
    }
    render() {
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
