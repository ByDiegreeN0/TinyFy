import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/images/Logo_Negro.svg';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        document.addEventListener('scroll', handleScroll);
        
        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className={`Nav ${scrolled ? 'scrolled' : ''}`}>
            <Link to="/">
                <img src={logo} alt="Logo" className="Nav-Logo" />
            </Link>
            <button className="Menu-Button" onClick={toggleMenu}>
                <span className="Menu-Icon">&#9776;</span>
            </button>
            <ul className={`Nav-List ${menuOpen ? 'open' : ''}`}>
                <li className='Nav-Item'><Link to="/" onClick={toggleMenu}>Home</Link></li>
                <li className='Nav-Item'><Link to="/login" onClick={toggleMenu}>Login</Link></li>
                <li className='Nav-Item'><Link to="/Registro-usuario" onClick={toggleMenu}>Sign in</Link></li>
            </ul>
        </nav>
    );
};

export default Header;
