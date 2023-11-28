import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.scss";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setShowLogout(true);
    }
  }, [navigate]);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setShowLogout(false);
    navigate("/");
  };
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
        {showLogout && (
          <li className="navbar__items__navi">
            <button onClick={handleLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
