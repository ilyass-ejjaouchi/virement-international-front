import './App.css';
import {Container} from 'react-bootstrap';
import React from "react";
import Header from './Components/Header/Header';
import CustomNavbar from './Components/Navbar/CustomNavbar';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import CreateBeneficiare from "./Components/CreateBeneficiare/CreateBeneficiare";
import VirementForm from "./Components/VirementForm/VirementForm";
import Model from "./Components/Model/Model";

function App() {
    return (
        <Router>
            <div>
                <CustomNavbar></CustomNavbar>
                <Container className="App">
                    <Header></Header>
                    <Switch>
                        <Route exact path="/" component={VirementForm} />
                        <Route path="/virements" component={VirementForm} />
                        <Route path="/beneficiares" component={CreateBeneficiare} />
                    </Switch>
                    <Model title="Erreur" body="votre formulaire est invalide"></Model>
                </Container>
            </div>
        </Router>
    );
}

export default App;
