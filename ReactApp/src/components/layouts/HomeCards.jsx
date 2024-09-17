import PropTypes from "prop-types";
import '../styles/stylesLayouts/HomeCards.css';
import "../styles/stylesUtils/shapedividers_com-3875.css";

const HomeCards = ({ title }) => {
    return (
        <div className="features">
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
};

HomeCards.propTypes = {
    title: PropTypes.string.isRequired,
};

export default HomeCards;
