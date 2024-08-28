import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import SignIn from './components/pages/Signin';
import SignUp from './components/pages/Signup';
import Header from './components/layouts/Header';
import Home from './components/pages/Home';
import DashboardLinks from './components/pages/DashboardLinks';
import DashboardReferrals from './components/pages/DashboardReferrals';
import DashboardPayouts from './components/pages/DashboardPayouts';
import DashboardSupport from './components/pages/DashboardSupport';
import PageLoader from './components/Common/PageLoader';
import TerminosYCondiciones from './components/Common/TerminosCondiciones';
import UserEditForm from './components/pages/UserEditForm';
import PasswordRecovery from './components/pages/PasswordRecovery';
import logo from './assets/Svg/Logos/TInyFyLogoNombreBlanco.svg'; // Importa el logo correctamente
import './components/styles/index.css';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    const title = "TinyFy";
    const description = "TinyFy es un acortador de URLs innovador que integra estratégicamente anuncios publicitarios. Permite a los usuarios generar enlaces cortos personalizados que muestran anuncios relevantes antes de redirigir al destino final. Los ingresos por publicidad se comparten con los usuarios, incentivando su uso. Con un enfoque en la seguridad, privacidad y desempeño óptimo, TinyFy facilita la gestión eficiente de enlaces en plataformas digitales.";

    useEffect(() => {
        const checkAuthStatus = () => {
            const storedAuth = localStorage.getItem('isAuthenticated') === 'true' || sessionStorage.getItem('isAuthenticated') === 'true';
            setIsAuthenticated(storedAuth);
            setIsLoading(false);

            if (storedAuth && location.pathname === '/') {
                navigate('/dashboardlinks');
            }
        };

        checkAuthStatus();
    }, [navigate, location.pathname]);

    const handleLogin = () => {
        setIsAuthenticated(true);
        showSessionPrompt();
    };

    const handleRegister = () => {
        setIsAuthenticated(true);
        showSessionPrompt();
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated');
        sessionStorage.removeItem('isAuthenticated');
        navigate('/');
    };

    const showSessionPrompt = () => {
        const keepSession = window.confirm('¿Desea mantener la sesión iniciada?');
        if (keepSession) {
            localStorage.setItem('isAuthenticated', 'true');
        } else {
            sessionStorage.setItem('isAuthenticated', 'true');
        }
    };

    if (isLoading) {
        return <PageLoader />;
    }

    return (
        <>
            <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
            <Routes>
                <Route 
                    path="/" 
                    element={
                        isAuthenticated ? 
                        <Navigate to="/dashboardlinks" /> : 
                        <Home title={title} description={description} logoSrc={logo} />
                    } 
                />
                <Route 
                    path="/Signin" 
                    element={isAuthenticated ? <Navigate to="/dashboardlinks" /> : <SignIn onLogin={handleLogin} />} 
                />
                <Route  
                    path="/Signup" 
                    element={isAuthenticated ? <Navigate to="/dashboardlinks" /> : <SignUp onRegister={handleRegister} />} 
                />
                <Route 
                    path="/dashboardlinks"   
                    element={isAuthenticated ? <DashboardLinks title={title} /> : <Navigate to="/Signin" />} 
                />
                <Route 
                    path="/dashboardreferrals"   
                    element={isAuthenticated ? <DashboardReferrals /> : <Navigate to="/Signin" />} 
                />
                <Route 
                    path="/dashboardpayouts"   
                    element={isAuthenticated ? <DashboardPayouts /> : <Navigate to="/Signin" />} 
                />
                <Route 
                    path="/dashboardsupport"   
                    element={isAuthenticated ? <DashboardSupport /> : <Navigate to="/Signin" />} 
                />
                <Route 
                    path="/edit-profile"   
                    element={isAuthenticated ? <UserEditForm /> : <Navigate to="/Signin" />} 
                />
                <Route 
                    path='/passwordRecovery'
                    element={<PasswordRecovery/>}
                />
                <Route path='/TerminosYCondiciones' element={<TerminosYCondiciones />} />
            </Routes>
        </>
    );
};

export default App;
