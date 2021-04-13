import './App.css';
import {Container} from 'react-bootstrap';
import React from "react";
import Header from './Components/Header/Header';
import CustomNavbar from './Components/Navbar/CustomNavbar';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import CreateVirement from "./Components/VirementForm/VirementForm";
import CustomModel from "./Components/Model/Model";
import BeneficiareForm from "./Components/CreateBeneficiare/BeneficiareForm";
import RecapitulatifVirement from "./Components/VirementForm/Recapitulatif/RecapitulatifVirement";

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
                            <Route path="/virements" component={CreateVirement}/>
                            <Route path="/beneficiares" component={RecapitulatifVirement}/>
                        </Switch>
                    </Container>
                    <CustomModel></CustomModel>
                </div>
            </Router>
        )
    }
}
export default App;
