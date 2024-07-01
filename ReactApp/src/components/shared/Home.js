import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import logo from '../../assets/images/Logo_home.svg';

const Home = () => {
    return (
        <div className="home">
            <div className="home-content">
                <div className="Inicio">
                    <h1 className="title">
                        Bienvenidos a <span className="highlight">CarlitosApp</span>
                    </h1>
                    <p className="description">
                    CarlitosApp es un acortador de URLs innovador que integra estratégicamente anuncios publicitarios. Permite a los usuarios generar enlaces cortos personalizados que muestran anuncios relevantes antes de redirigir al destino final. Los ingresos por publicidad se comparten con los usuarios, incentivando su uso. Con un enfoque en la seguridad, privacidad y desempeño óptimo, CarlitosApp facilita la gestión eficiente de enlaces en plataformas digitales.
                    </p>
                    <div className="buttons">
                        <Link to="/login" className="button primary">Iniciar Sesión</Link>
                        <Link to="/Registro-usuario" className="button secondary">Registro</Link>
                    </div>
                </div>
                <img src={logo} alt="Logo" className="home-logo" />
            </div>
        </div>
    );
};

export default Home;
