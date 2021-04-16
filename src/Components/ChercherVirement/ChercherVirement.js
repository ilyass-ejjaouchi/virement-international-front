import React, {Component} from 'react';
import {connect} from "react-redux";
import FindVirementForm from "./FindVirementForm/FindVirementForm";
import BasicTable from "./VirementTable/VirementTable";

function mapDispatchToProps(dispatch) {
    return {}};
const mapStateToProps = state => {
    return {};
};

class ChercherVirement extends Component {

    constructor() {
        super();
    }
    render() {
        return <div>
            <FindVirementForm></FindVirementForm>
            <BasicTable></BasicTable>
        </div>
    }}

ChercherVirement = connect(
    mapStateToProps,
    mapDispatchToProps
)(ChercherVirement);

export default ChercherVirement;
