import React, {Component} from 'react';
import {change, Field, reduxForm, reset} from 'redux-form';
import {Button, Col, Form, Row} from "react-bootstrap";
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import {connect} from "react-redux";
import {validate} from './validateBeneficiare';
import {renderSelectField,renderField} from "../../redux-form-const";
import {fetchingData, getRates} from "../../Actions/VirementActions";
import {openDialog} from "../../Actions/DialogActions";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import {getBanques, getCountries} from "../../Actions/BeneficiareActions";
import moment from "moment";

function mapDispatchToProps(dispatch) {
    return {
        getRates: rates => dispatch(getRates(rates)),
        getBanques: banques => dispatch(getBanques(banques)),
        getCountries: countries => dispatch(getCountries(countries)),
        openDialog: o => dispatch(openDialog(o)),
        fetchingData: fetching => dispatch(fetchingData(fetching))

    }};
const mapStateToProps = state => {
    return {
        rates: state.BeneficiareReducer.rates,
        banques: state.BeneficiareReducer.banques,
        countries: state.BeneficiareReducer.countries,
        isFetching: state.VirementReducer.isFetching,
        createBeneficiare: state.form.createBeneficiare
    };
};

class BeneficiareForm extends Component {
    componentDidMount() {
        this.getCountries();
        this.getBanques();
        this.fetchRates();
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
            .catch(error => {});
    }
    getBanques(){
        axios.get('http://localhost:8081/banques')
            .then( response => {
                this.props.getBanques(response.data);}
            )
            .catch(error => {});
    }
    fetchRates(){
        axios.get('http://localhost:8081/comptes/currencies')
            .then( response => {
                this.props.getRates(response.data);
            })
            .catch(error => {});
    }
    fetchRates(){
        axios.get('http://localhost:8081/comptes/currencies')
            .then( response => {
                this.props.getRates(response.data);
            })
            .catch(error => {});
    }
    onSelectBanque = (e)=>{
        const bic = e.target.value
        this.props.change('BIC', bic);
    }
    submit = (e) => {
        e.preventDefault();
        this.createBeneficiare(this.props.createBeneficiare.values);
    }
    createBeneficiare(data){
        this.props.fetchingData(true);
        let that = this;
        axios.post('http://localhost:8081/beneficiares',null, { params: data})
            .then(function (response) {
                that.props.fetchingData(false)
                that.props.reset();
                that.props.openDialog({body: "les données ont bien été enregistrées", show: true, title: "Succès", style:"success"})
            })
            .catch(function (error) {
                that.props.openDialog({body: error.message, show: true, title: "Erreur!!", style:"danger"})
            });
    }
    render() {
        const { handleSubmit, pristine, submitting } = this.props;
        const spinner = <LoadingSpinner></LoadingSpinner>;
        const form =  <Form onSubmit={this.submit}>
            <br/>
            <Row>
                <Col xs={9}><h4>Bénéficiaire</h4> </Col>
                <Col xs={3}>
                    <Button size="sm" variant="secondary" className="btnEnvoyer">liste des bénéficiaires</Button>
                </Col>
            </Row>
            <hr/>
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
                </Row>
            </Form.Group>
            <h4>Compte</h4><hr/>
            <Row>
                <Col>
                    <Field name="banque" component={renderSelectField} onChange={this.onSelectBanque}>
                        <option value="">Veuillez la banque</option>
                        {this.props.banques.map((banque,index) => <option key={index} value={banque.bic}> {banque.nom}</option>)}
                    </Field>
                </Col>
                <Col><Field component={renderField} type="text" name="BIC" label="Code BIC" disabled={true}/></Col>
                <Col><Field component={renderField} type="text" name="IBAN" label="Code IBAN"/></Col>
            </Row><br/>
            <Row>
                <Col>
                    <Field name="pays" component={renderSelectField}>
                        <option value="">Veuillez choisir le pays</option>
                        {this.props.countries.map((country,index) => <option key={index} value={country.name}> {country.name}</option>)}
                    </Field>
                </Col>
            </Row><br/>
            <Row>
                <Col><Field component={renderField} type="text" name="adresse1" label="adresse 1"/></Col>
                <Col><Field component={renderField} type="text" name="adresse2" label="adresse 2"/></Col>
                <Col><Field component={renderField} type="text" name="adresse3" label="adresse 3"/></Col>
            </Row><br/>
            <Row>
                <Col><Field component={renderField} type="text" name="routing" label="Routing ou Fedwire number" maxlenght={9}/></Col>
                <Col></Col>
                <Col></Col>
            </Row> <br/>
            <div className="form-group">
                 <Button disabled={pristine||submitting||this.props.createBeneficiare.syncErrors} className="btnEnvoyer" size="sm" type="submit" variant="primary">Envoyer</Button>
            </div>
        </Form>
        if (this.props.isFetching) return <div>{spinner}</div>
        else return <div>
            {form} <br/>
        </div>
    }}

BeneficiareForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(BeneficiareForm);
BeneficiareForm = reduxForm({
    form: 'createBeneficiare',
    validate,
})(BeneficiareForm);

export default BeneficiareForm;
