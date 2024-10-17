import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import link from "../../assets/Svg/Nav/Link.svg";
import Estadisticas from "../../assets/Svg/Nav/Estadisticas.svg";
import referrals from "../../assets/Svg/Nav/Referrals.svg";
import payouts from "../../assets/Svg/Nav/payouts.svg";
import support from "../../assets/Svg/Nav/support.svg";
import logout from "../../assets/Svg/Nav/logout.svg";
import defaultAvatar from "../../assets/Img/AvatarUser.jpg";
import BotonLinkIcon from "../../assets/Svg/Icon/BotonLink.svg";
import LoadingScreen from "../Common/LoadingScreen";
import CreateLinkForm from "../Common/CreateLinkForm";
import "../styles/stylesLayouts/HeaderDash.css";

const AuthenticatedHeader = ({ user, onLogout }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const handleCreateLink = async (newLink) => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(newLink),
      });
      if (response.ok) {
        console.log("Enlace creado con éxito");
        setShowModal(false);
        window.location.href = '/dashboardlinks';
      } else {
        console.error("Error al crear el enlace");
      }
    } catch (error) {
      console.error("Error al crear el enlace:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const BotonLink = () => (
    <>
      <div className="BotonLink" onClick={() => setShowModal(true)}>
        <img src={BotonLinkIcon} alt="Boton de Link" />
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Shorten New Link</h2>
            <CreateLinkForm onSubmit={handleCreateLink} isModal={true} onCancel={() => setShowModal(false)} />
          </div>
        </div>
      )}
    </>
  );

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
        <button onClick={onLogout} className="Logout-Button">
          <img src={logout} alt="Logout" className="Nav-Ico" />
          <div className="text-nav">Logout</div>
        </button>
      </nav>
      <BotonLink />
      {isLoading && <LoadingScreen />}
    </>
  );
};

AuthenticatedHeader.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    profilePicture: PropTypes.string,
  }),
  onLogout: PropTypes.func.isRequired,
};

export default AuthenticatedHeader;