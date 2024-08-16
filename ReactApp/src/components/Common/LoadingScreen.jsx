import React, { useState, useEffect } from 'react';
import logo from "../../assets/Svg/Logos/TInyFyLogo.svg";
import '../styles/stylesCommon/LoadingScreen.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`loading-screen ${loading ? 'loading' : 'loaded'}`}>
      {loading ? (
        <div className="loading-content">
          <div className="logo-container">
            <img src={logo} alt="Logo de TinyFy" />
          </div>
          <div className="loading-animation">
            <div className="spinner"></div>
          </div>\
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