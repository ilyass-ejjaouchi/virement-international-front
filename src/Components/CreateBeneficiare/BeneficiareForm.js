import React, {Component} from 'react';
import {Field, reduxForm, reset} from 'redux-form';
import {Button, Col, Row} from "react-bootstrap";
import axios from "axios";
import {connect} from "react-redux";
import {validate} from './ValidateForm';
import {renderSelectField,renderCheckboxField,renderField} from "../../redux-form-const";
import {getRates} from "../../Actions/VirementActions";
import {openDialog} from "../../Actions/DialogActions";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

function mapDispatchToProps(dispatch) {
    return {
        getRates: rates => dispatch(getRates(rates)),
        openDialog: o => dispatch(openDialog(o)),
    }};
const mapStateToProps = state => {
    return {
        rates: state.VirementReducer.rates,
        isFetching: state.VirementReducer.isFetching};
};

class BeneficiareForm extends Component {

    constructor() {
        super();
    }
    fetchRates(){
        axios.get('http://localhost:8081/comptes/currencies')
            .then( response => {
                this.props.getRates(response.data);
            })
            .catch(error => {});
    }


    createVirement(data){
        this.props.fetchingData(true);
        let that = this;
        axios.post('http://localhost:8081/virements',null, { params: data})
            .then(function (response) {
                that.props.fetchingData(false)
                that.props.reset();
                this.props.openDialog({body: "les données ont bien été enregistrées", show: true, title: "Succès", style:"success"})
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    submit = (e) => {
        e.preventDefault();
        this.props.openDialog({show:true,title:"Success",body:"les données ont bien été enregistrées"});
        this.createVirement(this.props.createVirement.values)
    }
    render() {
        const { handleSubmit, pristine, submitting } = this.props;
        const spinner = <LoadingSpinner></LoadingSpinner>;
        const form = <form onSubmit={ this.submit }>
            <h4>Créer un Virement</h4><hr/>
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
                    <Field component={renderField} type="date" name="date" placeholder="Date d'exécution"/>
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
                <Col><Field component={renderField} type="number" name="contreValeur" value={this.props.contreValeur}
                            label="Contre Valeur" className="form-control form-control-sm"/></Col>
            </Row><br/>
            <Row>
                <Col>
                    <Field component={renderField} name="motif"
                           label="Motif" className="form-control form-control-sm"/>
                </Col>
                <Col>
                    <Field component={renderField} name="refClient"
                           label="Réference Client" className="form-control form-control-sm"/>
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
            <div className="form-group">
                <Button disabled={pristine||submitting||this.props.createVirement.syncErrors} className="btnEnvoyer" size="sm" type="submit" variant="primary">Envoyer</Button>
            </div>
        </form>
        if (this.props.isFetching) return <div>{spinner}</div>
        else return <div>
            {form}
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

export default BeneficiareForm
