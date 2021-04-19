import React, {Component} from 'react';
import {connect} from "react-redux";
import {Alert, Button, Nav, Table} from "react-bootstrap";
import './VirementTable.css';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CloseIcon from '@material-ui/icons/Close';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import {setCurrentVirement, setViremets} from "../../../Redux/Actions/VirementActions";
import axios from "axios";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import {openDialog} from "../../../Redux/Actions/DialogActions";
import {DELETE_VIREMENT} from "../../../Redux/Constants/constants";
import {ABANDONNÉ, ANNULÉ, NON_VALIDÉ} from "../../../Redux/Constants/EtatVirement";
import {Link} from "react-router-dom";

function mapDispatchToProps(dispatch) {
    return {
        openDialog: cd => dispatch(openDialog(cd)),
        setCurrentVirement: id => dispatch(setCurrentVirement(id)),
    }};
const mapStateToProps = state => {
    return {
        virements: state.VirementReducer.virements,
        isFetching: state.VirementReducer.isFetching
    };
};

class ChercherVirement extends Component {

    componentDidMount() {
    }

    onDeleteVirement= (id)=>{
        this.props.setCurrentVirement(id);
        this.props.openDialog({body: "ÊTES-VOUS SÛR DE VOULOIR SUPPRIMER CE VIREMENT", show: true,
            title: "Erreur!!", style:"danger", type: DELETE_VIREMENT});
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
                        <td>motif xxx</td>
                        <td>{virement.etat+' '}<FiberManualRecordIcon className={(virement.etat === ANNULÉ ||virement.etat === ABANDONNÉ ||virement.etat ===NON_VALIDÉ)? "red":"green"}/></td>
                        <td><VisibilityIcon className="eye"/><CloseIcon onClick={this.onDeleteVirement.bind(this, virement.id)} className="delete"/></td>
                    </tr>)}
                </tbody>
            </Table>
        </div>
        return <div>{table}</div>
    }}

ChercherVirement = connect(
    mapStateToProps,
    mapDispatchToProps
)(ChercherVirement);

export default ChercherVirement;
