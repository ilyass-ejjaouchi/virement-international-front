import React, {Component} from 'react';
import {connect} from "react-redux";
import {Table} from "react-bootstrap";
import './VirementTable.css';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CloseIcon from '@material-ui/icons/Close';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import {setViremets} from "../../../Actions/VirementActions";
import axios from "axios";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import {openDialog} from "../../../Actions/DialogActions";

function mapDispatchToProps(dispatch) {
    return {
        setViremets: rates => dispatch(setViremets(rates)),
        openDialog: rates => dispatch(openDialog(rates))
    }};
const mapStateToProps = state => {
    return {
        virements: state.VirementReducer.virements
    };
};

class ChercherVirement extends Component {
    getVirements = ( ) => {
        axios.get('http://localhost:8081/virements')
            .then( response => {
                this.props.setViremets(response.data)
            })
            .catch(error => {this.props.openDialog({body: error.message, show: true, title: "Erreur!!", style:"danger"})});
    }
    componentDidMount() {
        this.getVirements();
    }
    render() {
        if (!this.props.virements) return <LoadingSpinner></LoadingSpinner>
        return <div>
            <br/>
            <Table striped bordered responsive hover size="sm" className="table">
                <thead>
                <tr>
                    <th>RÉFÉRENCE</th>
                    <th>DATE D'EXÉCUTION</th>
                    <th>COMPTE À DÉBITER</th>
                    <th>ABONNÉ</th>
                    <th>MONTANT</th>
                    <th>CONTRE VALEUR</th>
                    <th>MOTIF</th>
                    <th>ÉTAT</th>
                    <th>STATUT</th>
                    <th>ACTIONS</th>
                </tr>
                </thead>
                <tbody>
                {this.props.virements.map((virement,index) =>
                    <tr key={index}>
                        <td>{virement.id}</td>
                        <td>{virement.dateExecution}</td>
                        <td>compte xxx</td>
                        <td>compte xxx</td>
                        <td>{virement.montant}</td>
                        <td>{virement.contreValeur}</td>
                        <td>motif xxx</td>
                        <td>{virement.etat}</td>
                        <td><FiberManualRecordIcon style={{ fontSize: 20, color: '#DD4040' }}/>{' '}<FiberManualRecordIcon style={{ fontSize: 20, color: '#1fc64d' }}/></td>
                        <td><VisibilityIcon style={{ fontSize: 20, cursor:'pointer' }}/>{' '}<CloseIcon style={{ fontSize: 20, cursor:'pointer' }}/></td>
                    </tr>)}
                </tbody>
            </Table>
        </div>
    }}

ChercherVirement = connect(
    mapStateToProps,
    mapDispatchToProps
)(ChercherVirement);

export default ChercherVirement;
