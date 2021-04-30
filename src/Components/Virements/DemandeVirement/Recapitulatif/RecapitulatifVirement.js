import React, {Component} from 'react';
import { connect } from 'react-redux';
import './RecapitulatifVirement.css';
import pdfIcon from '../../../../media/pdf.png';

import {openDialog} from "../../../../Redux/Actions/DialogActions";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {setActiveStep} from "../../../../Redux/Actions/StepperActions";
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import CustomStepper from "../../../Stepper/CustomStepper";
import {Redirect, Switch} from "react-router-dom";
import {setInitialFormValues} from "../../../../Redux/Actions/VirementActions";
import CustomNavbar from "../../../Navbar/CustomNavbar";

class RecapitulatifVirement extends Component {
    formValue = this.props.formStates;
    componentDidMount() {
    }

    onPrintVirement = () => {
        console.log("print virement")
    };

    onQuitt = () => {
        this.props.setActiveStep(0);
        this.props.resetForm({})
        this.props.history.push('/virements');
    };

    handlePrevious = () => {
        this.props.setActiveStep(this.props.activeStep - 1);
        this.props.history.push('/virements');
    };
    render() {
        if (!this.props.isLogged) return <Redirect to="/" />
        if (!this.props.currentCompteDebite) return <div>
            <Redirect to="/virements" />
        </div>;
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
                        <Button className="btnEdition float-right" onClick={this.onPrintVirement} variant="warning" size="sm"><img src={pdfIcon} alt="print"/>{' '}Imprimer</Button>
                        <Button className="btnRejete float-right" onClick={this.onQuitt} variant="danger" size="sm"><DeleteRoundedIcon style={{fontSize: 20}}/>Quitter</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    }
}
function mapDispatchToProps(dispatch) {
    return {
        openDialog: o => dispatch(openDialog(o)),
        setActiveStep: step => dispatch(setActiveStep(step)),
        resetForm: step => dispatch(setInitialFormValues(step)),
    }};
const mapStateToProps = state => {
    return {
        comptesCredite: state.VirementReducer.comptesCredite,
        comptesDebite: state.VirementReducer.comptesDebite,
        date: state.VirementReducer.date,
        currentCompteCredite: state.VirementReducer.currentCompteCredite,
        currentCompteDebite: state.VirementReducer.currentCompteDebite,
        formStates: state.VirementReducer.formValues,
        isLogged: state.AuthenticationReducer.isLogged,
        token: state.AuthenticationReducer.token,
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(RecapitulatifVirement);
