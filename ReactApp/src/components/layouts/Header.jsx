import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import link from "../../assets/Svg/Nav/Link.svg";
import Estadisticas from "../../assets/Svg/Nav/Estadisticas.svg";
import referrals from "../../assets/Svg/Nav/Referrals.svg";
import payouts from "../../assets/Svg/Nav/payouts.svg";
import support from "../../assets/Svg/Nav/support.svg";
import logout from "../../assets/Svg/Nav/logout.svg";
import defaultAvatar from "../../assets/Img/AvatarUser.jpg";
import BotonLinkIcon from "../../assets/Svg/Icon/BotonLink.svg";
import "../styles/stylesLayouts/HeaderDash.css";
import "../styles/stylesLayouts/Header.css";

// Define el componente Header que recibe props para gestionar autenticación y usuario.
const Header = ({ isAuthenticated, onLogout, user }) => {
  const [scrolled, setScrolled] = useState(false);  // Estado para manejar el scroll
  const location = useLocation();  // Hook para obtener la ubicación actual
  const navigate = useNavigate();  // Hook para la navegación programática

  // Escucha el evento de scroll para modificar el estado
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);  // Si ha hecho scroll más de 100px, activa `scrolled`
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);  // Limpia el event listener al desmontar
    };
  }, []);

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");  // Elimina los datos del localStorage
    sessionStorage.removeItem("isAuthenticated");  // Elimina los datos de la sesión
    onLogout();  // Llama a la función de cierre de sesión pasada como prop
    navigate("/");  // Redirige a la página de inicio
  };

  // Componente para usuarios no autenticados
  const UnauthenticatedHeader = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    // Función para alternar el menú en móviles
    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    };

    const esHome = location.pathname === "/";  // Verifica si la ruta es la página de inicio
    const navClass = esHome ? "HomeNav" : "Nav";  // Ajusta la clase CSS dependiendo de la ruta

    return (
      <nav className={`${navClass} Unauthenticated ${scrolled ? "scrolled" : ""}`}>
        <Link to="/" className="Nav-Logo"></Link>
        <button className="Menu-Button" onClick={toggleMenu}>
          <div className={`menuBarra ${menuOpen ? "open" : ""}`}>
            <span className={`fila1 ${menuOpen ? "fila1Animation" : ""}`}></span>
            <span className={`fila2 ${menuOpen ? "fila2Animation" : ""}`}></span>
            <span className={`fila3 ${menuOpen ? "fila3Animation" : ""}`}></span>
          </div>
        </button>
        <ul className={`Nav-List ${menuOpen ? "open" : ""}`}>
          <li className="Nav-Item">
            <Link to="/" onClick={toggleMenu} className="transitionBorder">Home</Link>
          </li>
          <li className="Nav-Item">
            <Link to="/Signin" onClick={toggleMenu} className="transitionBorder">Sign in</Link>
          </li>
          <li className="Nav-Item">
            <Link to="/Signup" onClick={toggleMenu} className="transitionBorder">Sign up</Link>
          </li>
        </ul>
      </nav>
    );
  };

  // Componente para usuarios autenticados
  const AuthenticatedHeader = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // Función para enviar el formulario del modal
    const handleSubmit = (e) => {
      e.preventDefault();
      setShowModal(false);
    };

    return (
      <>
        <nav
          className={`HeaderDash ${isExpanded ? "expanded" : ""}`}
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
        >
          <Link to="/edit-profile" className="PefilUsuario">
            <img
              src={user?.profilePicture || defaultAvatar}
              alt={`${user?.name || "Usuario"}'s profile picture`}
              className="UserProfilePicture"
            />
            <h1 className="title-nav">{user?.name || "Usuario"}</h1>
          </Link>
          <div className="container-links">
            <Link
              to="/dashboardlinks"
              className={`Nav-Link ${location.pathname === "/dashboardlinks" ? "active" : ""}`}
            >
              <img src={link} alt="Links" className="Nav-Ico" />
              <div className="text-nav">Links</div>
            </Link>
            <Link
              to="/dashboardestadisticas"
              className={`Nav-Link ${location.pathname === "/dashboardestadisticas" ? "active" : ""}`}
            >
              <img src={Estadisticas} alt="Statistics" className="Nav-Ico" />
              <div className="text-nav">Statistics</div>
            </Link>
            <Link
              to="/dashboardreferrals"
              className={`Nav-Link ${location.pathname === "/dashboardreferrals" ? "active" : ""}`}
            >
              <img src={referrals} alt="Referrals" className="Nav-Ico" />
              <div className="text-nav">Referrals</div>
            </Link>
            <Link
              to="/dashboardpayouts"
              className={`Nav-Link ${location.pathname === "/dashboardpayouts" ? "active" : ""}`}
            >
              <img src={payouts} alt="Payouts" className="Nav-Ico" />
              <div className="text-nav">Payouts</div>
            </Link>
            <Link
              to="/dashboardsupport"
              className={`Nav-Link ${location.pathname === "/dashboardsupport" ? "active" : ""}`}
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

        <div className="BotonLink" onClick={() => setShowModal(true)}>
          <img src={BotonLinkIcon} alt="Boton de Link" />
        </div>

        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Shorten New Link</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Link Name</label>
                  <input type="text" id="name" name="name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="url">Link URL</label>
                  <input type="url" id="url" name="url" required />
                </div>
                <div className="form-actions">
                  <button type="submit">Create</button>
                  <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </>
    );
  };

  return isAuthenticated ? <AuthenticatedHeader /> : <UnauthenticatedHeader />;
};

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
    profilePicture: PropTypes.string,
  }),
};

export default Header;
