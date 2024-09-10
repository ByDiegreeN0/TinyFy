import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Svg/Logos/TInyFyLogoNombreBlanco.svg";
import "../styles/stylesLayouts/Footer.css";

const Footer = () => {
  return (
    <footer>
      <p className="Derechos">
        <img src={logo} alt="Logo" className="Footer-Logo" />
        <span>&copy; All rights reserved</span>
      </p>
      <div className="info-footer contact-info">
        <h3>Contact</h3>
        <p>Address: Diego's House, Bogota, Colombia</p>
        <p>Telephone: +123456789</p>
        <p>Email: TrujisCompanys@trujis.com</p>
      </div>
      <div className="info-footer useful-links">
        <h3>Useful links</h3>
        <ul>
          <li>
            <Link to="/acerca-de">About us</Link>
          </li>
          <li>
            <Link to="/terminosycondiciones">Terms and conditions</Link>
          </li>
          <li>
            <Link to="/privacidad">Privacy Policy</Link>
          </li>
          <li>
            <Link to="/faq">FAQ</Link>
          </li>
          <li>
            <Link to="/contacto">Contact</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
