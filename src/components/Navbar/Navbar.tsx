import React from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <ul className="navbar__items">
        <li className="navbar__items__navi">
          <Link to="/">Home</Link>
        </li>
        <li className="navbar__items__navi">
          <Link to="/about">About</Link>
        </li>
        <li className="navbar__items__navi">
          <Link to="/dictionary">Słownik</Link>
        </li>
        <li className="navbar__items__navi">
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
