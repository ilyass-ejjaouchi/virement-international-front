import React, {Component} from 'react';
import {connect} from "react-redux";
import {Field, Form, reduxForm} from "redux-form";
import {Button, Col, Row} from "react-bootstrap";
import {renderField} from "../../Redux/redux-form-const/redux_form_cont";
import './Login.css';
import jwt from 'jwt-decode';
import userIcon from "../../media/user3.png";
import axios from "axios";
import {DANGER, DOMAINE} from "../../Redux/Constants/constants";
import {setIdentifiant, setIsFetching, setIsLogged, setToken} from "../../Redux/Actions/AuthenticationActions";
import {openDialog} from "../../Redux/Actions/DialogActions";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

function mapDispatchToProps(dispatch) {
    return {
        setToken: token => dispatch(setToken(token)),
        openDialog: token => dispatch(openDialog(token)),
        setIsLogged: token => dispatch(setIsLogged(token)),
        setIsFetching: cd => dispatch(setIsFetching(cd)),
        setIdentifiant: identifiant => dispatch(setIdentifiant(identifiant)),
    }};
const mapStateToProps = state => {
    return {
        isFetching: state.AuthenticationReducer.isFetching,
    };
};

class Login extends Component {
    login (user){
        const that = this;
        this.props.setIsFetching(true);
        axios.post(DOMAINE + 'login',user)
            .then(res => {
                this.props.setIsFetching(false);
                const token = res.headers.authorization;
                this.props.setToken(res.headers.authorization);
                this.props.setIdentifiant(jwt(token).sub);
                this.props.setIsLogged(true);
                this.props.history.push('/virements')
            })
            .catch(function (error) {
                that.props.setIsFetching(false);
                that.props.openDialog({body: error.message, show: true, title: "Erreur!!", style:DANGER})
            });
    }
    submit =(user)=>{
        this.login(user);
    }
    render() {
        const { valid, handleSubmit, pristine, reset, submitting } = this.props
        if (this.props.isFetching) return <LoadingSpinner/>
        return <div>
            <Form className="loginForm" onSubmit={handleSubmit(this.submit)}>
                <Row className="justify-content-md-center">
                    <Col xs={1}><img className="user" src={userIcon} alt="user"/></Col>
                </Row>
                    <Row><Col></Col><Col><h2 className="text-center">S'authentifier</h2></Col><Col></Col></Row>
                    <Row className="justify-content-md-center">
                        <Col xs={6}>
                            <Row><Col><Field component={renderField} name="identifiant" label="Identifiant"/></Col></Row><br/>
                            <Row><Col><Field component={renderField} type="password" name="password" label="Mot de passe"/></Col></Row><br/>
                            <Row><Col><Button className="btnLogin" size="sm" type="submit" variant="warning">s'authentifier</Button></Col></Row>
                        </Col>
                    </Row>

            </Form>
        </div>
    }
}

Login = reduxForm({
    form: 'loginForm',
    initialValues: {}
})(Login);
Login = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

export default Login;
