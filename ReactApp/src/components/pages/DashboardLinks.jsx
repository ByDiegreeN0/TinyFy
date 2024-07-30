import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Example from "../../utils/SimpleBarChart";
import "../styles/DashboardLinks.css";

const DashboardLinks = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated =
      localStorage.getItem("isAuthenticated") ||
      sessionStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/Signin");
    }
  }, [navigate]);

  return (
    <div className="dashboard animationFade">
      <fieldset>
        <legend className="titleDashboard">Grafico Mensual</legend>
        <div className="content">
          <div className="containerGrafico">
            <Example />
          </div>
        </div>
      </fieldset>

    </div>
  );
};

export default DashboardLinks;
