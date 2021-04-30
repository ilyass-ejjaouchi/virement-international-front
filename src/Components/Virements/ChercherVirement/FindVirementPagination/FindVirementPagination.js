import React, {Component} from 'react';
import {connect} from "react-redux";
import './FindVirementPagination.css';
import {Col, Row} from "react-bootstrap";
import {
    fetchingData, setCurrentPageNumber,
    setViremets
} from "../../../../Redux/Actions/VirementActions";
import axios from "axios";
import {DANGER, DOMAINE} from "../../../../Redux/Constants/constants";
import {openDialog} from "../../../../Redux/Actions/DialogActions";

function mapDispatchToProps(dispatch) {
    return {
        openDialog: o => dispatch(openDialog(o)),
        setViremets: virements => dispatch(setViremets(virements)),
        fetchingData: cd => dispatch(fetchingData(cd)),
        setCurrentPageNumber: nbr => dispatch(setCurrentPageNumber(nbr)),
    }};
const mapStateToProps = state => {
    return {
        totalPages: state.VirementReducer.totalPages,
        currentPageNumber: state.VirementReducer.currentPageNumber,
        params: state.VirementReducer.params,
        token: state.AuthenticationReducer.token,
    };
};

class FindVirementPagination extends Component {

    
    params = this.props.params;

    getVirements(){
        this.props.fetchingData(true)
        axios.get(DOMAINE + 'virements',{ headers: { Authorization: this.props.token }, params: this.params})
            .then( response => {
                this.props.setViremets(response.data.content)
                this.props.fetchingData(false)
            })
            .catch(error => {
                this.props.openDialog({body: error.message, show: true, title: "Erreur!!", style:DANGER});
                this.props.fetchingData(false);
            });
    }
    onGetVirementsPage = (i)=>{
        this.props.setCurrentPageNumber(i);
        this.params.page = i;
        this.getVirements();
    }
    previousVirementsPage = ()=>{
        this.props.setCurrentPageNumber(this.props.currentPageNumber -1);
        this.params.page = this.props.currentPageNumber -1;
        this.getVirements();
    }
    nextVirementsPage = ()=>{
        this.props.setCurrentPageNumber(this.props.currentPageNumber +1);
        this.params.page = this.props.currentPageNumber +1;
        this.getVirements();
    }
    render() {
        return <Row className="justify-content-center">
            <Col md={2}>
                <nav>
                    <ul className="pagination pagination-sm justify-content-center sm">
                        <li className={this.props.currentPageNumber===0?"page-item disabled":"page-item"}>
                            <a className="page-link itm"
                               onClick={this.previousVirementsPage.bind(this)}>Precedant</a>
                        </li>{' '}
                        {Array.from(Array(this.props.totalPages), (e, i) => {
                            return <li key={i} className="page-item">
                                <a className={this.props.currentPageNumber === i? "page-link activeItem":"page-link itm"}
                                   onClick={this.onGetVirementsPage.bind(this, i)}>{i}</a>
                            </li>}) }
                        <li className={this.props.currentPageNumber===this.props.totalPages-1?"page-item disabled":"page-item"}>
                            <a className="page-link itm"
                               onClick={this.nextVirementsPage.bind(this)}>Suivant</a>
                        </li>
                    </ul>
                </nav>
            </Col>
        </Row>
    }
}
FindVirementPagination = connect(
    mapStateToProps,
    mapDispatchToProps
)(FindVirementPagination);

export default FindVirementPagination;
