import React, {Component} from 'react';
import {connect} from "react-redux";
import {DANGER, DELETE_DEMANDE_BENEFICIARE} from "../../../../Redux/Constants/constants";
import LoadingSpinner from "../../../LoadingSpinner/LoadingSpinner";
import {Alert, Table} from "react-bootstrap";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
import {fetchingData, setCurrentDemande, setDemandesBeneficiares} from "../../../../Redux/Actions/BeneficiareActions";
import {openDialog} from "../../../../Redux/Actions/DialogActions";
import {ABANDONNÉ, ANNULÉ, NON_VALIDÉ} from "../../../../Redux/Constants/EtatVirement";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

function mapDispatchToProps(dispatch) {
    return {
        setDemandesBeneficiares: id => dispatch(setDemandesBeneficiares(id)),
        setCurrentDemande: id => dispatch(setCurrentDemande(id)),
        fetchingData: cd => dispatch(fetchingData(cd)),
        openDialog: cd => dispatch(openDialog(cd)),
    }};
const mapStateToProps = state => {
    return {
        demandes: state.BeneficiareReducer.demandesBeneficiares
    };
};

class BeneficiareTable extends Component {

    getDemandes(){
        this.props.fetchingData(true)
        axios.get('http://localhost:8081/beneficiares')
            .then( response => {
                this.props.setDemandesBeneficiares(response.data)
                this.props.fetchingData(false)
            })
            .catch(error => {
                this.props.openDialog({body: error.message, show: true, title: "Erreur!!", style:DANGER});
                this.props.fetchingData(false);
            });
    }
    componentDidMount() {
        this.getDemandes();
    }

    onDeleteDemande= (id)=>{
        this.props.setCurrentDemande(id);
        this.props.openDialog({body: "ÊTES-VOUS SÛR DE VOULOIR SUPPRIMER CETTE DEMANDE", show: true,
            title: "ATTENTION !", style:DANGER,type:DELETE_DEMANDE_BENEFICIARE});
    }
    render() {
        if (this.props.isFetching) return <LoadingSpinner/>
        if (!this.props.demandes) return <Alert variant="danger" className="alertMsg"><b>DÉSOLÉ AUCUNE DONNÉE À AFFICHER</b></Alert>
        if (this.props.demandes.length === 0)
            return <Alert variant="warning" className="alertMsg"><b>DÉSOLÉ AUCUNE DONNÉE À AFFICHER</b></Alert>
        const table = <div>
            <br/>
            <Table striped bordered responsive hover size="sm" className="table">
                <thead>
                <tr>
                    <th>CODE BIC</th>
                    <th>CODE IBAN</th>
                    <th>LIBELLE</th>
                    <th>TYPE</th>
                    <th>DEVISE</th>
                    <th>ADRESSE</th>
                    <th>STATUT</th>
                    <th>ACTION</th>
                </tr>
                </thead>
                <tbody>
                {   this.props.demandes.map((demande,index) =>
                    <tr key={index}>
                        <td>{demande.compte.banque.bic}</td>
                        <td>{demande.compte.iban}</td>
                        <td>{demande.libelle}</td>
                        <td>{demande.type}</td>
                        <td>{demande.devise}</td>
                        <td>{demande.adresse1}</td>
                        <td>{demande.etat}<FiberManualRecordIcon className={(demande.etat === ANNULÉ ||demande.etat === ABANDONNÉ)? "red":"green"}/></td>
                        <td><VisibilityIcon className="eye"/><CloseIcon onClick={this.onDeleteDemande.bind(this, demande.id)} className="delete"/></td>
                    </tr>)}
                </tbody>
            </Table>
        </div>
        return <div>{table}</div>
   }
}

BeneficiareTable = connect(
    mapStateToProps,
    mapDispatchToProps
)(BeneficiareTable);

export default BeneficiareTable;
