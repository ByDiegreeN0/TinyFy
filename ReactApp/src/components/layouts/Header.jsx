import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import logo from "../../assets/Logo_Negro.svg";
import FotoDePerfil from "../../assets/Img/AvatarUser.png";
import "../styles/Header.css";
import "../styles/HeaderDash.css";

const Header = ({ isAuthenticated, onLogout }) => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('isAuthenticated');
    onLogout();
    navigate('/');
  };


  // Header para usuarios no autenticados
  const UnauthenticatedHeader = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    };

    return (
      <nav className={`Nav Unauthenticated ${scrolled ? "scrolled" : ""}`}>
        <Link to="/" className="logoShadow">
          <img src={logo} alt="CarlitosApp Logo" className="Nav-Logo" />
        </Link>
        <button className="Menu-Button" onClick={toggleMenu}></button>
        <ul className={`Nav-List ${menuOpen ? "open" : ""}`}>
          <li className="Nav-Item">
            <Link to="/" onClick={toggleMenu} className="transitionBorder">
              Home
            </Link>
          </li>
          <li className="Nav-Item">
            <Link
              to="/Signin"
              onClick={toggleMenu}
              className="transitionBorder"
            >
              Sign in
            </Link>
          </li>
          <li className="Nav-Item">
            <Link
              to="/Signup"
              onClick={toggleMenu}
              className="transitionBorder"
            >
              Sign up
            </Link>
          </li>
        </ul>
      </nav>
    );
  };

  // Header para usuarios autenticados
  const AuthenticatedHeader = () => {
    const isDashboard = location.pathname === "/dashboard";

    return (
      <nav className={`HeaderDash ${isDashboard ? "dashboard-header" : ""}`}>
        <Link to="/dashboardlinks" className="PefilUsuario">
          <img src={FotoDePerfil} alt="CarlitosApp FotoDePerfil" />
          <h1>Username</h1>
        </Link>
        <div className="container-links">
          <Link to="/dashboardlinks" className="Nav-Link ">Links</Link>
          <Link to="/dashboardreferrals" className="Nav-Link ">Referrals</Link>
          <Link to="/dashboardpayouts" className="Nav-Link ">Payouts</Link>
          <Link to="/dashboardsupport" className="Nav-Link   ">Support</Link>
        </div>
        <button onClick={handleLogout} className="Logout-Button">
          Logout
        </button>
      </nav>
    );
  };

  return isAuthenticated ? <AuthenticatedHeader /> : <UnauthenticatedHeader />;
};

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Header;
