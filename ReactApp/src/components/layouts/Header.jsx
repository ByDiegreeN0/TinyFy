import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Logo_Negro.svg";
import TextWithBorder from "../../utils/TextWithBorder"; // Importa el componente TextWithBorder
import initScrollReveal from "../../utils/ScrollReveals";
import "../styles/Header.css";

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

  useEffect(() => {
    initScrollReveal(".headline", {
      origin: "top",
      distance: "50px",
      duration: 700,
      reset: true,
    });
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={`Nav ${scrolled ? "scrolled" : ""}`}>
      <Link to="/">
        <img src={logo} alt="Logo" className="Nav-Logo headline" />
      </Link>
      <button className="Menu-Button" onClick={toggleMenu}>
        <span className="Menu-Icon">&#9776;</span>
      </button>
      <ul className={`Nav-List ${menuOpen ? "open" : ""}`}>
        <li className="Nav-Item headline">
          <TextWithBorder>
            <Link to="/" onClick={toggleMenu} className="text-with-border">
              Home
            </Link>
          </TextWithBorder>
        </li>
        <li className="Nav-Item headline">
          <TextWithBorder>
            <Link to="/Signin" onClick={toggleMenu} className="text-with-border">
              Sign in
            </Link>
          </TextWithBorder>
        </li>
        <li className="Nav-Item headline">
          <TextWithBorder>
            <Link to="/Signup" onClick={toggleMenu} className="text-with-border">
              Sign up
            </Link>
          </TextWithBorder>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
