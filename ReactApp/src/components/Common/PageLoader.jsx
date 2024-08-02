import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import LoadingScreen from "./LoadingScreen"; // Asegúrate de que la ruta de importación sea correcta

const PageLoader = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Ajusta este tiempo según tus preferencias

    return () => clearTimeout(timer);
  }, [location]);

  return isLoading ? <LoadingScreen /> : children;
};

export default PageLoader;
