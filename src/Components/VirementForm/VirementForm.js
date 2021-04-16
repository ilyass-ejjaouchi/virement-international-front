import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Button, Col, Row} from "react-bootstrap";
import axios from "axios";
import {connect} from "react-redux";
import {Link} from 'react-router-dom';
import {validate} from './ValidateForm';
import {
    fetchingData,
    getComptes,
    getRates,
    selectCompteCredite,
    selectCompteDebite, selectDateExecution, setCurrentVirement, setInitialFormValues
} from "../../Actions/VirementActions";
import {openDialog} from "../../Actions/DialogActions";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import {
    renderSelectField,
    renderCheckboxField,
    renderField,
    renderDatePicker
} from "../../redux-form-const/redux_form_cont";
import moment from "moment";
import {setActiveStep} from "../../Actions/StepperActions";
import {ENREGISTRÉ} from "../../Constants/EtatVirement";
import {DATA_NOT_FOUND, REJET_VIREMENT} from "../../Constants/constants";

function mapDispatchToProps(dispatch) {
    return {getComptes: comptes => dispatch(getComptes(comptes)),
            getRates: rates => dispatch(getRates(rates)),
            selectCompteDebite: id => dispatch(selectCompteDebite(id)),
            selectCompteCredite: id => dispatch(selectCompteCredite(id)),
            openDialog: o => dispatch(openDialog(o)),
            fetchingData: fetching => dispatch(fetchingData(fetching)),
            selectDateExecution: date => dispatch(selectDateExecution(date)),
            setActiveStep : step => dispatch(setActiveStep(step)),
            setInitialFormValues : data => dispatch(setInitialFormValues(data)),
            setCurrentVirement: idVirement => dispatch(setCurrentVirement(idVirement)),
    }};
const mapStateToProps = state => {
    return {
            comptesCredite: state.VirementReducer.comptesCredite,
            comptesDebite: state.VirementReducer.comptesDebite,
            date: state.VirementReducer.date,
            comptes: state.VirementReducer.comptes,
            rates: state.VirementReducer.rates,
            createVirement: state.form.createVirement,
            contreValeur: state.VirementReducer.contreValeur,
            isFetching: state.VirementReducer.isFetching,
            activeStep: state.StepperReducer.activeStep,
            initialValues: state.VirementReducer.formValues,
            idVirement: state.VirementReducer.idcurrentVirement,
    };
};

class CreateVirement extends Component {
    onHandleTest = ()=>{
        this.props.openDialog({body: "data not found", show: true, title: "Erreur!!", style:"danger",type:REJET_VIREMENT})
    }

    fetchComptes(){
        let that = this;
        axios.get('http://localhost:8081/comptes')
            .then( response => {
                this.props.getComptes(response.data)
            })
            .catch(error => {that.props.openDialog({body: error.message, show: true, title: "Erreur!!", style:"danger"})});
    }
    fetchRates(){
        let that = this;
        axios.get('http://localhost:8081/comptes/currencies')
            .then( response => {
                this.props.getRates(response.data);
            })
            .catch(error => {that.props.openDialog({body: error.message, show: true, title: "Erreur!!", style:"danger"})});
    }

    convertMontant = (e)=>{
        const value = e.target.value;
/*        axios.get('https://data.fixer.io/api/latest?access_key=9631611b0b43f0776919c6fc92c80116&base=DeviseCompteDebite&symbols=DeviseCompteCredite')
            .then( response => {
                this.props.change('contreValeur', response.data.rates.deviseCredite);
            })
            .catch(error => {});*/
        this.props.change('contreValeur', value*10.2);
    }

    createVirement(data){
        this.props.fetchingData(true);
        let that = this;
        axios.post('http://localhost:8081/virements',null, { params: data})
            .then(function (response) {
                that.props.fetchingData(false)
                that.handleNext();
                that.props.setCurrentVirement(response.data.id);
                /*that.props.reset();
                that.props.openDialog({body: "les données ont bien été enregistrées", show: true, title: "Succès", style:"success"})*/
            })
            .catch(function (error) {
                that.props.openDialog({body: error.message, show: true, title: "Erreur!!", style:"danger"})
            });
    }

    onSelectCompteCrediter(e){
        const id = e.target.value
        this.props.selectCompteCredite(this.props.comptes.find(c => c.numeroCompte === parseInt(id)));
    }

    onSelectCompteDebiter(e){
        const id = e.target.value;
        const currentCompteDebite = this.props.comptes.find(c => c.numeroCompte === parseInt(id))
        this.props.selectCompteDebite(currentCompteDebite);
        if (currentCompteDebite) this.props.change('refClient', currentCompteDebite.client.referenceClient);

    }

    onSelectDeviseChange = (e)=>{
        console.log(e.target.value)
    }
    onSelectDateExecution  = (e)=> {
        this.props.selectDateExecution(moment(e).format('YYYY-MM-DD'));
    }
    componentDidMount() {
        this.props.setActiveStep(0);
        this.fetchComptes();
        this.fetchRates();

    }
    submit = (e) => {
        e.preventDefault();
        const data = this.props.createVirement.values;
        this.props.setInitialFormValues(data);
        this.handleNext();
        this.createVirement({...data, date:this.props.date, etat: ENREGISTRÉ, id: this.props.idVirement})
    }

    handleNext = () => {
        this.props.setActiveStep(this.props.activeStep + 1);
        this.props.history.push('/virements/signature');
    };

    render() {
        const {submitting, invalid  } = this.props;
        const spinner = <LoadingSpinner></LoadingSpinner>;
        const form = <form onSubmit={ this.submit }>
            <br/><Row>
                <Col><h4>Créer un Virement</h4><hr/></Col>
                <Col sm="2"><Button className="btnEnvoyer" size="sm" as={Link} to="/virements/chercherVirement" >Liste des virements</Button></Col>
            </Row>
            <Row>
                <Col>
                    <h6>Compte à débiter</h6><hr/>
                    <Field name="compteDebite" component={renderSelectField} onChange={this.onSelectCompteDebiter.bind(this)}>
                        <option value="">Veuillez choisir le compte à débiter </option>
                        {this.props.comptesDebite.map(compte =>
                            <option key={compte.numeroCompte} value={compte.numeroCompte}>{compte.iban}</option>)}
                    </Field>
                </Col>
                <Col>
                    <h6>Compte à créditer</h6><hr/>
                    <Field name="compteCredite"  component={renderSelectField} onChange={this.onSelectCompteCrediter.bind(this)}>
                        <option value="">Veuillez choisir le compte à créditer </option>
                        {this.props.comptesCredite.map(compte =>
                            <option key={compte.numeroCompte} value={compte.numeroCompte}>{compte.iban}</option>)}
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
                    <Field component={renderDatePicker} name="dateExecution" placeholder="Date d'execution" onChange={this.onSelectDateExecution}/>
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
                </Row><br/>*/}
            <Row>
                <Col></Col><Col></Col>
                <Col sm={2}><Button disabled={submitting || invalid} className="btnEnvoyer" size="sm" type="submit" variant="primary">Suivant</Button></Col>
                <Col sm={2}><Button size="sm" variant="primary" onClick={this.onHandleTest}>test</Button></Col>
            </Row><br/>
        </form>
        if (this.props.isFetching) return <div>{spinner}</div>
        else return <div>
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


export default CreateVirement
