import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {openDialog} from "../../../../Redux/Actions/DialogActions";
import {Button, Col, Container, Row} from "react-bootstrap";
import {getFormValues} from "redux-form";
import {setActiveStep} from "../../../../Redux/Actions/StepperActions";
import pdfIcon from "../../../../media/pdf.png";
import {DANGER, DELETE_DEMANDE_BENEFICIARE, DOMAINE, SUCCESS} from "../../../../Redux/Constants/constants";
import CustomStepper from "../../../Stepper/CustomStepper";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import {openSnackbar} from "../../../../Redux/Actions/SnackbarActions";
import axios from "axios";
import {SIGNÉ} from "../../../../Redux/Constants/EtatVirement";
import {setDemandesBeneficiares} from "../../../../Redux/Actions/BeneficiareActions";
import PasswordModal from "../../../PasswordModal/PasswordModal";
import {openPasswordModel, setErrorMsg} from "../../../../Redux/Actions/PasswordModelActions";

class SignatureBeneficiare extends Component {
    formValue = this.props.formStates;
    onConfirmeDemande = () => {
        this.props.openPasswordModel(true);
    };

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
        const id = this.props.currentDemande
        const url = DOMAINE + `signerBeneficiare/${id}`;
        axios.post(url,null,{headers:{ Authorization: this.props.token }})
            .then(res => {
                this.props.openPasswordModel(false);
                this.props.setDemandesBeneficiares(res.data);
                this.handleNext();
                this.props.openSnackbar({openSnackbar:true, message:"la demande a été signée avec success", style:SUCCESS});
            })
            .catch(err => {
                const errorResponse = err.response.data;
                this.props.openDialog({body: errorResponse.message, show: true, title: "Erreur!!", style:DANGER});
            });
    };

    onEditDemande = () => {
        this.handlePrevious();
    };

    onRejetDemande = () => {
        this.props.openDialog({body: "ÊTES-VOUS SÛR DE VOULOIR SUPPRIMER CETTE DEMANDE", show: true, title: "Attention !!", style:DANGER, type: DELETE_DEMANDE_BENEFICIARE})
    };

    handlePrevious = () => {
        this.props.setActiveStep(this.props.activeStep - 1);
        this.props.history.push('/beneficiares');
    };
    handleNext = () => {
        this.props.openSnackbar({openSnackbar:true, message:"la demande a ete signee avec success",style:SUCCESS});
        this.props.setActiveStep(this.props.activeStep + 1);
        this.props.history.push('/beneficiares/recaputilatif');
    };

    render() {
        if (!this.props.isLogged) return <Redirect to="/" />
        if (!this.formValue) return <Redirect to="/beneficiares" />
        const sigBeneficiare = <Container className="recap">
            <Row className="top">
                <Col><b>Nature: </b>  {this.formValue.nature}</Col>
                <Col><b>Type: </b> {this.formValue.type} </Col>
                <Col><b>Devise: </b> {this.formValue.devise} </Col>
                <Col><b>Pays : </b>  {this.formValue.pays}</Col>
            </Row>
            <Row className="top">
                <Col xs={9}><b>Libelle : </b>  {this.formValue.libelle}</Col>
            </Row>
            <Row className="top">
                <Col xs={3}><b>Adresse 1: </b>  {this.formValue.adresse1}</Col>
                <Col xs={3}><b>Adresse 2: </b> {this.formValue.adresse2} </Col>
                <Col xs={3}><b>Adresse 3: </b> {this.formValue.adresse3} </Col>
            </Row>
            <Row className="top">
                <Col><b>Compte : </b></Col>
            </Row>
            <Row className="top">
                <Col xs={5}><b>Banque: </b>  {this.props.currentBanque.nom}</Col>
                <Col xs={3}><b>BIC: </b> {this.formValue.BIC} </Col>
                <Col xs={4}><b>numero IBAN: </b> {this.formValue.IBAN} </Col>
            </Row>
            <Row className="top">
                <Col>
                    <Button className="btnRejete float-right" onClick={this.onRejetDemande} variant="danger" size="sm"><DeleteRoundedIcon style={{fontSize: 20}}/>{' '}Rejeté</Button>
                    <Button className="btnTraiter float-right" onClick={this.onConfirmeDemande} variant="success" size="sm"><CheckCircleRoundedIcon style={{fontSize: 20}}/>{' '}Confirmer</Button>
                    <Button className="btnEdition float-right" onClick={this.onEditDemande} variant="warning" size="sm"><img src={pdfIcon} alt="print"/>{' '}Edition</Button>
                </Col>
            </Row>
        </Container>
        return <div>
            <CustomStepper></CustomStepper>
            {sigBeneficiare}
            <PasswordModal sign={this.sign}/>
        </div>
    }
}

function mapDispatchToProps(dispatch) {
    return {
        openDialog: o => dispatch(openDialog(o)),
        setActiveStep: step => dispatch(setActiveStep(step)),
        openSnackbar: o => dispatch(openSnackbar(o)),
        setDemandesBeneficiares: demande => dispatch(setDemandesBeneficiares(demande)),
        openPasswordModel: cd => dispatch(openPasswordModel(cd)),
        setErrorMsg: err => dispatch(setErrorMsg(err)),
    }};
const mapStateToProps = state => {
    return {
        formStates: getFormValues('createBeneficiare')(state),
        activeStep: state.StepperReducer.activeStep,
        currentBanque: state.BeneficiareReducer.currentBanque,
        currentDemande: state.BeneficiareReducer.currentDemande,
        isLogged: state.AuthenticationReducer.isLogged,
        token: state.AuthenticationReducer.token,
        identifiant: state.AuthenticationReducer.identifiant,
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(SignatureBeneficiare);
