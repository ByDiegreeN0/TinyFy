import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate, useLocation } from "react-router-dom";
import AuthenticatedHeader from "./AuthenticatedHeader";
import UnauthenticatedHeader from "./UnauthenticatedHeader";
import HeaderInter from "./HeaderInter";

const Header = ({ isAuthenticated, onLogout, user }) => {
  const [shortCodes, setShortCodes] = useState([]); // Lista de códigos válidos
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("isAuthenticated");
    onLogout();
    navigate("/");
  };

  useEffect(() => {
    // Función para obtener los códigos desde la API
    const fetchShortCodes = async () => {
      try {
        const response = await fetch("http://localhost:8000/links", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          // Extraer solo los códigos cortos de la respuesta
          const codes = data.map((link) => `/${link.LinkShortUrl}`);
          setShortCodes(codes);
        } else {
          console.error("Error al obtener los códigos cortos.");
        }
      } catch (error) {
        console.error("Error al conectarse con el backend:", error);
      }
    };

    fetchShortCodes();
  }, []);

  // Verificar si la ruta actual coincide con algún código
  const isShortLink = shortCodes.includes(location.pathname);

  if (isShortLink) {
    return <HeaderInter />;
  }

  // Renderizar encabezado según autenticación
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
