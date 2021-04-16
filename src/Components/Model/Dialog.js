import React, {Component} from 'react';
import './Dialog.css';
import {Button, Modal} from "react-bootstrap";
import {openDialog} from '../../Actions/DialogActions'
import {connect} from "react-redux";
import {DATA_NOT_FOUND, REJET_VIREMENT} from "../../Constants/constants";

function mapDispatchToProps(dispatch) {
    return {openDialog: o => dispatch(openDialog(o))}};

const mapStateToProps = state => {
    return { show: state.dialogReducer.show,
             title: state.dialogReducer.title,
             body: state.dialogReducer.body,
             style: state.dialogReducer.style,
             type: state.dialogReducer.type
    };
};

class ConnectedModel extends Component {

    handleClose = () => {this.props.openDialog({show:false})};
    onContinue = () => {
        switch (this.props.type) {
            case REJET_VIREMENT:
                console.log("on rejet le virement ici")
                this.props.openDialog({show:false})
            case DATA_NOT_FOUND:
                console.log("on n'a pas trouver les donees desole")
                this.props.openDialog({show:false})
        }
    };
    handleShow = () => {this.props.openDialog({show:true})};

    render() {
        return <div>
            <Modal show={this.props.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{this.props.body}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" size="sm" className="fermer" onClick={this.handleClose}>
                        Fermer
                    </Button>
                    <Button variant="secondary" size="sm" className={this.props.style === "danger"?"continueDanger":"continueSuccess"} onClick={this.onContinue}>
                        Continue
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    }}
const CustomDialog = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedModel);
export default CustomDialog;
