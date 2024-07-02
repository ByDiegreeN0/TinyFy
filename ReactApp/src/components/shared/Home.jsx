import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'; // Asegúrate de importar Link desde react-router-dom
import logo from '../../assets/Logo_home.svg';
import Footer from '../Common/Footer';
import './Home.css';

const HomeContent = ({ title, description, logoSrc }) => (
    <div className="home-content">
        <p className="description">
            <h1 className="title"> Bienvenidos a <span className="highlight">{title}</span></h1>
            {description}
            <BotonsHome/>
        </p>
        <img src={logoSrc} alt="Logo" className="home-logo" />
    </div>
);

HomeContent.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    logoSrc: PropTypes.string.isRequired,
};

const BotonsHome = () => (
    <div className="buttons">
        <Link to="/login" className="button primary">Iniciar Sesión</Link>
        <Link to="/Registro-usuario" className="button secondary">Registro</Link>
    </div>
);

const Features = () => (
    <div className="features">
        <h2 className='title'>Características</h2>
        <ul className='list'>
            <li className='item'>Acortamiento rápido y fácil de URLs</li>
            <li className='item'>Integración de anuncios publicitarios relevantes</li>
            <li className='item'>Modelo de ingresos compartidos</li>
            <li className='item'>Estadísticas detalladas de rendimiento de los enlaces</li>
            <li className='item'>Seguridad y privacidad de datos</li>
        </ul>
    </div>
);

const Benefits = () => (
    <div className="benefits">
        <h2>Beneficios</h2>
        <p>Genera ingresos adicionales mientras compartes tus enlaces. Disfruta de un servicio seguro y optimizado para el mejor rendimiento.</p>
    </div>
);

const Testimonials = () => (
    <div className="testimonials">
        <h2>Testimonios</h2>
        <blockquote>
            &quot;CarlitosApp ha revolucionado la forma en que comparto mis enlaces. ¡Muy recomendado!&quot;
            <cite>- Usuario Satisfecho</cite>
        </blockquote>
        <blockquote>
            &quot;La integración de publicidad es perfecta, no es intrusiva y genera ingresos.&quot;
            <cite>- Otro Usuario</cite>
        </blockquote>
    </div>
);

const CallToAction = () => (
    <div className="call-to-action">
        <h2>Únete a CarlitosApp hoy mismo</h2>
        <div className="buttons">
            <Link to="/Registro-usuario" className="button primary">Regístrate Ahora</Link>
            <Link to="/login" className="button secondary">Iniciar Sesión</Link>
        </div>
    </div>
);

const Home = () => {
    const title = 'CarlitosApp';
    const description = `CarlitosApp es un acortador de URLs innovador que integra estratégicamente anuncios publicitarios. Permite a los usuarios generar enlaces cortos personalizados que muestran anuncios relevantes antes de redirigir al destino final. Los ingresos por publicidad se comparten con los usuarios, incentivando su uso. Con un enfoque en la seguridad, privacidad y desempeño óptimo, CarlitosApp facilita la gestión eficiente de enlaces en plataformas digitales.`;

    return (
        <div className="home-container" >
            <HomeContent
                title={title}
                description={description}
                logoSrc={logo}
            />
        </div>
    );
};

export default Home;
