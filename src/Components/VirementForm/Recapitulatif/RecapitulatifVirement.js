import React, {Component} from 'react';
import { connect } from 'react-redux';
import './RecapitulatifVirement.css';
import pdfIcon from '../../../media/pdf.png';
import deleteIcon from '../../../media/delete.png';
import validerIcon from '../../../media/valider.png';

import {openDialog} from "../../../Actions/DialogActions";
import {Button, Col, Container, Row} from "react-bootstrap";
import {Field} from "redux-form";
import {renderCheckboxField} from "../../../redux-form-const";

class RecapitulatifVirement extends Component {

    render() {
        return <Container className="recap">
            <Row className="top">
                <Col xs={5}><b>Compte à débiter : </b>  numero</Col>
                <Col xs={5}><b>Bénéficiaire : </b> nom du bénéficiaire </Col>
            </Row>
            <Row className="top">
                <Col><b>Transfert : </b></Col>
            </Row>
            <Row className="top">
                <Col xs={5}><b>Date d'éxécution : </b>  13/09/2021</Col>
                <Col xs={5}><b>Motif de virement : </b> Virement International </Col>
            </Row>
            <Row className="top">
                <Col xs={5}><b>Montant : </b>  2400</Col>
                <Col xs={5}><b>Référence Client : </b> Ref2001 </Col>
            </Row>
            <Row className="top">
                <Col xs={5}><b>Contre Valeur : </b>  2450</Col>
                <Col xs={5}><b>Devise: </b> MAD </Col>
            </Row>
            <Row className="top">
                <Col xs={5}><b>Change/Justificatif : </b> </Col>
            </Row>
            <Row className="top">
                <Col sm={4}><b>Mode d'imputation des frais :</b></Col>
                <Col sm={2}>SHA</Col>
            </Row>
            <Row className="top">
                <Col sm={4}><b>Retenue :</b></Col>
                <Col sm={2}>Donneur</Col>
            </Row>
            <Row className="top">
                <Col sm={4}><b>Justificatif :</b></Col>
                <Col sm={2}>Non</Col>
            </Row>
            <Row className="top">
                <Col></Col> <Col></Col>
                <Col>
                    <Button className="btnEdition" variant="warning" size="sm"><img src={pdfIcon} alt="print"/>{' '}Edition</Button>{'  '}
                    <Button className="btnTraiter" variant="success" size="sm"><img src={validerIcon} alt="print"/>{' '}Traité</Button>{'  '}
                    <Button className="btnRejete" variant="danger" size="sm"><img src={deleteIcon} alt="print"/>Rejeté</Button>
                </Col>
            </Row>
        </Container>;
    }
}


function mapDispatchToProps(dispatch) {
    return {
        openDialog: o => dispatch(openDialog(o)),
    }};
const mapStateToProps = state => {
    return {
        comptesCredite: state.VirementReducer.comptesCredite,
        comptesDebite: state.VirementReducer.comptesDebite,
        createVirement: state.form.createVirement};
};

export default connect(mapStateToProps,mapDispatchToProps)(RecapitulatifVirement);
