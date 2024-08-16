import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import logo from "../../assets/Svg/Logos/TInyFyLogoNombreBlanco.svg";
import Footer from "../layouts/Footer";
import "../styles/stylesUtils/shape-divider1036.css";
import "../styles/stylesUtils/shapedividers_com-3875.css";
import "../styles/stylesPages/Home.css";

const HomeContent = ({ title, description, logoSrc }) => (
  <div className="home-content shapedividers_com-3875">
  <div className="description animationFade">
    <h1 className="highlight">Bienvenidos</h1> 
    <h1 className="title">{title}</h1> 
    <p className="description_p">{description}</p>
    <BotonsHome />
  </div>
  <img src={logoSrc} alt="Logo" className="home-logo animationFade" />
</div>

);

HomeContent.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  logoSrc: PropTypes.string.isRequired,
};

const BotonsHome = () => (
  <div className="buttons">
    <Link to="/Signin" className="button primary">
      Iniciar Sesión
    </Link>
    <Link to="/Signup" className="button secondary">
      Registro
    </Link>
  </div>
);

const Features = () => (
  <div className="features shapedividers_com-1036">
    <h2 className="title-features">Características</h2>
    <div className="container-caracteristicas animationFlip">
      <div className="card">
        <div className="card-content">
          <h3>Acortamiento rápido y fácil de URLs</h3>
          <p className="paragraph-features animationFade">
            TinyFy permite acortar URLs de forma rápida y sencilla. Con una
            interfaz intuitiva, cualquier usuario puede transformar enlaces
            largos en URLs cortas y manejables en segundos, perfectas para
            compartir en redes sociales y correos electrónicos.
          </p>
        </div>
      </div>
      <div className="card">
        <div className="card-content">
          <h3>Estadísticas detalladas de rendimiento de los enlaces</h3>
          <p className="paragraph-features animationFade">
            TinyFy ofrece herramientas analíticas completas que muestran el
            número de clics, la ubicación geográfica de los visitantes,
            dispositivos utilizados y fuentes de tráfico. Estas estadísticas
            detalladas ayudan a entender el rendimiento de los enlaces y a
            optimizar estrategias de marketing.
          </p>
        </div>
      </div>
      <div className="card">
        <div className="card-content">
          <h3>Seguridad y privacidad de datos</h3>
          <p className="paragraph-features animationFade">
            TinyFy prioriza la seguridad y privacidad de tus datos con medidas
            avanzadas de encriptación y cumplimiento de normativas
            internacionales. Garantizamos que toda la información personal se
            maneje de manera segura y responsable, protegiéndola contra accesos
            no autorizados.
          </p>
        </div>
      </div>
    </div>
  </div>
);

const Home = () => {
  const title = "TinyFy";
  const description = "TinyFy es un acortador de URLs innovador que integra estratégicamente anuncios publicitarios. Permite a los usuarios generar enlaces cortos personalizados que muestran anuncios relevantes antes de redirigir al destino final. Los ingresos por publicidad se comparten con los usuarios, incentivando su uso. Con un enfoque en la seguridad, privacidad y desempeño óptimo, TinyFy facilita la gestión eficiente de enlaces en plataformas digitales.";

  return (
    <div className="home-container">
      <HomeContent title={title} description={description} logoSrc={logo} />
      <Features />
      <Footer />
    </div>
  );
};

export default Home;