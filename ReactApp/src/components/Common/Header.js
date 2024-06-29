import React from 'react';
import { Link } from 'react-router-dom';
import '../shared/Header.css';
import logo from '../../Logo_Negro.svg'; 

const Header = () => {
    return (
        <nav className="Nav">
            <Link to="/">
                <img src={logo} alt="Logo" className="Nav-Logo" />
            </Link>
            <ul className="Nav-List">
                <li className='Nav-Item'><Link to="/">Home</Link></li>
                <li className='Nav-Item'><Link to="/login">Login</Link></li>
                <li className='Nav-Item'><Link to="/Registro-usuario">Sig in</Link></li>
            </ul>
        </nav>
    );
};

export default Header;
