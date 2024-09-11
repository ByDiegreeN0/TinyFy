// Importa las dependencias necesarias de React y otras librerías.
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
// Importa las imágenes y SVGs para los íconos de navegación.
import link from "../../assets/Svg/Nav/Link.svg";
import Estadisticas from "../../assets/Svg/Nav/Estadisticas.svg";
import referrals from "../../assets/Svg/Nav/Referrals.svg";
import payouts from "../../assets/Svg/Nav/payouts.svg";
import support from "../../assets/Svg/Nav/support.svg";
import logout from "../../assets/Svg/Nav/logout.svg";
import defaultAvatar from "../../assets/Img/AvatarUser.jpg";
import BotonLinkIcon from "../../assets/Svg/Icon/BotonLink.svg";
// Importa los estilos CSS para los componentes de la cabecera.
import "../styles/stylesLayouts/HeaderDash.css";
import "../styles/stylesLayouts/Header.css";

// Define el componente Header que recibe props para gestionar autenticación y usuario.
const Header = ({ isAuthenticated, onLogout, user }) => {
  // Estado para determinar si la página ha sido desplazada verticalmente más allá de 100 píxeles.
  const [scrolled, setScrolled] = useState(false);
  // Hook para obtener la ubicación actual de la ruta.
  const location = useLocation();
  // Hook para manejar la navegación programática.
  const navigate = useNavigate();

  // Hook para agregar y eliminar un event listener para el desplazamiento.
  useEffect(() => {
    // Función que actualiza el estado `scrolled` según la posición de desplazamiento.
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    // Agrega el event listener cuando el componente se monta.
    window.addEventListener("scroll", handleScroll);

    // Limpia el event listener cuando el componente se desmonta.
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]); // El efecto se ejecuta cuando `scrolled` cambia.

  // Función para manejar el cierre de sesión.
  const handleLogout = () => {
    // Elimina los datos de autenticación almacenados en el almacenamiento local y de sesión.
    localStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("isAuthenticated");
    // Llama a la función `onLogout` pasada como prop.
    onLogout();
    // Redirige al usuario a la página de inicio.
    navigate("/");
  };

  // Componente que se muestra cuando el usuario no está autenticado.
  const UnauthenticatedHeader = () => {
    // Estado para controlar si el menú de navegación está abierto o cerrado.
    const [menuOpen, setMenuOpen] = useState(false);

    // Función para alternar el estado del menú.
    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    };

    // Determina si la ruta actual es la página de inicio.
    const esHome = location.pathname === "/";
    // Define la clase CSS para el contenedor de navegación según la ruta actual.
    const navClass = esHome ? "HomeNav" : "Nav";

    return (
      <nav
        className={`${navClass} Unauthenticated ${scrolled ? "scrolled" : ""}`}
      >
        {/* Enlace a la página de inicio con un logo (actualmente sin contenido). */}
        <Link to="/" className="Nav-Logo"></Link>
        {/* Botón para abrir o cerrar el menú de navegación en dispositivos móviles. */}
        <button className="Menu-Button" onClick={toggleMenu}>
          <div className={`menuBarra ${menuOpen ? "open" : ""}`}>
            <span className={`fila1 ${menuOpen ? "fila1Animation" : ""}`}></span>
            <span className={`fila2 ${menuOpen ? "fila2Animation" : ""}`}></span>
            <span className={`fila3 ${menuOpen ? "fila3Animation" : ""}`}></span>
          </div>
        </button>
        {/* Lista de navegación que se muestra u oculta según el estado del menú. */}
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

  // Componente que se muestra cuando el usuario está autenticado.
  const AuthenticatedHeader = () => {
    // Estado para controlar si el menú está expandido o no.
    const [isExpanded, setIsExpanded] = useState(false);
    // Estado para controlar si el modal está visible o no.
    const [showModal, setShowModal] = useState(false);

    // Componente para mostrar el botón de enlace que abre el modal.
    const BotonLink = () => {
      // Función para manejar el envío del formulario del modal.
      const handleSubmit = (e) => {
        e.preventDefault();
        setShowModal(false);
      };

      return (
        <>
          <div className="BotonLink" onClick={() => setShowModal(true)}>
            <img src={BotonLinkIcon} alt="Boton de Link" />
          </div>
          {/* Modal para crear un nuevo enlace. Se muestra si `showModal` es `true`. */}
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
                    <button type="button" onClick={() => setShowModal(false)}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      );
    };

    return (
      <>
        {/* Contenedor de la cabecera con un menú que se expande al pasar el ratón sobre él. */}
        <nav
          className={`HeaderDash ${isExpanded ? "expanded" : ""}`}
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
        >
          {/* Enlace al perfil del usuario con su foto y nombre. */}
          <Link to="/edit-profile" className="PefilUsuario">
            <img
              src={user?.profilePicture || defaultAvatar}
              alt={`${user?.name || "Usuario"}'s profile picture`}
              className="UserProfilePicture"
            />
            <h1 className="title-nav">{user?.name || "Usuario"}</h1>
          </Link>
          <div className="container-links">
            {/* Varios enlaces de navegación con iconos y texto. La clase `active` se aplica al enlace activo. */}
            <Link
              to="/dashboardlinks"
              className={`Nav-Link ${
                location.pathname === "/dashboardlinks" ? "active" : ""
              }`}
            >
              <img src={link} alt="Links" className="Nav-Ico" />
              <div className="text-nav">Links</div>
            </Link>
            <Link
              to="/dashboardestadisticas"
              className={`Nav-Link ${
                location.pathname === "/dashboardestadisticas" ? "active" : ""
              }`}
            >
              <img src={Estadisticas} alt="Statistics" className="Nav-Ico" />
              <div className="text-nav">Statistics</div>
            </Link>
            <Link
              to="/dashboardreferrals"
              className={`Nav-Link ${
                location.pathname === "/dashboardreferrals" ? "active" : ""
              }`}
            >
              <img src={referrals} alt="Referrals" className="Nav-Ico" />
              <div className="text-nav">Referrals</div>
            </Link>
            <Link
              to="/dashboardpayouts"
              className={`Nav-Link ${
                location.pathname === "/dashboardpayouts" ? "active" : ""
              }`}
            >
              <img src={payouts} alt="Payouts" className="Nav-Ico" />
              <div className="text-nav">Payouts</div>
            </Link>
            <Link
              to="/dashboardsupport"
              className={`Nav-Link ${
                location.pathname === "/dashboardsupport" ? "active" : ""
              }`}
            >
              <img src={support} alt="Support" className="Nav-Ico" />
              <div className="text-nav">Support</div>
            </Link>
          </div>
          {/* Botón de cierre de sesión que llama a `handleLogout` al hacer clic. */}
          <button onClick={handleLogout} className="Logout-Button">
            <img src={logout} alt="Logout" className="Nav-Ico" />
            <div className="text-nav">Logout</div>
          </button>
        </nav>
        <BotonLink />
      </>
    );
  };

  // Renderiza el componente adecuado según el estado de autenticación.
  return isAuthenticated ? <AuthenticatedHeader /> : <UnauthenticatedHeader />;
};

// Define las PropTypes para el componente Header, asegurando que las propiedades sean del tipo correcto.
Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
    profilePicture: PropTypes.string,
  }),
};

// Exporta el componente Header para que pueda ser usado en otras partes de la aplicación.
export default Header;
