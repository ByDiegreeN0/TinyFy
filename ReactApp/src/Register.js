import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './LogIn';
import reportWebVitals from './reportWebVitals';
import Register from './components/Register';

// Crear un root para React 18+
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderizar la aplicación
root.render(
  <React.StrictMode>
    <Register />
  </React.StrictMode>
);

// Para medir el rendimiento de tu aplicación
reportWebVitals();
