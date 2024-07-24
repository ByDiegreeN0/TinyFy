import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './utils/divider.css'; 
import "./utils/TransitionBorder.css";
import "./utils/ImageShadow.css";
import "./utils/withFadeInOnScroll.css";
import "./utils/withFlipInOn.css";
import './components/styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


