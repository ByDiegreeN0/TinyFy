import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as jwtDecode from "jwt-decode";

const useTokenValidation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const clearAuthData = () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("isAuthenticated");
    };

    const validateToken = () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        console.log("No token found, redirecting to signin");
        clearAuthData();
        navigate("/Signin");
        return;
      }

      try {
        const decodedToken = jwtDecode.jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          console.log("Token expired, redirecting to signin");
          clearAuthData();
          navigate("/Signin");
        } else {
          console.log("Token is valid");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        clearAuthData();
        navigate("/Signin");
      }
    };

    validateToken();
  }, [navigate]);
};

export default useTokenValidation;