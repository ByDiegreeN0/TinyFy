import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/stylesPages/DashboardSupport.css";
import useTokenValidation from "../hooks/useTokenValidation";

const DashboardSupport = () => {
  const navigate = useNavigate();
  useTokenValidation();

  return (
    <div className="dashboard">
      <div className='tituloDash'>Bienvenido al Dashboard de Support</div>
    </div>
  );
};

export default DashboardSupport;