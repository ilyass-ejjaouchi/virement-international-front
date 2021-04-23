import './App.css';
import {Container} from 'react-bootstrap';
import React from "react";
import CustomNavbar from './Components/Navbar/CustomNavbar';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import CreateVirement from "./Components/Virements/DemandeVirement/VirementForm";
import CustomDialog from "./Components/Dialog/Dialog";
import BeneficiareForm from "./Components/Beneficiares/DeclarationBeneficiare/BeneficiareForm";
import RecapitulatifVirement from "./Components/Virements/DemandeVirement/Recapitulatif/RecapitulatifVirement";
import SignatureVirement from "./Components/Virements/DemandeVirement/Signature/SignatureVirement";
import ChercherVirement from "./Components/Virements/ChercherVirement/ChercherVirement";
import SignatureBeneficiare from "./Components/Beneficiares/DeclarationBeneficiare/Signature/SignatureBeneficiare";
import RecapitulatifBeneficiare
    from "./Components/Beneficiares/DeclarationBeneficiare/Recapitulatif/RecapitulatifBeneficiare";
import ChercherBeneficiare from "./Components/Beneficiares/ChercherBeneficiare/ChercherBeneficiare";

class App extends React.Component {

    render() {
        return (
            <Router>
                <div>
                    <CustomNavbar></CustomNavbar>
                    <Container className="App">
                        <Switch>
                            <Route exact path="/" component={CreateVirement}/>
                            <Route path="/virements/recaputilatif" component={RecapitulatifVirement}/>
                            <Route path="/virements/signature" component={SignatureVirement}/>
                            <Route path="/virements/chercherVirement" component={ChercherVirement}/>
                            <Route path="/virements" component={CreateVirement}/>
                            <Route path="/chercherVirement" component={ChercherVirement}/>
                            <Route path="/beneficiares/recaputilatif" component={RecapitulatifBeneficiare}/>
                            <Route path="/beneficiares/signature" component={SignatureBeneficiare}/>
                            <Route path="/chercherBeneficiares" component={ChercherBeneficiare}/>
                            <Route path="/beneficiares" component={BeneficiareForm}/>
                        </Switch>
                    </Container>
                    <CustomDialog/>
                </div>
            </Router>
        )
    }
}
export default App;
