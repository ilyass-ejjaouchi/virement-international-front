import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import {openDialog} from "../../../../Redux/Actions/DialogActions";
import {Button, Col, Container, Row} from "react-bootstrap";
import {getFormValues} from "redux-form";
import {setActiveStep} from "../../../../Redux/Actions/StepperActions";
import pdfIcon from "../../../../media/pdf.png";
import CustomStepper from "../../../Stepper/CustomStepper";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import CustomSnackbar from "../../../CustomSnackbar/CustomSnackbar";
import {setInitialFormValues} from "../../../../Redux/Actions/BeneficiareActions";

class RecapitulatifBeneficiare extends Component {
    formValue = this.props.formValues;
    onPrintDemande = () => {
       // we have to print the result
        //this.handlePrevious();
    };
    onQuitt = () => {
        this.props.setActiveStep(0);
        this.props.resetBeneficiareForm({})
        this.props.history.push('/beneficiares');
    };
    handlePrevious = () => {
        this.props.setActiveStep(this.props.activeStep - 1);
        this.props.history.push('/beneficiares');
    };
    handleNext = () => {
        this.props.setActiveStep(this.props.activeStep + 1);
        this.props.history.push('/beneficiares/recaputilatif');
    };
    render() {
        if (!this.props.isLogged) return <Redirect to="/" />
        if (!this.formValue) return <Redirect to="/beneficiares" />;
        const sig = <Container className="recap">
            <CustomSnackbar></CustomSnackbar>
            <Row className="top">
                <Col><b>Nature: </b>  {this.formValue.nature}</Col>
                <Col><b>Type: </b> {this.formValue.type} </Col>
                <Col><b>Devise: </b> {this.formValue.devise} </Col>
                <Col><b>Pays : </b>  {this.formValue.pays}</Col>
            </Row>
            <Row className="top">
                <Col><b>Libelle : </b>  {this.formValue.libelle}</Col>
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
                <Col xs={3}><b>Banque: </b>  {this.props.currentBanque.nom}</Col>
                <Col xs={3}><b>BIC: </b> {this.formValue.BIC} </Col>
                <Col xs={3}><b>numero de compte: </b> {this.formValue.numeroDeCompte} </Col>
            </Row>
            <Row className="top">
                <Col>
                    <Button className="btnEdition float-right" onClick={this.onPrintDemande} variant="warning" size="sm"><img src={pdfIcon} alt="print"/>{' '}Imprimer</Button>
                    <Button className="btnRejete float-right" onClick={this.onQuitt} variant="danger" size="sm">Quitter</Button>
                </Col>
            </Row>
        </Container>
        return <div>
            <CustomStepper></CustomStepper>
            {sig}
        </div>
    }
}

function mapDispatchToProps(dispatch) {
    return {
        openDialog: o => dispatch(openDialog(o)),
        setActiveStep: step => dispatch(setActiveStep(step)),
        resetBeneficiareForm:  value => dispatch(setInitialFormValues(value)),
    }};
const mapStateToProps = state => {
    return {
        formValues: state.BeneficiareReducer.formValues,
        activeStep: state.StepperReducer.activeStep,
        currentBanque: state.BeneficiareReducer.currentBanque,
        isLogged: state.AuthenticationReducer.isLogged,
        token: state.AuthenticationReducer.token,
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(RecapitulatifBeneficiare);
