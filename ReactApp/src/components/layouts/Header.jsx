import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate, useLocation } from "react-router-dom";
import AuthenticatedHeader from "./AuthenticatedHeader";
import UnauthenticatedHeader from "./UnauthenticatedHeader";
import HeaderInter from "./HeaderInter";

const Header = ({ isAuthenticated, onLogout, user }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("isAuthenticated");
    onLogout();
    navigate("/");
  };

  // Show InterstitialHeader for shortened URLs
  if (location.pathname !== "/" && !location.pathname.startsWith("/dashboard")) {
    return <HeaderInter />;
  }

  return isAuthenticated ? (
    <AuthenticatedHeader user={user} onLogout={handleLogout} />
  ) : (
    <UnauthenticatedHeader />
  );
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