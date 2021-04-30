import React, {Component} from 'react';
import {connect} from "react-redux";
import {Field, reduxForm, reset, submit} from "redux-form";
import {Button, Col, Form, Nav, Row} from "react-bootstrap";
import {renderDatePicker, renderField, renderSelectField} from "../../../../Redux/redux-form-const/redux_form_cont";
import './FindVirementForm.css';
import SearchIcon from '@material-ui/icons/Search';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ReplayIcon from '@material-ui/icons/Replay';
import {Link} from "react-router-dom";
import axios from "axios";
import {openDialog} from "../../../../Redux/Actions/DialogActions";
import {
    fetchingData, setCurrentPageNumber, setCurrentPageSize,
    setInitialFormValues, setParams,
    setTotalPages,
    setViremets
} from "../../../../Redux/Actions/VirementActions";
import moment from "moment";
import {DANGER, DATA_NOT_FOUND, DOMAINE} from "../../../../Redux/Constants/constants";
import {validate} from "./ValidateFindVirementForm";
import {addDays} from "date-fns";

function mapDispatchToProps(dispatch) {
    return {
        openDialog: o => dispatch(openDialog(o)),
        setViremets: virements => dispatch(setViremets(virements)),
        setTotalPages: nbr => dispatch(setTotalPages(nbr)),
        fetchingData: cd => dispatch(fetchingData(cd)),
        setParams: params => dispatch(setParams(params)),
        setInitialFormValues: value => dispatch(setInitialFormValues(value)),
        setCurrentPageNumber: value => dispatch(setCurrentPageNumber(value))
    }};
const mapStateToProps = state => {
    return {
        formValues: state.form.findVirements.values,
        virements: state.VirementReducer.virements,
        currentPageNumber: state.VirementReducer.currentPageNumber,
        currentPageSize: state.VirementReducer.currentPageSize,
        totalPages: state.VirementReducer.totalPages,
        token: state.AuthenticationReducer.token,
    };
};

class FindVirementForm extends Component {

    getVirements(){
        this.props.setCurrentPageNumber(0);
        const params = {};
        const data = this.props.formValues;
        if (data.status){
            if (data.status != "")params.etat = data.status
        };
        if (data.montantMin) { params.montantMin = data.montantMin };
        if (data.montantMax) { params.montantMax = data.montantMax };
        if (data.dateDebut) {
            params.dateMin = moment(data.dateDebut).format('YYYY-MM-DD')
        };
        if (data.dateFin) {
            params.dateMax =moment(data.dateFin).format('YYYY-MM-DD')
        };
        params.page = 0;
        params.size = 5;
        this.props.fetchingData(true)
        this.props.setInitialFormValues(data);
        this.props.setParams(params);
        axios.get(DOMAINE + 'virements',{  headers: { Authorization: this.props.token }, params: params})
            .then( response => {
                this.props.setViremets(response.data.content)
                this.props.setTotalPages(response.data.totalPages)
                this.props.fetchingData(false)
            })
            .catch(error => {
                console.log(error)
                this.props.openDialog({body: error.message, show: true, title: "Erreur!!", style:DANGER, type: DATA_NOT_FOUND});
                this.props.fetchingData(false);
            });
    }
    resetCreateVirementForm = (e)=>{
        this.props.setInitialFormValues({});
    }
    onSubmit =() =>{
       this.getVirements();
    }

    render() {
        const {reset, valid, handleSubmit} = this.props;
        const etats = ['ENREGISTRÉ','EN_COURS_DE_SIGNATURE','EN_COURS_DE_TRAITEMENT','ABANDONNÉ','SIGNÉ','ANNULÉ','NON_VALIDÉ','TRAITÉ'];
        const form =  <Form onSubmit={handleSubmit(this.onSubmit)}>
            <br/>
            <Row>
                <Col></Col><Col></Col>
                <Col>
                    <Button className="btnRechercher float-right" variant="warning" size="sm"
                            as={Link} to="/virements" onClick={this.resetCreateVirementForm}><AddCircleIcon/>{' '}CRÉER UN VIREMENT</Button>
                </Col>
            </Row><br/>
            <Row>
                <Col xs={6}>
                    <Field name="compte" component={renderSelectField}>
                        <option value="">Tous les comptes</option>
                    </Field>
                </Col>
                <Col xs={3}><Field component={renderDatePicker} minDate={moment().toDate()} maxDate={addDays(new Date(), 90)} placeholder="Date de debut" name="dateDebut"/></Col>
                <Col xs={3}><Field component={renderDatePicker} minDate={moment().toDate()} maxDate={addDays(new Date(), 90)} placeholder="Date de fin" name="dateFin"/></Col>
            </Row>
            <br/>
            <Row>
                <Col><Field component={renderField} name="reference" label="Réference"/></Col>
                <Col>
                    <Field name="status" component={renderSelectField}>
                        <option value="">TOUS STATUS</option>
                        {etats.map(etat =>
                            <option key={etat} value={etat}>{etat}</option>)}
                    </Field>
                </Col>
                <Col><Field component={renderField} type="number" name="montantMin" label="Montant Min" /></Col>
                <Col><Field component={renderField} type="number" name="montantMax" label="Montant Max" /></Col>
            </Row>
            <br/>
            <Row>
                <Col>
                    <Button disabled={!valid} className="btnRechercher float-right" type="submit" variant="danger" size="sm"><SearchIcon/>{' '}Rechercher</Button>
                    <Button className="btnRenitialiser float-right" variant="danger" onClick={reset} size="sm"><ReplayIcon/>{' '}Reinitialiser</Button>
                </Col>
            </Row>
        </Form>
        return <div>
            {form}
        </div>

    }
}

FindVirementForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(FindVirementForm);
FindVirementForm = reduxForm({
    form: 'findVirements',
    validate,
    initialValues:{}
})(FindVirementForm);

export default FindVirementForm;
