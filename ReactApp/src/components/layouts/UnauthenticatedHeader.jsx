import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/stylesLayouts/Header.css";

const UnauthenticatedHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const isHome = location.pathname === "/";
  const headerClass = isHome ? "HomeHeader" : "RegularHeader";

  return (
    <nav className={`${headerClass} Unauthenticated ${scrolled ? "scrolled" : ""}`}>
      <Link to="/" className="Nav-Logo"></Link>
      <button className="Menu-Button" onClick={toggleMenu}>
        <div className={`menuBarra ${menuOpen ? "open" : ""}`}>
          <span className={`fila1 ${menuOpen ? "fila1Animation" : ""}`}></span>
          <span className={`fila2 ${menuOpen ? "fila2Animation" : ""}`}></span>
          <span className={`fila3 ${menuOpen ? "fila3Animation" : ""}`}></span>
        </div>
      </button>
      <ul className={`Nav-List ${menuOpen ? "open" : ""}`}>
        <li className="Nav-Item">
          <Link to="/" onClick={toggleMenu} className="transitionBorder">Home</Link>
        </li>
        <li className="Nav-Item">
          <Link to="/Signin" onClick={toggleMenu} className="transitionBorder">Sign in</Link>
        </li>
        <li className="Nav-Item">
          <Link to="/Signup" onClick={toggleMenu} className="transitionBorder">Sign up</Link>
        </li>
      </ul>
    </nav>
  );
};

export default UnauthenticatedHeader;