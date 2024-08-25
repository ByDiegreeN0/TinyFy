import React, { useState, useEffect } from 'react';
import logo from "../../assets/Svg/Logos/LoadingAnimated.svg";
import '../styles/stylesCommon/LoadingScreen.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const forceReflow = () => {
      const svg = document.querySelector('.logo-container svg');
      if (svg) {
        svg.style.animation = 'none';
        svg.offsetHeight; 
        svg.style.animation = null;
      }
    };
    setKey(prevKey => prevKey + 1);
    setTimeout(forceReflow, 50);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`loading-screen ${loading ? 'loading' : 'loaded'}`}>
      {loading ? (
        <div className="loading-content">
          <div className="logo-container">
            <object key={key} type="image/svg+xml" data={logo}>
              Tu navegador no soporta SVG
            </object>
          </div>
        </div>
      ) : (
        <div className="loaded-content">
          <h1>Bienvenido a TinyFy!</h1>
          <p>La carga ha finalizado.</p>
        </div>
      )}
    </div>
  );
}

export default App;