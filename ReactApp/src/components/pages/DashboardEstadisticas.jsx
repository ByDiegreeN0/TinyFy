import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BarChart from "../Common/BarChart";
import PieChart from "../Common/PieChart";
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
        <BarChart />
      </div>
      <div className="container-charts">
        <div className="Charts Grafica-line">
        </div>
        <div className="Charts Grafica-Pie">
          <PieChart />
        </div>
      </div>
    </div>
  );
};

export default DashboardEstadisticas;
