import { useEffect } from "react";
import * as jwt_decode from "jwt-decode";

const useTokenValidation = () => {
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      console.log("No token found");
    } else {
      try {
        const decodedToken = jwt_decode.decode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          console.log("Token has expired");
        } else {
          console.log("Token is valid");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);
};

export default useTokenValidation;