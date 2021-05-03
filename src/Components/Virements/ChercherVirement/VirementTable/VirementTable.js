import React, {Component} from 'react';
import {connect} from "react-redux";
import {Alert, Table} from "react-bootstrap";
import './VirementTable.css';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CloseIcon from '@material-ui/icons/Close';
import { withRouter } from "react-router";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import {
    fetchingData,
    setCurrentPageNumber,
    setCurrentVirement,
    setViremets
} from "../../../../Redux/Actions/VirementActions";
import LoadingSpinner from "../../../LoadingSpinner/LoadingSpinner";
import {openDialog} from "../../../../Redux/Actions/DialogActions";
import {DANGER, DELETE_VIREMENT} from "../../../../Redux/Constants/constants";
import {ABANDONNÉ, ANNULÉ, NON_VALIDÉ} from "../../../../Redux/Constants/EtatVirement";
import FindVirementPagination from "../FindVirementPagination/FindVirementPagination";
import {setActiveStep} from "../../../../Redux/Actions/StepperActions";

function mapDispatchToProps(dispatch) {
    return {
        openDialog: cd => dispatch(openDialog(cd)),
        setCurrentVirement: virement => dispatch(setCurrentVirement(virement)),
        setCurrentPageNumber: nbr => dispatch(setCurrentPageNumber(nbr)),
        setViremets: virements => dispatch(setViremets(virements)),
        setActiveStep : step => dispatch(setActiveStep(step)),
        fetchingData: cd => dispatch(fetchingData(cd)),
    }};
const mapStateToProps = state => {
    return {
        virements: state.VirementReducer.virements,
        isFetching: state.VirementReducer.isFetching,
        totalPages: state.VirementReducer.totalPages,
        currentPageNumber: state.VirementReducer.currentPageNumber,
        params: state.VirementReducer.params
    };
};

class ChercherVirement extends Component {
    componentDidMount() {
        console.log(this.props.params);
    }

    onDeleteVirement= (virement)=>{
        this.props.setCurrentVirement(virement)
        this.props.openDialog({body: "ÊTES-VOUS SÛR DE VOULOIR SUPPRIMER CE VIREMENT", show: true,
            title: "ATTENTION !", style:DANGER, type: DELETE_VIREMENT});
    }
    onSeeDetails = (virement)=>{
        this.props.setCurrentVirement(virement)
        this.props.setActiveStep(1);
        this.props.history.push('/virements/signature');
    }
    render() {
        if (this.props.isFetching) return <LoadingSpinner/>
        if (!this.props.virements ) return <p></p>
        if (this.props.virements.length === 0)
            return <Alert variant="warning" className="alertMsg"><b>DÉSOLÉ AUCUNE DONNÉE À AFFICHER</b></Alert>
        const table = <div>
            <br/>
            <Table striped bordered responsive hover size="sm" className="table">
                <thead>
                <tr>
                    <th>RÉFÉRENCE</th>
                    <th>DATE D'EXÉCUTION</th>
                    <th>COMPTE À DÉBITER</th>
                    <th>COMPTE À CRÉDITER</th>
                    <th>MONTANT</th>
                    <th>CONTRE VALEUR</th>
                    <th>MOTIF</th>
                    <th>ÉTAT</th>
                    <th>ACTIONS</th>
                </tr>
                </thead>
                <tbody>
                {   this.props.virements.map((virement,index) =>
                    <tr key={index}>
                        <td>{virement.id}</td>
                        <td>{virement.dateExecution}</td>
                        <td>{virement.compteCredite.numeroCompte}</td>
                        <td>{virement.compteDebite.numeroCompte}</td>
                        <td>{virement.montant}</td>
                        <td>{virement.contreValeur+' '+virement.devise}</td>
                        <td>{virement.motif}</td>
                        <td>{virement.etat+' '}<FiberManualRecordIcon className={(virement.etat === ANNULÉ ||virement.etat === ABANDONNÉ ||virement.etat ===NON_VALIDÉ)? "red":"green"}/></td>
                        <td><VisibilityIcon onClick={this.onSeeDetails.bind(this, virement)} className="eye"/><CloseIcon onClick={this.onDeleteVirement.bind(this, virement)} className="delete"/></td>
                    </tr>)}
                </tbody>
            </Table>
        </div>
        let pagination = null;
        if (this.props.totalPages > 1) pagination = <FindVirementPagination/>
        return <div>
            {table}
            {pagination}
        </div>
    }}

ChercherVirement = connect(
    mapStateToProps,
    mapDispatchToProps
)(ChercherVirement);

export default withRouter(ChercherVirement);
