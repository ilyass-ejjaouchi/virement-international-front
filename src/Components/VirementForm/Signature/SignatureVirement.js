import React, {Component} from 'react';
import { connect } from 'react-redux';
import validerIcon from '../../../media/valider.png';

import {openDialog} from "../../../Redux/Actions/DialogActions";
import {Button, Col, Container, Row} from "react-bootstrap";
import {getFormValues} from "redux-form";
import {setActiveStep} from "../../../Redux/Actions/StepperActions";
import pdfIcon from "../../../media/pdf.png";
import {DELETE_VIREMENT} from "../../../Redux/Constants/constants";
import CustomStepper from "../../Stepper/CustomStepper";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";

class SignatureVirement extends Component {
    formValue = this.props.formStates;

    onConfirmeVirement = () => {
        // changer l'etat d'enregistrer vers signe
        this.handleNext();
    };

    onEditVirement = () => {
        this.handlePrevious();
    };

    onRejetVirement = () => {
        this.props.openDialog({body: "ÊTES-VOUS SÛR DE VOULOIR REJETER CE VIREMENT", show: true, title: "Attention !!", style:"danger",type:DELETE_VIREMENT})
    };

    handlePrevious = () => {
        this.props.setActiveStep(this.props.activeStep - 1);
        this.props.history.push('/virements');
    };
    handleNext = () => {
        this.props.setActiveStep(this.props.activeStep + 1);
        this.props.history.push('/virements/recaputilatif');
    };
    render() {
        return <div>
            <CustomStepper></CustomStepper>
            <Container className="recap">
                <Row className="top">
                    <Col xs={5}><b>Compte à débiter : </b>  {this.props.currentCompteDebite.iban}</Col>
                    <Col xs={5}><b>Bénéficiaire : </b> {this.props.currentCompteCredite.client.prenom +' '+this.props.currentCompteCredite.iban} </Col>
                </Row>
                <Row className="top">
                    <Col><b>Transfert : </b></Col>
                </Row>
                <Row className="top">
                    <Col xs={5}><b>Date d'éxécution : </b>  {this.props.date}</Col>
                    <Col xs={5}><b>Motif de virement : </b>  {this.formValue.motif} </Col>
                </Row>
                <Row className="top">
                    <Col xs={5}><b>Montant : </b>  {this.formValue.montant}</Col>
                    <Col xs={5}><b>Référence Client : </b> {this.formValue.refClient} </Col>
                </Row>
                <Row className="top">
                    <Col xs={5}><b>Contre Valeur : </b>  {this.formValue.contreValeur}</Col>
                    <Col xs={5}><b>Devise: </b> {this.formValue.devise} </Col>
                </Row>
                <Row className="top">
                    <Col xs={5}><b>Change/Justificatif : </b> </Col>
                </Row>
                <Row className="top">
                    <Col sm={4}><b>Mode d'imputation des frais :</b></Col>
                    <Col sm={2}>{this.formValue.modeImputation}</Col>
                </Row>
                <Row className="top">
                    <Col sm={4}><b>Retenue :</b></Col>
                    <Col sm={2}>{this.formValue.retenue}</Col>
                </Row>
                <Row className="top">
                    <Col sm={4}><b>Justificatif :</b></Col>
                    <Col sm={2}>{this.formValue.justificatif}</Col>
                </Row>
                <Row className="top">
                    <Col>
                        <Button className="btnRejete float-right" onClick={this.onRejetVirement} variant="danger" size="sm"><DeleteRoundedIcon style={{fontSize: 20}}/>{' '}Rejeté</Button>
                        <Button className="btnTraiter float-right" onClick={this.onConfirmeVirement} variant="success" size="sm"><CheckCircleRoundedIcon style={{fontSize: 20}}/>{' '}Confirmer</Button>
                        <Button className="btnEdition float-right" onClick={this.onEditVirement} variant="warning" size="sm"><img src={pdfIcon} alt="print"/>{' '}Edition</Button>
                    </Col>
                </Row>
            </Container>;
        </div>
    }
}

function mapDispatchToProps(dispatch) {
    return {
        openDialog: o => dispatch(openDialog(o)),
        setActiveStep: step => dispatch(setActiveStep(step)),
    }};
const mapStateToProps = state => {
    return {
        comptesCredite: state.VirementReducer.comptesCredite,
        comptesDebite: state.VirementReducer.comptesDebite,
        date: state.VirementReducer.date,
        currentCompteCredite: state.VirementReducer.currentCompteCredite,
        currentCompteDebite: state.VirementReducer.currentCompteDebite,
        formStates: getFormValues('createVirement')(state),
        activeStep: state.StepperReducer.activeStep
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(SignatureVirement);
