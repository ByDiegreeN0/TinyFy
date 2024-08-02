import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/stylesPages/DashboardReferrals.css"

const DashboardReferrals = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') || sessionStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/Signin');
    }
  }, [navigate]);

  return (
    <div className="dashboard">
      <div className='tituloDash'>Bienvenido al Dashboard de Referrals</div>
    </div>
  );
};

export default DashboardReferrals;