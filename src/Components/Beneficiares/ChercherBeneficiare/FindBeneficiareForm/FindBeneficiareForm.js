import React, {Component} from 'react';
import {connect} from "react-redux";
import {setDemandesBeneficiares, setInitialFormValues} from "../../../../Redux/Actions/BeneficiareActions";
import {Button, Col, Form, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import {reduxForm} from "redux-form";

function mapDispatchToProps(dispatch) {
    return {
        setDemandesBeneficiares: id => dispatch(setDemandesBeneficiares(id))
    }};
const mapStateToProps = state => {
    return {
        formValues : state.form.findDemandesBeneficiares.values
    };
};

class FindBeneficiareForm extends Component {

    render() {
        return <div>
            <Row>
                <Col></Col><Col></Col>
                <Col>
                    <Button className="btnRechercher float-right" variant="warning" size="sm"
                            as={Link} to="/beneficiares" ><AddCircleIcon/>{' '}NOUVELLE DEMANDE</Button>
                </Col>
            </Row><br/>
        </div>
        }
}

FindBeneficiareForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(FindBeneficiareForm);
FindBeneficiareForm = reduxForm({
    form: 'findDemandesBeneficiares',
    initialValues:{}
})(FindBeneficiareForm);

export default FindBeneficiareForm;
