import {Nav, Navbar} from "react-bootstrap";
import logo from "../../media/logoAdria.png";
import React, {Component} from "react";
import {Link} from 'react-router-dom';
import './CustomNavbar.css';

class CustomNavbar extends Component {
    render() {
        return <Navbar bg="light" variant="light">
            <Navbar.Brand as={Link} to="/"><img src={logo} alt="logo" className="logo"/></Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link  as={Link} to="/" className="lien" >Acceuil</Nav.Link>
                <Nav.Link  as={Link} to="/virements" className="lien">Virements</Nav.Link>
                <Nav.Link  as={Link} to="/beneficiares" className="lien">Bénéficiaire</Nav.Link>
            </Nav>
        </Navbar>;
    }
}
export default CustomNavbar;

