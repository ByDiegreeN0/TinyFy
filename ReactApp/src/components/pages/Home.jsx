import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import logo from "../../assets/Svg/Logos/TInyFyLogoNombreBlanco.svg";
import Footer from "../layouts/Footer";
import "../styles/stylesUtils/shapedividers_com-3875.css";
import "../styles/stylesPages/Home.css";

// HomeContent Component
const HomeContent = ({ title, description, logoSrc }) => (
  <div className="home-content shapedividers_com-3875">
    <div className="description animationFade">
      <h1 className="highlight">Welcome To</h1>
      <h1 className="title">{title}</h1>
      <p className="description_p">{description}</p>
      <BotonsHome />
    </div>
    <img src={logoSrc} alt="Logo" className="home-logo animationFade" />
  </div>
);

HomeContent.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  logoSrc: PropTypes.string.isRequired,
};

// BotonsHome Component
const BotonsHome = () => (
  <div className="buttons">
    <Link to="/signin" className="button primary">
      Sign In
    </Link>
    <Link to="/signup" className="button secondary">
      Sign Up
    </Link>
  </div>
);

// Features Component
const Features = ({ title }) => (
  <div className="features shapedividers_com-1036">
    <h2 className="title-features">Features</h2>
    <div className="container-caracteristicas animationFlip">
      <div className="card">
        <div className="card-content">
          <h3>Quick and easy URL shortening</h3>
          <p className="paragraph-features animationFade">
            {title} allows you to shorten URLs quickly and easily. With an
            intuitive interface, any user can transform long URLs into short
            and manageable ones in seconds, perfect for sharing on social
            networks and emails.
          </p>
        </div>
      </div>
      <div className="card">
        <div className="card-content">
          <h3>Detailed link performance statistics</h3>
          <p className="paragraph-features animationFade">
            {title} offers comprehensive analytical tools that show the
            number of clicks, the geographical location of visitors, devices
            used, and traffic sources. These detailed statistics help you
            understand link performance and optimize marketing strategies.
          </p>
        </div>
      </div>
      <div className="card">
        <div className="card-content">
          <h3>Data security and privacy</h3>
          <p className="paragraph-features animationFade">
            {title} prioritizes the security and privacy of your data with
            advanced encryption measures and international compliance. We
            ensure that all personal information is handled safely and
            responsibly, protecting it against unauthorized access.
          </p>
        </div>
      </div>
    </div>
  </div>

);

Features.propTypes = {
  title: PropTypes.string.isRequired,
};

// Home Component
const Home = () => {
  const title = "TinyFy";
  const description =
    "TinyFy is an innovative URL shortener that strategically integrates banner ads. It allows users to generate custom short links that display relevant ads before redirecting to the final destination. Advertising revenue is shared with users, encouraging their use. With a focus on security, privacy, and optimal performance, TinyFy facilitates efficient link management on digital platforms.";

  return (
    <div className="home-container">
      <HomeContent title={title} description={description} logoSrc={logo} />
      <Features title={title} />
      <Footer />
    </div>
  );
};

export default Home;
