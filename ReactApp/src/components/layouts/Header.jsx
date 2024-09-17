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
import LoadingScreen from "C:/Users/CARLOS/Documentos/TinyFy/ReactApp/src/components/Common/LoadingScreen.jsx";

const Header = ({ isAuthenticated, onLogout, user }) => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("isAuthenticated");
    onLogout();
    navigate("/");
  };

  const UnauthenticatedHeader = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    };

    const isHome = location.pathname === "/";
    const headerClass = isHome ? "HomeHeader" : "RegularHeader";

    return (
      <nav className={`${headerClass} Unauthenticated ${scrolled ? "scrolled" : ""}`}>
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

  const AuthenticatedHeader = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

<<<<<<< HEAD
    const BotonLink = () => {
      const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const name = e.target.name.value;
        const url = e.target.url.value;
        const newLink = {
          LinkUrl: url,
          LinkName: name,
          ClickCount: 0,
          DailyViewCount: 0,
          MonthlyViewCount: 0,
          YearlyViewCount: 0,
          CreatedAt: new Date().toISOString(),
        };
        try {
          const response = await fetch("http://localhost:8000/links", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newLink),
          });
          if (response.ok) {
            console.log("Enlace creado con éxito");
            setShowModal(false);
            // Redirigir al dashboard de enlaces y recargar la página
            window.location.href = '/dashboardlinks';
          } else {
            console.error("Error al crear el enlace");
            setIsLoading(false);
          }
        } catch (error) {
          console.error("Error al crear el enlace:", error);
          setIsLoading(false);
        }
      };

      return (
        <>
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
=======
    const handleSubmit = (e) => {
      e.preventDefault();
      setShowModal(false);
>>>>>>> d984ee83e0c4bcef9f0c126c1eaf74c54caf7c25
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
<<<<<<< HEAD
        <BotonLink />
        {isLoading && <LoadingScreen />}
=======

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
>>>>>>> d984ee83e0c4bcef9f0c126c1eaf74c54caf7c25
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