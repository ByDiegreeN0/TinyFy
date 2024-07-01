import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Home.css';
import logo from '../../assets/images/Logo_home.svg';

const HomeContent = ({ title, description, logoSrc }) => (
    <div className="home-content">
        <div className="Inicio">
            <h1 className="title">
                Bienvenidos a <span className="highlight">{title}</span>
            </h1>
            <p className="description">
                {description}
            </p>
            <div className="buttons">
                <Link to="/login" className="button primary">Iniciar Sesión</Link>
                <Link to="/Registro-usuario" className="button secondary">Registro</Link>
            </div>
        </div>
        <img src={logoSrc} alt="Logo" className="home-logo" />
    </div>
);

HomeContent.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    logoSrc: PropTypes.string.isRequired,
};

const Home = () => {
    const title = 'CarlitosApp';
    const description = `CarlitosApp es un acortador de URLs innovador que integra estratégicamente anuncios publicitarios. Permite a los usuarios generar enlaces cortos personalizados que muestran anuncios relevantes antes de redirigir al destino final. Los ingresos por publicidad se comparten con los usuarios, incentivando su uso. Con un enfoque en la seguridad, privacidad y desempeño óptimo, CarlitosApp facilita la gestión eficiente de enlaces en plataformas digitales.`;

    return (
        <div className="home">
            <HomeContent
                title={title}
                description={description}
                logoSrc={logo}
            />
        </div>
    );
};

export default Home;
