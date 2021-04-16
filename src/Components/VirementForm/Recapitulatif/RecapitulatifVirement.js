import React, {Component} from 'react';
import { connect } from 'react-redux';
import './RecapitulatifVirement.css';
import pdfIcon from '../../../media/pdf.png';
import deleteIcon from '../../../media/delete.png';
import validerIcon from '../../../media/valider.png';

import {openDialog} from "../../../Actions/DialogActions";
import {Button, Col, Container, Row} from "react-bootstrap";
import {setActiveStep} from "../../../Actions/StepperActions";

class RecapitulatifVirement extends Component {
    formValue = this.props.formStates;
    componentDidMount() {
        console.log(this.formValue)
    }

    onEditVirement = () => {
        this.handlePrevious();
    };
    onTraiteVirement = () => {
        this.handlePrevious();
    };
    handlePrevious = () => {
        this.props.setActiveStep(this.props.activeStep - 1);
        this.props.history.push('/virements');
    };
    render() {
        return <Container className="recap">
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
                <Col></Col> <Col></Col>
                <Col>
                    <Button className="btnEdition" onClick={this.onEditVirement} variant="warning" size="sm"><img src={pdfIcon} alt="print"/>{' '}Edition</Button>{'  '}
                    <Button className="btnTraiter" onClick={this.onTraiteVirement} variant="success" size="sm"><img src={validerIcon} alt="print"/>Traité</Button>{'  '}
                    <Button className="btnRejete" variant="danger" size="sm"><img src={deleteIcon} alt="print"/>Rejeté</Button>
                </Col>
            </Row>
        </Container>;
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
        formStates: state.VirementReducer.formValues,
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(RecapitulatifVirement);
