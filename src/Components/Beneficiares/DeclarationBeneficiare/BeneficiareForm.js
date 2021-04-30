import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Button, Col, Form, Row} from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import {connect} from "react-redux";
import {validate} from './validateBeneficiare';
import {renderSelectField,renderField} from "../../../Redux/redux-form-const/redux_form_cont";
import {fetchingData, getRates} from "../../../Redux/Actions/VirementActions";
import {openDialog} from "../../../Redux/Actions/DialogActions";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import {Redirect} from "react-router-dom";

import {
    getBanques,
    getCountries, setCurrentBanque,
    setCurrentDemande,
    setInitialFormValues
} from "../../../Redux/Actions/BeneficiareActions";
import {Link} from "react-router-dom";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import CustomStepper from "../../Stepper/CustomStepper";
import {DANGER, DOMAINE, SUCCESS} from "../../../Redux/Constants/constants";
import {setActiveStep} from "../../../Redux/Actions/StepperActions";
import {ENREGISTRÉ} from "../../../Redux/Constants/EtatVirement";

function mapDispatchToProps(dispatch) {
    return {
        getRates: rates => dispatch(getRates(rates)),
        getBanques: banques => dispatch(getBanques(banques)),
        getCountries: countries => dispatch(getCountries(countries)),
        openDialog: o => dispatch(openDialog(o)),
        fetchingData: fetching => dispatch(fetchingData(fetching)),
        setActiveStep : step => dispatch(setActiveStep(step)),
        setInitialFormValues : data => dispatch(setInitialFormValues(data)),
        setCurrentDemande : id => dispatch(setCurrentDemande(id)),
        setCurrentBanque : banque => dispatch(setCurrentBanque(banque)),
    }};
const mapStateToProps = state => {
    return {
        rates: state.BeneficiareReducer.rates,
        banques: state.BeneficiareReducer.banques,
        countries: state.BeneficiareReducer.countries,
        isFetching: state.VirementReducer.isFetching,
        beneficiareForm: state.form.createBeneficiare,
        initialValues: state.BeneficiareReducer.formValues,
        currentDemande: state.BeneficiareReducer.currentDemande,
        currentBanque: state.BeneficiareReducer.currentBanque,
        isLogged: state.AuthenticationReducer.isLogged,
        token: state.AuthenticationReducer.token,
    };
};

class BeneficiareForm extends Component {

    componentDidMount() {
        if (this.props.isLogged){
            this.getCountries();
            this.getBanques();
            this.fetchRates();
        }
    }

    constructor() {
        super();
        this.state = {startDate: null}
    }
    getCountries(){
        axios.get('https://restcountries.eu/rest/v1/all')
            .then( response => {
               this.props.getCountries(response.data);
            })
            .catch(err => {});
    }
    getBanques(){
        axios.get(DOMAINE+'banques', {headers: { Authorization: this.props.token }})
            .then( response => {
                this.props.getBanques(response.data);}
            )
            .catch(err => {
            });
    }
    fetchRates(){
        axios.get(DOMAINE +'comptes/currencies',{headers: { Authorization: this.props.token }})
            .then( response => {
                this.props.getRates(response.data);
            })
            .catch(err => {});
    }
    onSelectBanque = (e)=>{
        const id = e.target.value
        const banque = this.props.banques.filter( b => b.id === parseInt(id))[0]
        this.props.setCurrentBanque(banque);
        this.props.change('BIC', banque.bic);
    }
    submit = (e) => {
        e.preventDefault();
        const data = this.props.beneficiareForm.values
        console.log(data)
        this.props.setInitialFormValues(data);
        this.createBeneficiare({...data, id: this.props.currentDemande, etat: ENREGISTRÉ});
        this.props.setActiveStep(1);
        this.props.history.push('/beneficiares/signature');
    }
    handleNext = () => {
        this.props.setActiveStep(1);
        this.props.history.push('/beneficiares/signature');
    };
    handlePrevious= () => {
        this.props.setActiveStep(0);
        this.props.history.push('/beneficiares');
    };
    createBeneficiare(data){
        this.props.fetchingData(true);
        const that = this
        axios.post(DOMAINE+'beneficiares',null, { params: data, headers: {Authorization: this.props.token}})
            .then(function (res) {
                that.props.setCurrentDemande(parseInt(res.data.id));
                that.props.fetchingData(false);
                that.handleNext();
                /*this.props.reset();
                this.props.openDialog({body: "votre demande a été enregistrée", show: true, title: "Succès", style:SUCCESS})*/
            })
            .catch(function (err) {
                that.handlePrevious();
                const errorRes = err.response.data;
                that.props.fetchingData(false);
                that.props.openDialog({body: errorRes.message, show: true, title: "Erreur!!", style:DANGER})
            });
    }
    render() {
        if (!this.props.isLogged) return <Redirect to="/" />
        const {pristine, submitting,valid } = this.props;
        const spinner = <LoadingSpinner></LoadingSpinner>;
        const form =  <Form onSubmit={this.submit}>
            <br/><Row>
            <Col><h4>Déclarer un Bénéficiaire</h4><hr/></Col>
            <Col><Button className="float-right btnEnvoyer" size="sm" as={Link} to="/chercherBeneficiares" ><FormatListBulletedIcon style={{ fontSize: 20 }}/>{' '}LISTE DES BÉNÉFICIAIRES</Button></Col>
            </Row>
            <Form.Group>
                <Row>
                    <Col>
                        <Field name="nature"  component={renderSelectField}>
                            <option value="">Veuillez choisir la nature</option>
                            <option value="Virement international">Virement international</option>
                        </Field>
                    </Col>
                    <Col>
                        <Field name="type"  component={renderSelectField}>
                            <option value="">Veuillez choisir le type</option>
                            <option>Bénéficiaire</option>
                            <option>Autre</option>
                            <option>Fournisseur</option>
                            <option>Salarié</option>
                        </Field>
                    </Col>
                    <Col>
                        <Field component={renderSelectField} name="devise"
                               className="form-control form-control-sm" onChange={this.onSelectDeviseChange}>
                            <option value="">Veuillez choisir la devise </option>
                            {this.props.rates.map((rate,index) => <option key={index} value={rate}> {rate}</option>)}
                        </Field>
                    </Col>
                </Row><br/>
                <Row>
                    <Col>
                        <Field component={renderField} type="text" name="libelle"
                                label="Libelle du compte exemple virement bancaire pour Ilyass EJJAOUCHI" className="form-control form-control-sm"/>
                    </Col>
                </Row><br/>
                <Row>
                    <Col><Field component={renderField} type="text" name="adresse1" label="adresse 1"/></Col>
                    <Col><Field component={renderField} type="text" name="adresse2" label="adresse 2"/></Col>
                    <Col><Field component={renderField} type="text" name="adresse3" label="adresse 3"/></Col>
                </Row><br/>
                <Row>
                    <Col>
                        <Field name="pays" component={renderSelectField}>
                            <option value="">Veuillez choisir le pays</option>
                            {this.props.countries.map((country,index) => <option key={index} value={country.name}> {country.name}</option>)}
                        </Field>
                    </Col>
                </Row>
               {/* <Row>
                    <Col><Field component={renderField} type="text" name="routing" label="Routing ou Fedwire number" maxlenght={9}/></Col>
                    <Col></Col>
                    <Col></Col>
                </Row>*/}
            </Form.Group>
            <h4>Compte</h4><hr/>
            <Row>
                <Col>
                    <Field name="banque" component={renderSelectField} onChange={this.onSelectBanque}>
                        <option value="">Veuillez la banque</option>
                        {this.props.banques.map((banque,index) => <option key={index} value={banque.id}> {banque.nom}</option>)}
                    </Field>
                </Col>
                <Col><Field component={renderField} type="text" name="BIC" label="Code BIC" disabled={true}/></Col>
                <Col><Field component={renderField} type="text" name="numeroDeCompte" label="Code IBAN"/></Col>
            </Row><br/>
            <div className="form-group">
                 <Button disabled={submitting||!valid} className="btnEnvoyer float-right"
                         size="sm" type="submit" variant="primary">SUIVANT{' '}<NavigateNextIcon style={{ fontSize: 20 }}/></Button>
            </div>
        </Form>
        if (this.props.isFetching) return <div>{spinner}</div>
        else return <div>
            <CustomStepper></CustomStepper>
            {form} <br/>
        </div>
    }}

BeneficiareForm = reduxForm({
    form: 'createBeneficiare',
    validate,
    initialValues: {}
})(BeneficiareForm);
BeneficiareForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(BeneficiareForm);

export default BeneficiareForm;
