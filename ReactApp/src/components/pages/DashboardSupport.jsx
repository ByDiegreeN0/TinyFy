import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/stylesPages/DashboardSupport.css";

const DashboardSupport = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('accessToken');// token de authorization

  if (!token) {
    console.error("No token found");
    navigate("/Signin");
  }
  

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