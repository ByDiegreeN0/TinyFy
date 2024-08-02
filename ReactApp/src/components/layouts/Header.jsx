import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import logo from "../../assets/Svg/Logos/Logo_Negro.svg";
import link from "../../assets/Svg/Nav/Link.svg";
import referrals from "../../assets/Svg/Nav/Referrals.svg";
import payouts from "../../assets/Svg/Nav/payouts.svg";
import support from "../../assets/Svg/Nav/support.svg";
import logout from "../../assets/Svg/Nav/logout.svg";
import FotoDePerfil from "../../assets/Img/AvatarUser.jpg";
import "../styles/stylesLayouts/Header.css";
import "../styles/stylesLayouts/HeaderDash.css";

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
        <button className="Menu-Button" onClick={toggleMenu}>
          <div className={`menuBarra ${menuOpen ? 'open' : ''}`}>
            <span className={`fila1 ${menuOpen ? 'fila1Animation' : ''}`}></span>
            <span className={`fila2 ${menuOpen ? 'fila2Animation' : ''}`}></span>
            <span className={`fila3 ${menuOpen ? 'fila3Animation' : ''}`}></span>
          </div>
        </button>
        <ul className={`Nav-List ${menuOpen ? "open" : ""}`}>
          <li className="Nav-Item">
            <Link to="/" onClick={toggleMenu} className="transitionBorder">
              Home
            </Link>
          </li>
          <li className="Nav-Item">
            <Link to="/Signin" onClick={toggleMenu} className="transitionBorder">
              Sign in
            </Link>
          </li>
          <li className="Nav-Item">
            <Link to="/Signup" onClick={toggleMenu} className="transitionBorder">
              Sign up
            </Link>
          </li>
        </ul>
      </nav>
    );
  };

  // Header para usuarios autenticados
  const AuthenticatedHeader = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const location = useLocation();

    return (
      <nav 
        className={`HeaderDash ${isExpanded ? "expanded" : ""}`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <Link to="/dashboardlinks" className="PefilUsuario">
          <img src={FotoDePerfil} alt="CarlitosApp FotoDePerfil" />
          <h1 className="title-nav">Usuario</h1>
        </Link>
        <div className="container-links">
          <Link 
            to="/dashboardlinks" 
            className={`Nav-Link ${location.pathname === '/dashboardlinks' ? 'active' : ''}`}
          >
            <img src={link} alt="Links" className="Nav-Ico" />
            <div className="text-nav">Links</div>
          </Link>
          <Link 
            to="/dashboardreferrals" 
            className={`Nav-Link ${location.pathname === '/dashboardreferrals' ? 'active' : ''}`}
          >
            <img src={referrals} alt="Referrals" className="Nav-Ico" />
            <div className="text-nav">Referrals</div>
          </Link>
          <Link 
            to="/dashboardpayouts" 
            className={`Nav-Link ${location.pathname === '/dashboardpayouts' ? 'active' : ''}`}
          >
            <img src={payouts} alt="Payouts" className="Nav-Ico" />
            <div className="text-nav">Payouts</div>
          </Link>
          <Link 
            to="/dashboardsupport" 
            className={`Nav-Link ${location.pathname === '/dashboardsupport' ? 'active' : ''}`}
          >
            <img src={support} alt="Support" className="Nav-Ico" />
            <div className="text-nav">Support</div>
          </Link>
        </div>
        <button onClick={handleLogout} className="Logout-Button">
          <img src={logout} alt="Logout" className="Nav-Ico" />
          <div className="text-nav">Logout</div> 
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
