import PropTypes from "prop-types";
import { Link } from "react-router-dom"; // Asegúrate de importar Link desde react-router-dom
import logo from "../../assets/Logo_home.svg";
import Footer from "../Common/Footer";
import "./Home.css";

const HomeContent = ({ title, description, logoSrc }) => (
  <div className="home-content ">
    <p className="description">
      <h1 className="title">
        {" "}
        Bienvenidos a <span className="highlight">{title}</span>
      </h1>
      <span className="description_p">
        {description}
      </span>
      <BotonsHome />
    </p>
    <img src={logoSrc} alt="Logo" className="home-logo" />
    <div class="custom-shape-divider-bottom-1721136608">
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
          opacity=".25"
          class="shape-fill"
        ></path>
        <path
          d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
          opacity=".5"
          class="shape-fill"
        ></path>
        <path
          d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
          class="shape-fill"
        ></path>
      </svg>
    </div>
  </div>
);

HomeContent.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  logoSrc: PropTypes.string.isRequired,
};

const BotonsHome = () => (
  <div className="buttons">
    <Link to="/login" className="button primary">
      Iniciar Sesión
    </Link>
    <Link to="/Registro-usuario" className="button secondary">
      Registro
    </Link>
  </div>
);

const Features = () => (
  <div className="features">
    <h2 className="title">Características</h2>
    <ul className="list">
      <li className="item">Acortamiento rápido y fácil de URLs</li>
      <li className="item">Integración de anuncios publicitarios relevantes</li>
      <li className="item">Modelo de ingresos compartidos</li>
      <li className="item">
        Estadísticas detalladas de rendimiento de los enlaces
      </li>
      <li className="item">Seguridad y privacidad de datos</li>
    </ul>
  </div>
);

const Benefits = () => (
  <div className="benefits">
    <h2>Beneficios</h2>
    <p>
      Genera ingresos adicionales mientras compartes tus enlaces. Disfruta de un
      servicio seguro y optimizado para el mejor rendimiento.
    </p>
  </div>
);

const Testimonials = () => (
  <div className="testimonials">
    <h2>Testimonios</h2>
    <blockquote>
      &quot;CarlitosApp ha revolucionado la forma en que comparto mis enlaces.
      ¡Muy recomendado!&quot;
      <cite>- Usuario Satisfecho</cite>
    </blockquote>
    <blockquote>
      &quot;La integración de publicidad es perfecta, no es intrusiva y genera
      ingresos.&quot;
      <cite>- Otro Usuario</cite>
    </blockquote>
  </div>
);

const CallToAction = () => (
  <div className="call-to-action">
    <h2>Únete a CarlitosApp hoy mismo</h2>
    <div className="buttons">
      <Link to="/Registro-usuario" className="button primary">
        Regístrate Ahora
      </Link>
      <Link to="/login" className="button secondary">
        Iniciar Sesión
      </Link>
    </div>
  </div>
);

const Home = () => {
  const title = "CarlitosApp";
  const description = `CarlitosApp es un acortador de URLs innovador que integra estratégicamente anuncios publicitarios. Permite a los usuarios generar enlaces cortos personalizados que muestran anuncios relevantes antes de redirigir al destino final. Los ingresos por publicidad se comparten con los usuarios, incentivando su uso. Con un enfoque en la seguridad, privacidad y desempeño óptimo, CarlitosApp facilita la gestión eficiente de enlaces en plataformas digitales.`;

  return (
    <div className="home-container">
      <HomeContent title={title} description={description} logoSrc={logo} />
    </div>
  );
};

export default Home;
