import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as jwt_decode from "jwt-decode";

const useTokenValidation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      console.log("Hola")
    } else {
      try {
        const decodedToken = jwt_decode.decode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          console.log("Hola")
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [navigate]);
};

export default useTokenValidation;