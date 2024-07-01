import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Common/Header';
import Login from './components/Auth/Login';
import RegistroUsuario from './components/Auth/RegistroUsuario';
import Home from './components/shared/Home';

const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registro-usuario" element={<RegistroUsuario />} /> {/* Ruta en minúsculas y con guion */}
            </Routes>
        </Router>
    );
};

export default App;
