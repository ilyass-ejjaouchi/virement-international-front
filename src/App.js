import './App.css';
import {Container} from 'react-bootstrap';
import React from "react";
import Header from './Components/Header/Header';
import VirementForm from './Components/VirementForm/VirementForm';
import CreateBeneficiare from "./Components/CreateBeneficiare/CreateBeneficiare";

function App() {
    return (
        <Container className="App">
            <Header></Header>
            <CreateBeneficiare></CreateBeneficiare>
        </Container>
    );
}

export default App;
