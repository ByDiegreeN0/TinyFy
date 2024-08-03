import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../../assets/Svg/Logos/Logo_Negro.svg";
import "../styles/stylesLayouts/Footer.css";

const Footer = () => {
  return (
    <footer>
      <p className="Derechos">
        <img src={logo} alt="Logo" className="Footer-Logo" />
        <span className="Name-Footer">&copy; CarlitosApp 2024 </span>
        <span>Todos los derechos reservados</span>
      </p>
      <div className="info-footer contact-info">
        <h3>Contacto</h3>
        <p>Dirección: Casa de Diego, Bogota, Colombia</p>
        <p>Teléfono: +123456789</p>
        <p>Email: TrujisCompanys@trujis.com</p>
      </div>
      <div className="info-footer useful-links">
        <h3>Enlaces útiles</h3>
        <ul>
          <li><Link to="/acerca-de">Acerca de nosotros</Link></li>
          <li><Link to="/terminosycondiciones">Términos y condiciones</Link></li>
          <li><Link to="/privacidad">Política de privacidad</Link></li>
          <li><Link to="/faq">FAQ</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;