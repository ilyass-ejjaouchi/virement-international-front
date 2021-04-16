import React, {Component} from 'react';
import {connect} from "react-redux";
import {Field, reduxForm} from "redux-form";
import {validate} from "./ValidateFindVirement";
import {Button, Col, Form, Row} from "react-bootstrap";
import {renderDatePicker, renderField, renderSelectField} from "../../../redux-form-const/redux_form_cont";
import './FindVirementForm.css'
import chercher from "../../../media/chercher.png";
import reinitialiser from "../../../media/reinitialiser.png";

function mapDispatchToProps(dispatch) {
    return {}};
const mapStateToProps = state => {
    return {};
};

class FindVirementForm extends Component {

    render() {
        const form =  <Form onSubmit={this.submit} className="findVirement">
            <br/>
            <Row>
                <Col xs={6}>
                    <Field name="compte" component={renderSelectField}>
                        <option value="">Tous les comptes</option>
                    </Field>
                </Col>
                <Col xs={3}><Field component={renderDatePicker} placeholder="Date de debut" name="dateDebut"/></Col>
                <Col xs={3}><Field component={renderDatePicker} placeholder="Date de fin" name="dateFin"/></Col>
            </Row>
            <br/>
            <Row>
                <Col><Field component={renderField} name="reference" label="Réference"/></Col>
                <Col>
                    <Field name="status" component={renderSelectField}>
                        <option value="">Tous status</option>
                    </Field>
                </Col>
                <Col><Field component={renderField} type="number" name="reference" label="Montant Min" /></Col>
                <Col><Field component={renderField} type="number" name="reference" label="Montant Max" /></Col>
            </Row>
            <br/>
            <Row>
                <Col></Col><Col></Col>
                <Col sm={3}>
                    <Button className="btnRenitialiser" variant="danger" size="sm"><img src={reinitialiser} alt="print"/>{' '}Reinitialiser</Button>{'  '}
                    <Button className="btnRechercher" variant="danger" size="sm"><img src={chercher} alt="print"/>{' '}Rechercher</Button>
                </Col>
            </Row>
        </Form>
        return <div>
            {form}
        </div>
    }}

FindVirementForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(FindVirementForm);
FindVirementForm = reduxForm({
    form: 'findVirements',
    validate,
})(FindVirementForm);

export default FindVirementForm;
