import logo from "../../assets/Logo_Negro.svg";
import "../styles/Footer.css";

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
                <li><a href="/">Acerca de nosotros</a></li>
                <li><a href="/">Términos y condiciones</a></li>
                <li><a href="/">Política de privacidad</a></li>
                <li><a href="/">FAQ</a></li>
                <li><a href="/">Contacto</a></li>
            </ul>
        </div>
    </footer>
  );
};

export default Footer;