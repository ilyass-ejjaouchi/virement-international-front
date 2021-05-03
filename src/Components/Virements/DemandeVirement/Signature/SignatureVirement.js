import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import {openDialog} from "../../../../Redux/Actions/DialogActions";
import {Button, Col, Container, Row} from "react-bootstrap";
import {setActiveStep} from "../../../../Redux/Actions/StepperActions";
import pdfIcon from "../../../../media/pdf.png";
import {DANGER, DELETE_VIREMENT, DOMAINE, SUCCESS} from "../../../../Redux/Constants/constants";
import CustomStepper from "../../../Stepper/CustomStepper";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import PasswordModal from "../../../PasswordModal/PasswordModal";
import {openPasswordModel, setErrorMsg} from "../../../../Redux/Actions/PasswordModelActions";
import axios from "axios";
import {openSnackbar} from "../../../../Redux/Actions/SnackbarActions";

class SignatureVirement extends Component {
    componentDidMount() {
        console.log(this.props.currentVirement)
    }

    onConfirmeVirement = () => {
        this.props.openPasswordModel(true)
        // changer l'etat d'enregistrer vers signe
        //this.handleNext();
    };

    onEditVirement = () => {
        this.handlePrevious();
    };

    onRejetVirement = () => {
        this.props.openDialog({body: "ÊTES-VOUS SÛR DE VOULOIR REJETER CE VIREMENT", show: true, title: "Attention !!", style:DANGER,type:DELETE_VIREMENT})
    };

    handlePrevious = () => {
        this.props.setActiveStep(this.props.activeStep - 1);
        this.props.history.push('/virements');
    };
    handleNext = () => {
        this.props.setActiveStep(this.props.activeStep + 1);
        this.props.history.push('/virements/recaputilatif');
    };
    sign = (password) => {
        this.props.setErrorMsg(null);
        const that = this;
        const user={};
        user.password = password;
        user.identifiant = this.props.identifiant;
        axios.post(DOMAINE + 'login',user)
            .then(res => {
                that.props.openPasswordModel(false);
                this.handleNext();
                that.props.openSnackbar({openSnackbar:true, message:"la demande a été signée avec success", style:SUCCESS});
            })
            .catch(function (error) {
                that.props.setErrorMsg("le code secret est incorrect");
            });
    };
    render() {
        if (!this.props.isLogged) return <Redirect to="/" />
        if (!this.props.currentVirement) return <div>
            <Redirect to="/virements" />
        </div>;
        const virement = this.props.currentVirement;
        const sig = <Container className="recap">
            <Row className="top">
                <Col xs={5}><b>Compte à débiter : </b>  {virement.compteDebite.iban}</Col>
                <Col xs={5}><b>Bénéficiaire :
                </b> {virement.compteCredite.client.nom +' ' +virement.compteCredite.client.prenom +' ' +virement.compteCredite.iban} </Col>
            </Row>
            <Row className="top">
                <Col><b>Transfert : </b></Col>
            </Row>
            <Row className="top">
                <Col xs={5}><b>Date d'éxécution : </b>  {virement.dateExecution}</Col>
                <Col xs={5}><b>Motif de virement : </b>  {virement.motif} </Col>
            </Row>
            <Row className="top">
                <Col xs={5}><b>Montant : </b>  {virement.montant}</Col>
                <Col xs={5}><b>Référence Client : </b> {virement.compteCredite.referenceClient} </Col>
            </Row>
            <Row className="top">
                <Col xs={5}><b>Contre Valeur : </b>  {virement.contreValeur}</Col>
                <Col xs={5}><b>Devise: </b> {virement.devise} </Col>
            </Row>
            <Row className="top">
                <Col xs={5}><b>Change/Justificatif : </b> </Col>
            </Row>
            <Row className="top">
                <Col sm={4}><b>Mode d'imputation des frais :</b></Col>
                <Col sm={2}>{virement.modeImputation}</Col>
            </Row>
            <Row className="top">
                <Col sm={4}><b>Retenue :</b></Col>
                <Col sm={2}>{virement.retenue}</Col>
            </Row>
            <Row className="top">
                <Col sm={4}><b>Justificatif :</b></Col>
                <Col sm={2}>{virement.justificatif}</Col>
            </Row>
            <Row className="top">
                <Col>
                    <Button className="btnRejete float-right" onClick={this.onRejetVirement} variant="danger" size="sm"><DeleteRoundedIcon style={{fontSize: 20}}/>{' '}Rejeter</Button>
                    <Button className="btnTraiter float-right" onClick={this.onConfirmeVirement} variant="success" size="sm"><CheckCircleRoundedIcon style={{fontSize: 20}}/>{' '}Confirmer et signer</Button>
                    <Button className="btnEdition float-right" onClick={this.onEditVirement} variant="warning" size="sm"><img src={pdfIcon} alt="print"/>{' '}Editer</Button>
                </Col>
            </Row>
        </Container>
        return <div>
            <CustomStepper></CustomStepper>
            {sig}
            <PasswordModal sign={this.sign}/>
        </div>
    }
}

function mapDispatchToProps(dispatch) {
    return {
        openDialog: o => dispatch(openDialog(o)),
        setActiveStep: step => dispatch(setActiveStep(step)),
        openPasswordModel: cd => dispatch(openPasswordModel(cd)),
        openSnackbar: o => dispatch(openSnackbar(o)),
        setErrorMsg: err => dispatch(setErrorMsg(err)),
    }};
const mapStateToProps = state => {
    return {
        currentVirement: state.VirementReducer.currentVirement,
        activeStep: state.StepperReducer.activeStep,
        isLogged: state.AuthenticationReducer.isLogged,
        token: state.AuthenticationReducer.token,
        identifiant: state.AuthenticationReducer.identifiant
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(SignatureVirement);
