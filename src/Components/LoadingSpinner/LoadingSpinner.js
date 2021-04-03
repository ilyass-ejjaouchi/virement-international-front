import React, {Component} from 'react';
import './LoadingSpinner.css';
import {Spinner} from "react-bootstrap";

class LoadingSpinner extends Component {
    render() {
        return <Spinner animation="border" role="status" className="spinner">
            <span className="sr-only">Loading...</span>
        </Spinner>
        }}
export default LoadingSpinner;
