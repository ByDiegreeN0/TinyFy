import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as jwtDecode from "jwt-decode"; // Cambiamos la importación a esta forma

const useTokenValidation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        console.log("No token found, redirecting to signin");
        navigate("/Signin");
        return;
      }

      try {
        const decodedToken = jwtDecode.jwtDecode(token); // Usamos jwtDecode.jwtDecode
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          console.log("Token expired, redirecting to signin");
          localStorage.removeItem("accessToken");
          navigate("/Signin");
        } else {
          console.log("Token is valid");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("accessToken");
        navigate("/Signin");
      }
    };

    validateToken();
  }, [navigate]);
};

export default useTokenValidation;