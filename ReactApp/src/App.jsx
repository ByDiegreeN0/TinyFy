import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import SignIn from './components/Auth/Signin';
import SignUp from './components/Auth/Signup';
import Header from './components/Common/Header';
import Home from './components/shared/Home';
import './index.css';

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
