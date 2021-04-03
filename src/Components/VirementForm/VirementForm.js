import React, {Component} from 'react';
import {Button, Col, Form, Row} from 'react-bootstrap';
import {Editor} from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


class VirementForm extends Component {
    render() {
        return <div>
            <Form>
                <Form.Group controlId="exampleForm.SelectCustom"><br/>
                    <h4>Virements</h4><hr/>
                    <Row>
                        <Col>
                            <h6>Compte à débiter</h6><hr/>
                            <Form.Control size="sm" as="select">
                                <option>Veuillez choisir le compte à débiter </option>
                            </Form.Control>
                        </Col>
                        <Col>
                            <h6>Compte à créditer</h6><hr/>
                            <Form.Control size="sm" as="select">
                                <option>Veuillez choisir le compte à créditer </option>
                            </Form.Control>
                        </Col>
                    </Row><br/>
                    <h6>Virement</h6> <hr/>
                    <Row>
                        <Col>
                            <Form.Control size="sm" as="select">
                                <option>Veuillez choisir le type de virement </option>
                                <option>Virement commercial</option>
                                <option>virement financier </option>
                            </Form.Control>
                        </Col>
                    </Row><br/>
                    <Row>
                        <Col>
                            <Form.Control size="sm" type="text" name="date"
                                          onFocus={ (e)=> {e.currentTarget.type = "date";}}
                                          onBlur={ (e)=> {e.currentTarget.type = "text";}}
                                          placeholder="Date d'exécution"/>
                        </Col>
                        <Col>
                            <Form.Control size="sm"  as="select">
                                <option>Veuillez choisir la devise </option>
                            </Form.Control>
                        </Col>
                        <Col><Form.Control size="sm" type="number" placeholder="Montant"/></Col>
                        <Col><Form.Control size="sm"  type="number" placeholder="Contre Valeur"/></Col>
                    </Row><br/>
                    <Row>
                        <Col>
                            <Form.Control size="sm" type="text" placeholder="Motif"/>
                        </Col>
                        <Col>
                            <Form.Control size="sm" type="text" placeholder="Réference Client"/>
                        </Col>
                    </Row><br/>
                    <h6>Instruction du client</h6><hr/>
                    <Row>
                        <Editor
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                        />
                    </Row><br/>
                    <h6>change/Justificatif</h6><hr/>
                    <Row>
                        <Col sm={4}><h7>Mode d'imputation des frais :</h7></Col>
                        <Col sm={2}><Form.Check size="sm" type="radio" label="SHA"/></Col>
                        <Col sm={2}><Form.Check type="radio" label="SHA"/></Col>
                        <Col sm={2}><Form.Check type="radio" label="SHA"/></Col>
                    </Row><br/>
                    <Row>
                        <Col sm={4}><h7>Retenue :</h7></Col>
                        <Col sm={2}><Form.Check type="radio" label="Payé"/></Col>
                        <Col sm={2}><Form.Check type="radio" label="Donneur"/></Col>
                        <Col sm={2}><Form.Check type="radio" label="Bénéficiaire"/></Col>
                    </Row><br/>
                    <Row>
                        <Col sm={4}><h7>Justificatif :</h7></Col>
                        <Col sm={2}><Form.Check type="radio" label="Non"/></Col>
                        <Col sm={2}><Form.Check type="radio" label="Oui"/></Col>
                    </Row><br/>
                    <h6>Transfert Scolarité / Santé</h6><hr/>
                    <Row>
                        <Col><Form.Control  type="text" placeholder="Nom Complet"/></Col>
                        <Col><Form.Control  type="text" placeholder="Numéro de passport"/></Col>
                        <Col><Form.Control  type="text" placeholder="Numéro de CIN"/></Col>
                    </Row><br/>
                    <Row>
                        <Col><Form.Control  type="text" placeholder="Bénéficiaire"/></Col>
                        <Col><Form.Control  type="text" placeholder="Nom de médecin"/></Col>
                        <Col><Form.Control  type="text" placeholder="Numéro insc du médecin"/></Col>
                    </Row><br/>
                    <Row>
                        <Col><Form.Control  type="text" placeholder="Organisme hospitalier "/></Col>
                        <Col><Form.Control  type="text" placeholder="Période de couverture"/></Col>
                    </Row><br/>
                    <Button className="btnEnvoyer" size="sm" type="submit" variant="primary">Envoyer</Button>
                </Form.Group>
            </Form>
        </div>
        ;
    }
}
export default VirementForm;
