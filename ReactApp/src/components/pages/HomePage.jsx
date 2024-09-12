import PropTypes from "prop-types";
import HomeButtons from '../layouts/HomeButtons'
import HomeCards from '../layouts/HomeCards'
import Footer from "../layouts/Footer";
import "../styles/stylesUtils/shapedividers_com-3875.css";
import "../styles/stylesPages/HomePage.css";


const HomePage = ({logoSrc}) => {

    return (
        <div className="home-container">
            <div className="home-content shapedividers_com-3875">
                <div className="description animationFade">
                    <h1 className="highlight">Welcome To</h1>
                    <h1 className="title">TiniFy</h1>
                    <p className="description_p">TinyFy is an innovative URL shortener that strategically integrates advertisements. It allows users to generate custom short links that display relevant ads before redirecting to the final destination. Advertising revenue is shared with users, encouraging its use. With a focus on security, privacy, and optimal performance, TinyFy makes efficient link management on digital platforms easier.</p>
                    <HomeButtons />
                </div>
                <img src={logoSrc} alt="Logo" className="home-logo animationFade" />
            </div>

            <HomeCards />
            <Footer />

        </div>

    )
}

HomePage.propTypes = {
    logoSrc: PropTypes.string.isRequired,
};



export default HomePage;



