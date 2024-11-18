import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoSrc from "../../assets/Svg/Logos/TInyFyLogoNombreBlancoLado.svg";
import "../styles/stylesLayouts/HeaderInter.css";

const HeaderInter = () => {
  const [countdown, setCountdown] = useState(5);
  const [targetUrl, setTargetUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  // Obtener el shortLink de la URL actual
  const shortLink = window.location.pathname.slice(1);

  // Efecto para obtener la URL original
  useEffect(() => {
    const fetchOriginalUrl = async () => {
      try {
        const response = await fetch(`http://localhost:8000/links`);
        if (!response.ok) {
          throw new Error('Error al obtener el enlace');
        }
        const links = await response.json();
        
        // Buscar el link que coincida con el shortLink
        const matchingLink = links.find(link => link.LinkShortUrl === shortLink);
        
        if (matchingLink) {
          setTargetUrl(matchingLink.LinkUrl);
        } else {
          throw new Error('Enlace no encontrado');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOriginalUrl();
  }, [shortLink]);

  // Efecto para el countdown
  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  // Función para manejar la redirección
  const handleContinue = async () => {
    if (targetUrl) {
      // Aquí podrías registrar el click si es necesario
      try {
        await fetch('http://localhost:8000/click', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ LinkId: targetUrl.LinkId }),
        });
      } catch (error) {
        console.error('Error al registrar el click:', error);
      }

      // Redirigir al usuario
      window.location.href = targetUrl.startsWith('http') ? targetUrl : `https://${targetUrl}`;
    }
  };

  return (
    <header className="headerInter">
      <div className="logo">
        <Link to="/">
          <img src={LogoSrc} alt="TinyFy Logo" className="logo-svg" />
        </Link>
      </div>
      <div className="header-controls">
        <Link to="/Signup" className="register-link">
          SignUp
        </Link>
        {isLoading ? (
          <button className="continue-button" disabled>
            Cargando...
          </button>
        ) : error ? (
          <button className="continue-button" disabled>
            {error}
          </button>
        ) : (
          <button
            className="continue-button"
            disabled={countdown > 0}
            onClick={handleContinue}
          >
            {countdown > 0 
              ? `Espera ${countdown} segundos...` 
              : 'Continuar a tu enlace'}
          </button>
        )}
      </div>
    </header>
  );
};

export default HeaderInter;