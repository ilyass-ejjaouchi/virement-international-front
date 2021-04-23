import {Nav, Navbar} from "react-bootstrap";
import logo from "../../media/logoAdria.png";
import React, {Component} from "react";
import {Link} from 'react-router-dom';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import './CustomNavbar.css';

class CustomNavbar extends Component {
    render() {
        return <Navbar bg="light" variant="light">
            <Navbar.Brand as={Link} to="/"><img src={logo} alt="logo" className="logo"/></Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link  as={Link} to="/virements" className="lien">Demande de Virement</Nav.Link>
                <Nav.Link  as={Link} to="/beneficiares" className="lien">Déclaration des bénéficiaires</Nav.Link>
{/*                <Nav.Link  as={Link} to="/beneficiares" className="lien">
                    <Badge className="badge" color="error" badgeContent={5}>
                        <NotificationsIcon/>
                    </Badge>
                </Nav.Link>*/}
            </Nav>
        </Navbar>;
    }
}
export default CustomNavbar;

