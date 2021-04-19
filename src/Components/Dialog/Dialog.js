import React, {Component} from 'react';
import './Dialog.css';
import {Button, Modal} from "react-bootstrap";
import {openDialog} from '../../Redux/Actions/DialogActions'
import {connect} from "react-redux";
import { withRouter } from 'react-router-dom';
import {CONFIRMER_VIREMENT, DATA_NOT_FOUND, DELETE_VIREMENT} from "../../Redux/Constants/constants";
import axios from "axios";
import {setActiveStep} from "../../Redux/Actions/StepperActions";
import {setInitialFormValues, setViremets} from "../../Redux/Actions/VirementActions";

function mapDispatchToProps(dispatch) {
    return {
            openDialog: o => dispatch(openDialog(o)),
            setActiveStep: step => dispatch(setActiveStep(step)),
            resetVirementForm:  value => dispatch(setInitialFormValues(value)),
            setViremets: virements => dispatch(setViremets(virements)),
    }};

const mapStateToProps = state => {
    return { show: state.dialogReducer.show,
             title: state.dialogReducer.title,
             body: state.dialogReducer.body,
             style: state.dialogReducer.style,
             type: state.dialogReducer.type,
             idcurrentVirement: state.VirementReducer.idcurrentVirement
    };
};

class ConnectedModel extends Component {
    deleteVirement(id){
        const url = `http://localhost:8081/virements/${id}`;
        axios.delete(url)
            .then(res => {
                this.props.openDialog({show:false})
                this.props.resetVirementForm({});
                this.props.setViremets(res.data)
                /*this.props.history.push('/virements');
                this.props.setActiveStep(0)*/
            })
            .catch(err => {
                const errorResponse = err.response.data;
                this.props.openDialog({body: errorResponse.message, show: true, title: "Erreur!!", style:"danger", type: DATA_NOT_FOUND});
            });
    }
    handleClose = () => {this.props.openDialog({show:false})};
    onContinue = () => {
        switch (this.props.type) {
            case DELETE_VIREMENT:
                this.deleteVirement(this.props.idcurrentVirement); break;
            case CONFIRMER_VIREMENT:
                console.log("CASE CONFIRMER VIREMENT")
                this.props.openDialog({show:false}); break;
            case DATA_NOT_FOUND:
                console.log("CASE DATA NOT FOUND")
                this.props.openDialog({show:false});break;
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
export default withRouter(CustomDialog);
