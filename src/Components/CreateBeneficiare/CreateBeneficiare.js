import React, {Component} from 'react';
import {Button, Col, Form, Row} from 'react-bootstrap';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


class CreateBeneficiare extends Component {
    render() {
        return<div>
            <Form>
                <h4>Bénéficiaire</h4><hr/>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Label>Nature</Form.Label>
                            <Form.Control as="select">
                                <option name="nature">Virement international</option>
                            </Form.Control>
                        </Col>
                        <Col>
                            <Form.Label>Nature</Form.Label>
                            <Form.Control as="select">
                                <option name="type">Autre</option>
                            </Form.Control>
                        </Col>
                        <Col>
                            <Form.Label>Nature</Form.Label>
                            <Form.Control as="select">
                                <option name="devise">DH</option>
                            </Form.Control>
                        </Col>
                    </Row><br/>
                    <Row>
                        <Col><Form.Control type="text" placeholder="Libelle du compte"/></Col>
                    </Row>
                </Form.Group>
                <h4>Compte</h4><hr/>
                <Row>
                    <Col><Form.Control type="text" placeholder="Code BIC"/></Col>
                    <Col><Form.Control type="text" placeholder="Code IBAN"/></Col>
                </Row><br/>
                <Row><Col><Form.Control name="adresse1" type="text" placeholder="Adresse1"/></Col></Row><br/>
                <Row><Col><Form.Control type="text" placeholder="Adresse2"/></Col></Row><br/>
                <Row><Col><Form.Control type="text" placeholder="Adresse3"/></Col></Row><br/>
            </Form>
            </div>;
    }
}
export default CreateBeneficiare;
