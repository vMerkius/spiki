import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.scss";
import UserIcon from "../../assets/user-icon.svg";
import { jwtDecode } from "jwt-decode";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [showUser, setShowUser] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [id, setId] = useState<number>(0);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log(token);
      const decode: any = jwtDecode(token);
      console.log(decode);
      setId(decode.userId);
      setShowUser(true);
    }
    setShowMore(false);
  }, [navigate]);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setShowUser(false);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar__bottom"></div>
      <ul className="navbar__items">
        <li className="navbar__items__navi">
          <Link to="/">Spiki</Link>
        </li>
        <div className="navbar__items__rest">
          <li className="navbar__items__navi">
            <button className="navi-btn" onClick={() => navigate("/")}>
              Home
            </button>
          </li>
          <li className="navbar__items__navi">
            <button className="navi-btn" onClick={() => navigate("/about")}>
              About
            </button>
          </li>
          <li className="navbar__items__navi">
            <button
              className="navi-btn"
              onClick={() => navigate("/dictionary")}
            >
              Słownik
            </button>
          </li>
          <li className="navbar__items__navi">
            <button className="navi-btn" onClick={() => navigate("/contact")}>
              Contact
            </button>
          </li>
          {showUser ? (
            <li className="navbar__items__navi">
              <button
                className="navbar__items__navi__more__btn user-btn"
                onClick={() => setShowMore(!showMore)}
              >
                <img src={UserIcon} alt="user" width="35px" />
              </button>
              {/* <>&darr;</> */}
              {showMore && (
                <div className="navbar__items__navi__more">
                  <Link to={`/user-details/${id}`}>Details</Link>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </li>
          ) : (
            <li className="navbar__items__navi">
              <Link to="/">Login</Link>
            </li>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
