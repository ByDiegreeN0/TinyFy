import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as jwt_decode from "jwt-decode";

const useTokenValidation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      navigate("/SignIn");
    } else {
      try {
        const decodedToken = jwt_decode.decode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          navigate("/SignIn");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        navigate("/SignIn");
      }
    }
  }, [navigate]);
};

export default useTokenValidation;