import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import SignIn from './components/pages/Signin';
import SignUp from './components/pages/Signup';
import Header from './components/layouts/Header';
import Home from './components/pages/Home';
import './components/styles/index.css';

const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Signin" element={<SignIn />} />
                <Route path="/Signup" element={<SignUp />} /> {/* Ruta en minúsculas y con guion */}
            </Routes>
        </Router>
    );
};

export default App;
