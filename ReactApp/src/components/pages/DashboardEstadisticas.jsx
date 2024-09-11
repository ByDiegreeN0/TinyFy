import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BarChart from "../Common/BarChart";
import "../styles/stylesPages/DashboardEstadisticas.css";

const DashboardEstadisticas = () => {
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
    <div className="dashboard">
      <div className="Grafica-bar">
        <h1 className="title-grafica">
          View the number of links created per day
        </h1>
        <BarChart />
      </div>
    </div>
  );
};

export default DashboardEstadisticas;
