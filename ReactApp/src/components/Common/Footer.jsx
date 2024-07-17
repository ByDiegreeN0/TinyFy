import logo from "../../assets/Logo_Nombre_negro.svg";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <img src={logo} alt="Logo" className="Footer-Logo" />
      <p className="Derechos">
        <span className="Name-Footer">CarlitosApp 2024 </span>
        <br />
        <span>© Todos los derechos reservados</span>
      </p>
    </footer>
  );
};

export default Footer;
