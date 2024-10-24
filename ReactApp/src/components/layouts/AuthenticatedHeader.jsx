import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

// Importación de assets
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

const AuthenticatedHeader = ({ onLogout }) => {
  const [user, setUser] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const getUserIdFromToken = () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const decodedToken = JSON.parse(window.atob(base64));
        if (decodedToken && decodedToken.sub) {
          console.log("User ID extracted from token:", decodedToken.sub);
          return decodedToken.sub;
        } else {
          console.error("Decoded token does not contain a user ID.");
          return null;
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        return null;
      }
    }
    console.log("No token found in localStorage.");
    return null;
  };

  const fetchUserData = async () => {
    const userId = getUserIdFromToken();
    if (!userId) {
      console.error("No user ID available");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });

      if (response.ok) {
        const userData = await response.json();
        setUser({
          name: userData.username,
          profilePicture: userData.profilePicture || defaultAvatar,
        });
      } else {
        console.error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleCreateLink = async (newLink) => {
    setIsLoading(true);
    const userId = getUserIdFromToken();
    if (!userId) {
      console.error("Unable to create link because no user ID was found.");
      setIsLoading(false);
      return;
    }

    const linkWithUserId = {
      ...newLink,
      userId: userId,
    };

    try {
      const response = await fetch("http://localhost:8000/links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify(linkWithUserId),
      });
      if (response.ok) {
        console.log("Link created successfully");
        setShowModal(false);
        window.location.href = '/dashboardlinks';
      } else {
        console.error("Error creating the link");
      }
    } catch (error) {
      console.error("Error creating the link:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const BotonLink = () => (
    <>
      <div className="BotonLink" onClick={() => setShowModal(true)}>
        <img src={BotonLinkIcon} alt="Link Button" />
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Shorten New Link</h2>
            <CreateLinkForm 
              onSubmit={handleCreateLink} 
              isModal={true} 
              onCancel={() => setShowModal(false)} 
            />
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
            alt={`${user?.name || "User"}'s profile picture`}
            className="UserProfilePicture"
          />
          <h1 className="title-nav">{user?.name || "User"}</h1>
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
  onLogout: PropTypes.func.isRequired,
};

export default AuthenticatedHeader;