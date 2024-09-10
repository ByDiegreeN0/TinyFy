import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import logo from "../../assets/Svg/Logos/TInyFyLogoNombreBlanco.svg";
import Footer from "../layouts/Footer";
import "../styles/stylesUtils/shape-divider1036.css";
import "../styles/stylesUtils/shapedividers_com-3875.css";
import "../styles/stylesPages/Home.css";

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

const BotonsHome = () => (
  <div className="buttons">
    <Link to="/Signin" className="button primary">
      Sign in
    </Link>
    <Link to="/Signup" className="button secondary">
      Sign Up
    </Link>
  </div>
);

const Features = ({ title }) => (
  <div className="features shapedividers_com-1036">
    <h2 className="title-features">Characteristics</h2>
    <div className="container-caracteristicas animationFlip">
      <div className="card">
        <div className="card-content">
          <h3>Quick and easy URL shortening</h3>
          <p className="paragraph-features animationFade">
            {title} allows you to shorten URLs quickly and easily. With a
            intuitive interface, any user can transform links
            long URLs in short and manageable in seconds, perfect for
            Share on social networks and emails.
          </p>
        </div>
      </div>
      <div className="card">
        <div className="card-content">
          <h3>Detailed link performance statistics</h3>
          <p className="paragraph-features animationFade">
            {title} offers comprehensive analytical tools that show the
            number of clicks, the geographical location of visitors,
            devices used and traffic sources. These statistics
            Detailed information helps you understand link performance and
            optimize marketing strategies.
          </p>
        </div>
      </div>
      <div className="card">
        <div className="card-content">
          <h3>Data security and privacy</h3>
          <p className="paragraph-features animationFade">
            {title} prioritize the security and privacy of your data with measures
            advanced encryption and compliance
            international. We ensure that all personal information is
            handle it safely and responsibly, protecting it against access
            unauthorized.
          </p>
        </div>
      </div>
    </div>
  </div>
);

const Home = () => {
  const title = "TinyFy";
  const description =
    "TinyFy is an innovative URL shortener that strategically integrates banner ads. It allows users to generate custom short links that display relevant ads before redirecting to the final destination. Advertising revenue is shared with users, encouraging their use. With a focus on security, privacy and optimal performance, TinyFy facilitates efficient link management on digital platforms.";

  return (
    <div className="home-container">
      <HomeContent title={title} description={description} logoSrc={logo} />
      <Features title={title} />
      <Footer />
    </div>
  );
};

export default Home;
