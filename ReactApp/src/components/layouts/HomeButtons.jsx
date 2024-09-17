import { Link } from 'react-router-dom'; 
import "../styles/stylesLayouts/HomeButtons.css"

const HomeButtons = () => (
    <div className="buttons">
        <Link to="/signin" className="button primary">
            Sign In
        </Link>
        <Link to="/signup" className="button secondary">
            Sign Up
        </Link>
    </div>
);

export default HomeButtons;
