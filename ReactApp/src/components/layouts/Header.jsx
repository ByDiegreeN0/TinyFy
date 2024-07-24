import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Logo_Negro.svg";
import "../styles/Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100; // Cambia 100 por la cantidad de píxeles que desees
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <nav className={`Nav ${scrolled ? "scrolled" : ""}`}>
      <Link to="/" className="logoShadow">
        <img src={logo} alt="CarlitosApp Logo" className="Nav-Logo" />
      </Link>
      <button className="Menu-Button" onClick={toggleMenu}></button>
      <ul className={`Nav-List ${menuOpen ? "open" : ""}`}>
        <li className="Nav-Item">
          <Link to="/" onClick={toggleMenu} className="transitionBorder">
            Home
          </Link>
        </li>
        <li className="Nav-Item">
          <Link to="/Signin" onClick={toggleMenu} className="transitionBorder">
            Sign in
          </Link>
        </li>
        <li className="Nav-Item">
          <Link to="/Signup" onClick={toggleMenu} className="transitionBorder">
            Sign up
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
