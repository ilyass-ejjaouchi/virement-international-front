import './App.css';
import {Container} from 'react-bootstrap';
import React from "react";
import Header from './Components/Header/Header';
import CustomNavbar from './Components/Navbar/CustomNavbar';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import CreateVirement from "./Components/VirementForm/VirementForm";
import CustomDialog from "./Components/Model/Dialog";
import BeneficiareForm from "./Components/CreateBeneficiare/BeneficiareForm";
import RecapitulatifVirement from "./Components/VirementForm/Recapitulatif/RecapitulatifVirement";
import SignatureVirement from "./Components/VirementForm/Signature/SignatureVirement";
import ChercherVirement from "./Components/ChercherVirement/ChercherVirement";

class App extends React.Component {

    render() {
        return (
            <Router>
                <div>
                    <CustomNavbar></CustomNavbar>
                    <Container className="App">
                        <Header></Header>
                        <Switch>
                            <Route exact path="/" component={CreateVirement}/>
                            <Route path="/virements/recaputilatif" component={RecapitulatifVirement}/>
                            <Route path="/virements/signature" component={SignatureVirement}/>
                            <Route path="/virements/chercherVirement" component={ChercherVirement}/>
                            <Route path="/virements" component={CreateVirement}/>
                            <Route path="/beneficiares" component={BeneficiareForm}/>
                            <Route path="/chercherVirement" component={ChercherVirement}/>
                        </Switch>
                    </Container>
                    <CustomDialog></CustomDialog>
                </div>
            </Router>
        )
    }
}
export default App;
