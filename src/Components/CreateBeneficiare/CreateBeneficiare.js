import React, {Component} from 'react';
import {Button, Col, Container, Form, Row, Spinner} from 'react-bootstrap';
import IBAN from 'iban';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import './CreateBeneficiare.css';

import axios from "axios";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
const initialState = {
    devises: [], banques:[],Pays:[], pays:'', nature:'Virement international', type:'', devise:'', libelle:'',
    banque:'', BIC: '', IBAN:'', adresse1:'', adresse2:'', adresse3:'',routing:'',
    isFormValid: false,
    errorNature:'', errorLibelle: '', errorBanque: '', errorRouting:'', errorPays:'', errorType:'', errorDevise:'',
    errorIBAN:'', errorAdresse1:'', errorAdresse2:'', errorAdresse3:'', isLoading:false
}
class CreateBeneficiare extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {
        this.getDevises();
        this.getBanques();
        this.getCountries();
    }

    getDevises(){
        axios.get('https://api.exchangeratesapi.io/latest')
            .then( response => {
                this.setState({devises: [response.data.base, ...Object.keys(response.data.rates)]})
            })
            .catch(error => {});
    }
    getCountries(){
        axios.get('https://restcountries.eu/rest/v1/all')
            .then( response => {
                this.setState({Pays: response.data})
            })
            .catch(error => {});
    }
    postData(){
        this.setState({isLoading:true});
        const data = {
            nature: this.state.nature,
            type: this.state.type,
            libelle: this.state.libelle,
            devise: this.state.devise,
            iban: this.state.iban,
            pays: this.state.pays,
            adresse1: this.state.adresse1,
            adresse2: this.state.adresse2,
            adresse3: this.state.adresse3,
            routing: this.state.routing
        }
        console.log(data);
        axios.post('http://localhost:8080/beneficiares', data )
            .then(function (response) {
                this.setState({isLoading:false});
            })
            .catch(function (error) {
                console.log(error.message);
            });

    }
    getBanques(){
        axios.get('http://localhost:8080/banques')
            .then( response => {
                this.setState({banques: response.data});}
            )
            .catch(error => {});
    }

    validateForm(){
        if (this.state.errorNature|| this.state.errorLibelle || this.state.errorBanque
            || this.state.errorRouting|| this.state.errorPays || this.state.errorType
            || this.state.errorDevise|| this.state.errorIBAN|| this.state.errorAdresse1
            || this.state.errorAdresse2||this.state.errorAdresse3){
            this.setState({isFormValid:false})
        }else{
            this.setState({isFormValid:true})
        }
    }

    handleOnChange = (e) => {
       const {name, value} = e.target;
        this.setState({
            [name]: value
        }, () => {
           if (name === "routing")
           {    if (this.state.routing ===""|| value.length!==9){this.setState({errorRouting:"vous deverz saisir un valid routing ou fedwire number"},()=>{ this.validateForm();})}
                else{ this.setState({errorRouting:""},()=>{ this.validateForm();})}
           }if(name === "libelle"){
                if (this.state.libelle ===""){this.setState({errorLibelle:"vous deverz saisir le libelle"},()=>{ this.validateForm();})}
                else{ this.setState({errorLibelle:""},()=>{ this.validateForm();})}
            }
           if(name === "nature"){
               if (this.state.nature ===""){this.setState({errorNature:"vous deverz choisir la nature"},()=>{ this.validateForm();})}
               else{ this.setState({errorNature:""},()=>{ this.validateForm();})}
           }
           if(name === "IBAN"){
               if (!IBAN.isValid(value)){this.setState({errorIBAN:"vous deverz saisir un IBAN valid"},()=>{ this.validateForm();})}
               else{ this.setState({errorIBAN:""},()=>{ this.validateForm();})}
           }
        });
        if (name === "banque"){
            const index = e.target.selectedIndex;
                   if (index!== 0){
                        this.setState({banque:e.target.value,
                            BIC: this.state.banques[index-1].bic},()=>{ this.validateForm();})
                    }else{
                        this.setState({BIC:''},()=>{ this.validateForm();})
                    }
        }
    }

    submitform = (e) => {
        e.preventDefault();
        this.postData();
    }
    render() {
        const form =
            <Form onSubmit={this.submitform}>
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
                        <Form.Label>Nature</Form.Label>
                        <Form.Control size="sm" as="select" name="nature" onChange={this.handleOnChange}
                                      className={this.state.errorNature=== ""?"input":"error"}>
                            <option value="">choisir la nature</option>
                            <option value="Virement international">Virement international</option>
                        </Form.Control>
                        <span className="errormsg">{this.state.errorNature}</span>
                        <br/>
                    </Col>
                    <Col>
                        <Form.Label>Type</Form.Label>
                        <Form.Control size="sm"  as="select" name="type" onChange={this.handleOnChange} className="input">
                            <option value="">choisir le type</option>
                            <option value="Autre">Autre</option>
                            <option value="Autre2">Autre2</option>
                        </Form.Control>
                    </Col>
                    <Col>
                        <Form.Label>Devise</Form.Label>
                        <Form.Control size="sm"  name="devise" as="select" onChange={this.handleOnChange} className="input">
                            <option value="">choisir la devise</option>
                            {this.state.devises.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </Form.Control>
                    </Col>
                </Row>
                <Row>
                    <Col><Form.Control  size="sm" className={this.state.errorLibelle=== ""?"input":"error"} type="text" name="libelle"
                                        onChange={this.handleOnChange}  placeholder="Libelle du compte exemple virement bancaire pour Ilyass EJJAOUCHI"/>
                        <span className="errormsg">{this.state.errorLibelle}</span>
                    </Col>
                </Row>
            </Form.Group>
            <h4>Compte</h4><hr/>
            <Row>
                <Col>
                    <Form.Control size="sm"  className="input" name="banque" as="select" onChange={this.handleOnChange}>
                        <option value=""> choisir une banque</option>
                        {this.state.banques.map(banque => (
                            <option bic={banque.bic} key={banque.id} value={banque.nom}>{banque.nom}</option>
                        ))}
                    </Form.Control>
                </Col>
                <Col><Form.Control size="sm"  className="input" name="BIC" type="text" readOnly value={this.state.BIC} placeholder="Code BIC"/></Col>
                <Col>
                    <Form.Control size="sm"  className={this.state.errorIBAN === ""?"input":"error"} name="IBAN"
                                  type="text" onChange={this.handleOnChange} placeholder="Code IBAN"/>
                    <span className="errormsg">{this.state.errorIBAN}</span>
                </Col>
            </Row><br/>
            <Row>
                <Col>
                    <Form.Control size="sm"  className="input" name="pays" as="select" onChange={this.handleOnChange}>
                        <option value=""> choisir le pays</option>
                        {this.state.Pays.map((country,index) => (
                            <option key={index} value={country.name}>{country.name}</option>
                        ))}
                    </Form.Control>
                </Col>
            </Row><br/>
            <Row>
                <Col><Form.Control size="sm"  className="input" name="adresse1" onChange={this.handleOnChange} type="text"  placeholder="Adresse1"/></Col>
                <Col><Form.Control size="sm"  className="input" name="adresse2" onChange={this.handleOnChange} type="text" placeholder="Adresse2"/></Col>
                <Col><Form.Control size="sm"  className="input" name="adresse3" onChange={this.handleOnChange} type="text" placeholder="Adresse3"/></Col>
            </Row><br/>
            <Row>
                <Col>
                    <Form.Control size="sm"  className={this.state.errorRouting === ""?"input":"error"} name="routing"
                                  onChange={this.handleOnChange} maxLength={9}  type="text"  placeholder="Routing ou Fedwire number"/>
                </Col>
                <Col><span className="errormsg">{this.state.errorRouting}</span></Col>
                <Col></Col>
            </Row> <br/>
            <Button disabled={!this.state.isFormValid} size="sm" type="submit" className="btnEnvoyer" variant="secondary">Envoyer</Button><br/><br/><br/>
        </Form>
        if (this.state.isLoading) return <div className="spinner"><LoadingSpinner></LoadingSpinner></div>
        else return <div>
            {form}
        </div>

    }
}
export default CreateBeneficiare;
