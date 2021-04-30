import React, {Component} from 'react';
import {connect} from "react-redux";
import './FindBeneficiarePagination.css';
import {Col, Row} from "react-bootstrap";
import axios from "axios";
import {DANGER, DOMAINE} from "../../../../Redux/Constants/constants";
import {openDialog} from "../../../../Redux/Actions/DialogActions";
import {
    fetchingData,
    setCurrentPageNumber,
    setDemandesBeneficiares,
    setTotalPages
} from "../../../../Redux/Actions/BeneficiareActions";

function mapDispatchToProps(dispatch) {
    return {
        openDialog: o => dispatch(openDialog(o)),
        fetchingData: cd => dispatch(fetchingData(cd)),
        setCurrentPageNumber: nbr => dispatch(setCurrentPageNumber(nbr)),
        setDemandesBeneficiares: nbr => dispatch(setDemandesBeneficiares(nbr)),
        setTotalPages: nbr => dispatch(setTotalPages(nbr)),
    }};
const mapStateToProps = state => {
    return {
        totalPages: state.BeneficiareReducer.totalPages,
        currentPageNumber: state.BeneficiareReducer.currentPageNumber,
        currentPageSize: state.BeneficiareReducer.currentPageSize,
        token: state.AuthenticationReducer.token,
    };
};

class FindBeneficiarePagination extends Component {
    params = {}
    getDemandes(){
        this.params.size = this.props.currentPageSize;
        this.props.fetchingData(true)
        axios.get(DOMAINE + 'beneficiares',{ headers: { Authorization: this.props.token }, params: this.params})
            .then( response => {
                this.props.setTotalPages(response.data.totalPages)
                this.props.setDemandesBeneficiares(response.data)
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
        this.getDemandes();
    }
    previousVirementsPage = ()=>{
        this.props.setCurrentPageNumber(this.props.currentPageNumber -1);
        this.params.page = this.props.currentPageNumber -1;
        this.getDemandes();
    }
    nextVirementsPage = ()=>{
        this.props.setCurrentPageNumber(this.props.currentPageNumber +1);
        this.params.page = this.props.currentPageNumber +1;
        this.getDemandes();
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
                                <a className={this.props.currentPageNumber === i? "page-link activeItem":"page-link itm"} onClick={this.onGetVirementsPage.bind(this, i)}>{i}</a>
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
FindBeneficiarePagination = connect(
    mapStateToProps,
    mapDispatchToProps
)(FindBeneficiarePagination);

export default FindBeneficiarePagination;
