import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/DashboardLinks.css"

const DashboardSupport = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') || sessionStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/Signin');
    }
  }, [navigate]);

  return (
    <div className="dashboard">
      <div className='tituloDash'>Bienvenido al Dashboard de Support</div>
    </div>
  );
};

export default DashboardSupport;