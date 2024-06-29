import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Common/Header';
import Login from './components/Auth/Login';
import RegistroUsuario from './components/Auth/RegistroUsuario';
import Home from './components/Home';

const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/Registro-usuario" element={<RegistroUsuario />} />
            </Routes>
        </Router>
    );
};

export default App;

