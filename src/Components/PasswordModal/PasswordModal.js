import React, {Component} from 'react';
import {connect} from "react-redux";
import './PasswordModal.css';
import {Alert, Button, Modal, Row} from "react-bootstrap";
import CachedIcon from '@material-ui/icons/Cached';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {openPasswordModel} from "../../Redux/Actions/PasswordModelActions";

function mapDispatchToProps(dispatch) {
    return {
        openPasswordModel: cd => dispatch(openPasswordModel(cd))
    }};
const mapStateToProps = state => {
    return {
        show: state.PasswordModelReducer.show,
        errorMsg: state.PasswordModelReducer.errorMsg,
    };
};

class PasswordModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyPadValues: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            pass: '',
            title : 'SAISIR LE CODE SECRET'
        };
    }
    handleClose = () => {this.props.openPasswordModel(false)};
    onHandleClick = (key) => {
        this.setState({pass: this.state.pass + '' + key})
    };
    handleDelete = () =>{
        if (this.state.pass.length) {
            this.setState({pass: this.state.pass.slice(0, this.state.pass.length - 1)});
        }
    }

    sign =() =>{
        let password = this.state.pass;
        this.props.sign(password);
        this.setState({pass: ''})
    }
    render() {
        const buttons = this.state.keyPadValues.map((key) =>

            <span className="buttonCode" key={key} onClick={this.onHandleClick.bind(this, key)} >{key}</span>
        );
        if (this.props.errorMsg)
            alert = <Alert variant="danger">{this.props.errorMsg}</Alert>

        return <div>
            <Modal id="passwordModel" onHide={this.handleClose} show={this.props.show}>
                <Modal.Header className="header" closeButton>
                    <Modal.Title className="title">{this.state.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {alert}
                    <Row>
                        {buttons}
                        <span className="buttonCodeIcon" onClick={this.handleDelete}><ArrowBackIcon style={{ fontSize: 35 }}/></span>
                        <span className="buttonCodeIcon" onClick={() => this.setState({pass: ''})}><CachedIcon style={{ fontSize: 35 }}/></span>
                    </Row>
                    <Row>
                        <input
                            className="form-control form-control-sm"
                            style={{textAlign: 'center',  width: '100%',}} type="password"
                            value={this.state.pass}
                        />
                    </Row>
                    <Row>
                        <Button className="btnValider"  variant="secondary" size="sm" onClick={this.sign}>VALIDER</Button>
                    </Row>
                </Modal.Body>
            </Modal>
        </div>
    }}

PasswordModal = connect(
    mapStateToProps,
    mapDispatchToProps
)(PasswordModal);

export default PasswordModal;
