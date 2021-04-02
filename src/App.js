import './App.css';
import {Container} from 'react-bootstrap';
import React from "react";
import Header from './Components/Header/Header';
import CustomNavbar from './Components/Navbar/CustomNavbar';
import CreateBeneficiare from "./Components/CreateBeneficiare/CreateBeneficiare";

function App() {
    return (
        <div>
            <CustomNavbar></CustomNavbar>
            <Container className="App">
                <Header></Header>
                <CreateBeneficiare></CreateBeneficiare>
            </Container>
            {/*<SignupForm></SignupForm>*/}
        </div>

    );
}

export default App;
