import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
import './components/styles/index.css';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const storedAuth = localStorage.getItem('isAuthenticated');
        if (storedAuth === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

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
    };

    const showSessionPrompt = () => {
        const keepSession = window.confirm('¿Desea mantener la sesión iniciada?');
        if (keepSession) {
            localStorage.setItem('isAuthenticated', 'true');
        } else {
            sessionStorage.setItem('isAuthenticated', 'true');
        }
    };

    return (
        <>
            <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
            <PageLoader>
                <Routes>
                    <Route path="/" element={<Home />} />
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
                        element={isAuthenticated ? <DashboardLinks /> : <Navigate to="/Signin" />} 
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
                    <Route path='/TerminosYCondiciones' element={<TerminosYCondiciones />} />
                </Routes>
            </PageLoader>
        </>
    );
};

export default App;