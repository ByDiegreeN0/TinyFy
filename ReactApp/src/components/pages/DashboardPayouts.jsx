import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/stylesPages/DashboardPayouts.css";

const DashboardPayouts = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') || sessionStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/Signin');
    }
  }, [navigate]);

  return (
    <div className="dashboard">
      <div className='tituloDash'>Bienvenido al Dashboard de Payouts</div>
    </div>
  );
};

export default DashboardPayouts;