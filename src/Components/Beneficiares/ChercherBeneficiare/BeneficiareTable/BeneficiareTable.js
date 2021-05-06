import React, {Component} from 'react';
import {connect} from "react-redux";
import {DANGER, DELETE_DEMANDE_BENEFICIARE, DOMAINE, SUCCESS} from "../../../../Redux/Constants/constants";
import LoadingSpinner from "../../../LoadingSpinner/LoadingSpinner";
import {Alert, Table} from "react-bootstrap";
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
import { withRouter } from "react-router";

import './BeneficiareTable.css';
import {
    fetchingData,
    setCurrentDemande,
    setCurrentPageNumber,
    setDemandesBeneficiares,
    setTotalPages
} from "../../../../Redux/Actions/BeneficiareActions";
import {openDialog} from "../../../../Redux/Actions/DialogActions";
import {ABANDONNÉ, ANNULÉ, SIGNÉ} from "../../../../Redux/Constants/EtatVirement";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import FindBeneficiarePagination from "../FindBeneficiarePagination/FindBeneficiarePagination";
import PasswordModal from "../../../PasswordModal/PasswordModal";
import {openPasswordModel, setErrorMsg} from "../../../../Redux/Actions/PasswordModelActions";
import CustomSnackbar from "../../../CustomSnackbar/CustomSnackbar";
import {openSnackbar} from "../../../../Redux/Actions/SnackbarActions";

function mapDispatchToProps(dispatch) {
    return {
        setDemandesBeneficiares: id => dispatch(setDemandesBeneficiares(id)),
        setCurrentDemande: id => dispatch(setCurrentDemande(id)),
        fetchingData: cd => dispatch(fetchingData(cd)),
        setCurrentPageNumber: nbr => dispatch(setCurrentPageNumber(nbr)),
        openPasswordModel: cd => dispatch(openPasswordModel(cd)),
        openSnackbar: cd => dispatch(openSnackbar(cd)),
        setErrorMsg: err => dispatch(setErrorMsg(err)),
        setTotalPages: nbr => dispatch(setTotalPages(nbr)),
        openDialog: cd => dispatch(openDialog(cd)),
    }};
const mapStateToProps = state => {
    return {
        demandes: state.BeneficiareReducer.demandesBeneficiares,
        currentDemande: state.BeneficiareReducer.currentDemande,
        currentPageSize: state.BeneficiareReducer.currentPageSize,
        totalPages: state.BeneficiareReducer.totalPages,
        token: state.AuthenticationReducer.token,
        identifiant: state.AuthenticationReducer.identifiant,
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
    onSignDemande= (id)=>{
        this.props.openPasswordModel(true);
        this.props.setCurrentDemande(id);
    }

    sign = (password) => {
        this.props.setErrorMsg(null);
        const that = this;
        const user={};
        user.password = password;
        user.identifiant = this.props.identifiant;
        axios.post(DOMAINE + 'login',user)
            .then(res => {
                this.signerDemande();
            })
            .catch(function (error) {
                that.props.setErrorMsg("le code secret est incorrect");
            });
    };
    signerDemande = () => {
        const that = this;
        const id = this.props.currentDemande
        const url = DOMAINE + `signerBeneficiare/${id}`;
        axios.post(url,null,{ params: {etat:SIGNÉ}, headers:{ Authorization: this.props.token }})
            .then(res => {
                this.props.openPasswordModel(false);
                this.props.setDemandesBeneficiares(res.data);
                this.props.openSnackbar({openSnackbar:true, message:"la demande a été signée avec success", style:SUCCESS});
            })
            .catch(function (err) {
                that.props.openPasswordModel(false);
                that.props.openDialog({body: err.response.data.message, show: true, title: "Erreur!!", style:DANGER})
            });
    };
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
                        <td><EditIcon className="edit" onClick={this.onSignDemande.bind(this, demande.id)}/>
                        <CloseIcon onClick={this.onDeleteDemande.bind(this, demande.id)} className="delete"/>
                        </td>
                    </tr>)}
                </tbody>
            </Table>
            <PasswordModal sign={this.sign}/>
        </div>;
        let pagination = null;
        if (this.props.totalPages > 1) pagination = <FindBeneficiarePagination/>
        return <div>
            <CustomSnackbar/>
            {table}
            {pagination}
        </div>
   }
}

BeneficiareTable = connect(
    mapStateToProps,
    mapDispatchToProps
)(BeneficiareTable);

export default withRouter(BeneficiareTable);
