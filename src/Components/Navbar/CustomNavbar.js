import {Nav, Navbar} from "react-bootstrap";
import logo from "../../media/logoAdria.png";
import React, {Component} from "react";
import './CustomNavbar.css';

class CustomNavbar extends Component {
    render() {
        return <Navbar bg="light" variant="light">
            <Navbar.Brand href="#home"><img src={logo} alt="logo" className="logo"/></Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="#home" className="lien">Acceuil</Nav.Link>
                <Nav.Link href="#features" className="lien">Virements</Nav.Link>
                <Nav.Link href="#pricing" className="lien">Bénéficiaire</Nav.Link>
            </Nav>
        </Navbar>;
    }
}
export default CustomNavbar;

