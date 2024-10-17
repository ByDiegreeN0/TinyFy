import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import AuthenticatedHeader from "./AuthenticatedHeader";
import UnauthenticatedHeader from "./UnauthenticatedHeader";

const Header = ({ isAuthenticated, onLogout, user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("isAuthenticated");
    onLogout();
    navigate("/");
  };

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