import React, {Component} from 'react';
import {connect} from "react-redux";
import {DANGER, DELETE_DEMANDE_BENEFICIARE, DOMAINE} from "../../../../Redux/Constants/constants";
import LoadingSpinner from "../../../LoadingSpinner/LoadingSpinner";
import {Alert, Table} from "react-bootstrap";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
import './BeneficiareTable.css';
import {
    fetchingData,
    setCurrentDemande,
    setCurrentPageNumber,
    setDemandesBeneficiares, setTotalPages
} from "../../../../Redux/Actions/BeneficiareActions";
import {openDialog} from "../../../../Redux/Actions/DialogActions";
import {ABANDONNÉ, ANNULÉ} from "../../../../Redux/Constants/EtatVirement";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import FindBeneficiarePagination from "../FindBeneficiarePagination/FindBeneficiarePagination";

function mapDispatchToProps(dispatch) {
    return {
        setDemandesBeneficiares: id => dispatch(setDemandesBeneficiares(id)),
        setCurrentDemande: id => dispatch(setCurrentDemande(id)),
        fetchingData: cd => dispatch(fetchingData(cd)),
        setCurrentPageNumber: nbr => dispatch(setCurrentPageNumber(nbr)),
        setTotalPages: nbr => dispatch(setTotalPages(nbr)),
        openDialog: cd => dispatch(openDialog(cd)),
    }};
const mapStateToProps = state => {
    return {
        demandes: state.BeneficiareReducer.demandesBeneficiares,
        currentPageSize: state.BeneficiareReducer.currentPageSize,
        totalPages: state.BeneficiareReducer.totalPages,
        token: state.AuthenticationReducer.token,
    };
};

class BeneficiareTable extends Component {

    getDemandes(){
        const params= {}
        params.size = this.props.currentPageSize
        params.page = 0
        this.props.fetchingData(true)
        axios.get(DOMAINE + 'beneficiares', { params: params, headers: { Authorization: this.props.token }})
            .then( response => {
                this.props.setTotalPages(response.data.totalPages)
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
        if (!this.props.demandes.content) return <Alert variant="danger" className="alertMsg"><b>DÉSOLÉ AUCUNE DONNÉE À AFFICHER</b></Alert>
        if (this.props.demandes.content.length === 0)
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
                {   this.props.demandes.content.map((demande,index) =>
                    <tr key={index}>
                        <td>{demande.compte.banque.bic}</td>
                        <td>{demande.compte.iban}</td>
                        <td>{demande.libelle}</td>
                        <td className="text-center"><span className={demande.type === "Autre"?"autre":"benef"}>{demande.type}</span></td>
                        <td>{demande.devise}</td>
                        <td>{demande.adresse1}</td>
                        <td>{demande.etat}<FiberManualRecordIcon className={(demande.etat === ANNULÉ ||demande.etat === ABANDONNÉ)? "red":"green"}/></td>
                        <td><VisibilityIcon className="eye"/><CloseIcon onClick={this.onDeleteDemande.bind(this, demande.id)} className="delete"/></td>
                    </tr>)}
                </tbody>
            </Table>
        </div>;
        let pagination = null;
        if (this.props.totalPages > 1) pagination = <FindBeneficiarePagination/>
        return <div>
            {table}
            {pagination}
        </div>
   }
}

BeneficiareTable = connect(
    mapStateToProps,
    mapDispatchToProps
)(BeneficiareTable);

export default BeneficiareTable;
