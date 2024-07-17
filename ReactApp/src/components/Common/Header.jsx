import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Logo_Negro.svg";
import "./Header.css";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={`Nav ${scrolled ? "scrolled" : ""} animate-fade-down animate-once animate-duration-1000 animate-ease-in-out animate-normal animate-fill-both`}>
      <Link to="/">
        <img
          src={logo}
          alt="Logo"
          className="Nav-Logo "
        />
      </Link>
      <button className="Menu-Button" onClick={toggleMenu}>
        <span className="Menu-Icon">&#9776;</span>
      </button>
      <ul className={`Nav-List ${menuOpen ? "open" : ""}`}>
        <li className="Nav-Item">
          <Link to="/" onClick={toggleMenu}>
            Home
          </Link>
        </li>
        <li className="Nav-Item">
          <Link to="/Signin" onClick={toggleMenu}>
            Sign-in
          </Link>
        </li>
        <li className="Nav-Item">
          <Link to="/Signup" onClick={toggleMenu}>
            Sign-up
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
