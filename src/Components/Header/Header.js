import React, {Component} from 'react';
import virement from '../../media/virment.png';
import './Header.css';
class Header extends Component {
    render() {
        return <div>
            <h4>Créer un Virement</h4>
            <img src={virement} alt="virement" className="image"/>
             </div>;
    }
}
export default Header;
