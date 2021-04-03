import React, {Component} from 'react';
import './Model.css';
import {Button, Modal} from "react-bootstrap";
import {openDialog} from '../../Actions/DialogActions'
import {connect} from "react-redux";

function mapDispatchToProps(dispatch) {
    return {openDialog: show => dispatch(openDialog(show))}
    };
const mapStateToProps = state => {
    return { show: state.show};
};

class ConnectedModel extends Component {


    handleClose = () => {this.props.openDialog(false)};
    handleShow = () => {this.props.openDialog(true)};

    render() {
        return <div>
            <Button variant="primary" onClick={this.handleShow}>
                Launch demo modal
            </Button>

            <Modal show={this.props.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{this.props.body}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" size="sm" className="fermer" onClick={this.handleClose}>
                        Fermer
                    </Button>
                    <Button variant="secondary" size="sm" className="continue" onClick={this.handleClose}>
                        Continue
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    }}
const Model = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedModel);
export default Model;
