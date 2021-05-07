import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Button, Col, Row} from "react-bootstrap";
import axios from "axios";
import {connect} from "react-redux";
import {Link, Redirect} from 'react-router-dom';
import {validate} from './ValidateForm';
import {
    fetchingData,
    getComptes,
    getCurrentUser,
    getRates,
    selectCompteCredite,
    selectCompteDebite,
    selectDateExecution,
    setCurrentVirement,
    setInitialFormValues
} from "../../../Redux/Actions/VirementActions";
import {openDialog} from "../../../Redux/Actions/DialogActions";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

import {
    renderCheckboxField,
    renderDatePicker,
    renderField,
    renderSelectField
} from "../../../Redux/redux-form-const/redux_form_cont";
import moment from "moment";
import {setActiveStep} from "../../../Redux/Actions/StepperActions";
import {ENREGISTRÉ} from "../../../Redux/Constants/EtatVirement";
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import CustomStepper from "../../Stepper/CustomStepper";
import {addDays} from "date-fns";
import {DANGER} from "../../../Redux/Constants/constants";

function mapDispatchToProps(dispatch) {
    return {
            getComptes: comptes => dispatch(getComptes(comptes)),
            getCurrentUser: user => dispatch(getCurrentUser(user)),
            getRates: rates => dispatch(getRates(rates)),
            selectCompteDebite: id => dispatch(selectCompteDebite(id)),
            selectCompteCredite: id => dispatch(selectCompteCredite(id)),
            openDialog: o => dispatch(openDialog(o)),
            fetchingData: fetching => dispatch(fetchingData(fetching)),
            selectDateExecution: date => dispatch(selectDateExecution(date)),
            setActiveStep : step => dispatch(setActiveStep(step)),
            setInitialFormValues : data => dispatch(setInitialFormValues(data)),
            setCurrentVirement: idVirement => dispatch(setCurrentVirement(idVirement))
    }};
const mapStateToProps = state => {
    return {
            date: state.VirementReducer.date,
            currentUser: state.VirementReducer.currentUser,
            comptes: state.VirementReducer.comptes,
            rates: state.VirementReducer.rates,
            createVirement: state.form.createVirement,
            contreValeur: state.VirementReducer.contreValeur,
            isFetching: state.VirementReducer.isFetching,
            activeStep: state.StepperReducer.activeStep,
            initialValues: state.VirementReducer.formValues,
            currentVirement: state.VirementReducer.currentVirement,
            isLogged: state.AuthenticationReducer.isLogged,
            token: state.AuthenticationReducer.token,
    };
};

class CreateVirement extends Component {

    fetchCurrentUser(){
        this.props.fetchingData(true);
        let that = this;
        axios.get('http://localhost:8081/currentClient',{ headers: { Authorization: this.props.token }})
            .then( response => {
                this.props.fetchingData(false);
                this.props.getCurrentUser(response.data)
                this.props.change('refClient', response.data.referenceClient);
            })
            .catch(error => {
                that.props.fetchingData(false);
                that.props.openDialog({body: error, show: true, title: "Erreur!!", style:DANGER})});
    }
    fetchRates(){
        let that = this;
        axios.get('http://localhost:8081/comptes/currencies', { headers: { Authorization: this.props.token }})
            .then( response => {
                this.props.getRates(response.data);
            })
            .catch(error => {that.props.openDialog({body: error.message, show: true, title: "Erreur!!", style:DANGER})});
    }

    convertMontant = (e)=>{
        const value = e.target.value;
/*        axios.get('https://data.fixer.io/api/latest?access_key=9631611b0b43f0776919c6fc92c80116&base=DeviseCompteDebite&symbols=DeviseCompteCredite')
            .then( response => {
                this.props.change('contreValeur', response.data.rates.deviseCredite);
            })
            .catch(error => {});*/
        this.props.change('contreValeur', value);
    }

    createVirement(data){
        this.props.fetchingData(true);
        let that = this;
        axios.post('http://localhost:8081/virements',null, { params: data, headers:{ Authorization: this.props.token }})
            .then(function (response) {
                that.props.fetchingData(false)
                that.props.setCurrentVirement(response.data);
                that.handleNext();
                /*that.props.reset();
                that.props.openDialog({body: "les données ont bien été enregistrées", show: true, title: "Succès", style:"success"})*/
            })
            .catch(function (error) {
                that.props.fetchingData(false)
                that.props.openDialog({body: error.message, show: true, title: "Erreur!!", style:DANGER})
            });
    }

    onSelectCompteCrediter(e){
        const id = e.target.value
        const currentCompteCredite= this.props.currentUser.beneficiares.find(b => b.compte.numeroCompte === parseInt(id))
        this.props.selectCompteDebite(currentCompteCredite);
        this.props.selectCompteCredite(id);
    }

    onSelectCompteDebiter(e){
        const id = e.target.value;
        const currentCompteDebite = this.props.currentUser.comptes.find(c => c.numeroCompte === parseInt(id))
        this.props.selectCompteDebite(currentCompteDebite);
    }

    onSelectDeviseChange = (e)=>{
        console.log(e.target.value)
    }

    onSelectDateExecution  = (e)=> {
        this.props.selectDateExecution(moment(e).format('YYYY-MM-DD'));
    }
    componentDidMount() {
        if (this.props.isLogged){
            this.props.setActiveStep(0);
            this.fetchCurrentUser();
            this.fetchRates();
            this.props.setInitialFormValues({});
        }

    }

    submit = (e) => {
        e.preventDefault();
        const data = this.props.createVirement.values;
        let idCurrentVirement;
        if (this.props.currentVirement) idCurrentVirement = this.props.currentVirement.id
        this.props.setInitialFormValues(data);
        this.createVirement({...data, date:this.props.date, etat: ENREGISTRÉ, id: idCurrentVirement})
    }

    handleNext = () => {
        this.props.setActiveStep(this.props.activeStep + 1);
        this.props.history.push('/virements/signature');
    };


    render() {
        const {submitting, invalid, reset} = this.props;
        if (!this.props.isLogged) return <Redirect to="/" />
        if (!this.props.currentUser) return <LoadingSpinner></LoadingSpinner>
        const form = <form onSubmit={ this.submit }>
            <br/><Row>
                <Col><h4>Demander un Virement</h4><hr/></Col>
                <Col><Button className="btnRechercher float-right" size="sm" as={Link} to="/virements/chercherVirement" >
                    <FormatListBulletedIcon style={{ fontSize: 20 }}/>{' '}LISTE DES VIREMENTS</Button></Col>
            </Row>
            <Row>
                <Col>
                    <h6>Compte à débiter</h6><hr/>
                    <Field name="compteDebite" component={renderSelectField} onChange={this.onSelectCompteDebiter.bind(this)}>
                        <option value="">Veuillez choisir le compte à débiter </option>
                        {this.props.currentUser.comptes.map(compte =>
                            <option key={compte.numeroCompte} value={compte.numeroCompte}>{compte.iban}</option>)}
                    </Field>
                </Col>
                <Col>
                    <h6>Compte à créditer</h6><hr/>
                    <Field name="compteCredite"  component={renderSelectField} onChange={this.onSelectCompteCrediter.bind(this)}>
                        <option value="">Veuillez choisir le compte à créditer </option>
                        {this.props.currentUser.beneficiares.map(benef =>
                            <option key={benef.id} value={benef.compte.numeroCompte}>{benef.libelle}</option>)}
                    </Field>
                </Col>
            </Row><br/>
            <h6>Virement</h6> <hr/>
            <Row>
                <Col>
                    <Field name="typeVirement"  component={renderSelectField}>
                        <option value="">Veuillez choisir le type de virement </option>
                        <option>Virement commercial</option>
                        <option>virement financier </option>
                    </Field>
                </Col>
            </Row><br/>
            <Row>
                <Col>
                    <Field component={renderDatePicker} minDate={moment().toDate()} maxDate={addDays(new Date(), 30)} name="dateExecution" placeholder="Date d'execution" onChange={this.onSelectDateExecution}/>
                </Col>
                <Col>
                    <Field component={renderSelectField} name="devise"
                           className="form-control form-control-sm" onChange={this.onSelectDeviseChange}>
                        <option value="">Veuillez choisir la devise </option>
                        {this.props.rates.map((rate,index) => <option key={index} value={rate}> {rate}</option>)}
                    </Field>
                </Col>
                <Col><Field component={renderField} type="number" name="montant"
                            label="Montant" className="form-control form-control-sm"
                            onChange={this.convertMontant}/></Col>
                <Col><Field component={renderField} type="number" name="contreValeur" disabled={true} value={this.props.contreValeur} label="Contre Valeur" /></Col>
            </Row><br/>
            <Row>
                <Col>
                    <Field component={renderField} name="motif" label="Motif" />
                </Col>
                <Col>
                    <Field component={renderField} name="refClient" disabled={true} label="Réference Client" />
                </Col>
            </Row><br/>
            <h6>change/Justificatif</h6><hr/>
            <Row>
                <Col sm={4}><p>Mode d'imputation des frais :</p></Col>
                <Col sm={2}><Field component={renderCheckboxField} name="modeImputation" label="SHA"/></Col>
                <Col sm={2}><Field component={renderCheckboxField} name="modeImputation" label="OUR"/></Col>
                <Col sm={2}><Field component={renderCheckboxField} name="modeImputation" label="BEN"/></Col>
            </Row><br/>
            <Row>
                <Col sm={4}><p>Retenue :</p></Col>
                <Col sm={2}><Field component={renderCheckboxField} name="retenue" label="Payé"/></Col>
                <Col sm={2}><Field component={renderCheckboxField} name="retenue" label="Donneur"/></Col>
                <Col sm={2}><Field component={renderCheckboxField} name="retenue" label="Bénéficiaire"/></Col>
            </Row><br/>
            <Row>
                <Col sm={4}><p>Justificatif :</p></Col>
                <Col sm={2}><Field component={renderCheckboxField} name="justificatif" label="Non"/></Col>
                <Col sm={2}><Field component={renderCheckboxField} name="justificatif" label="Oui"/></Col>
            </Row><br/>
            {/* <h6>Transfert Scolarité / Santé</h6><hr/>
                <Row>
                    <Col><Field component={renderField}  type="text" label="Nom Complet" name="nomComplet"/></Col>
                    <Col><Field component={renderField}  type="text" label="Numéro de passport" name="numPassport"/></Col>
                    <Col><Field component={renderField}  type="text" label="Numéro de CIN" name="CIN"/></Col>
                </Row><br/>
                <Row>
                    <Col><Field component={renderField}  type="text" label="Bénéficiaire" name="beneficiare"/></Col>
                    <Col><Field component={renderField}  type="text" label="Nom de médecin" name="nomMedecin" /></Col>
                    <Col><Field component={renderField}  type="text" label="Numéro insc du médecin" name="numinstruction"/></Col>
                </Row><br/>
                <Row>
                    <Col><Field component={renderField}  type="text" label="Organisme hospitalier" name="organismeHospitalier"/></Col>
                    <Col><Field component={renderField}  type="text" label="Période de couverture" name="periodeCouverture" /></Col>
                </Row><br/>
                */}
            <Row>
                <Col><Button disabled={submitting || invalid} className="btnEnvoyer float-right" size="sm" type="submit"
                                    variant="primary">SUIVANT{' '}<NavigateNextIcon style={{ fontSize: 20 }}/></Button></Col>
            </Row><br/>
        </form>
        return <div>
                     <CustomStepper></CustomStepper>
                        {form}
                    </div>
    }}

CreateVirement = reduxForm({
    form: 'createVirement',
    validate,
    initialValues: {}
})(CreateVirement);
CreateVirement = connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateVirement);

export default CreateVirement;
