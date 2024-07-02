import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import RegistroUsuario from './components/Auth/RegistroUsuario';
import Header from './components/Common/Header';
import Home from './components/shared/Home';
import './index.css';

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
