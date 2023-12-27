import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.scss";
import UserIcon from "../../assets/user-icon.svg";
import { jwtDecode } from "jwt-decode";
import logo from "../../assets/logo.svg";
import { useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const navigate = useNavigate();
  const [showUser, setShowUser] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [id, setId] = useState<number>(0);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decode: any = jwtDecode(token);
      console.log(decode);
      if (
        decode.userId !== pathSegments[2] &&
        (pathSegments[1] === "user-courses" ||
          pathSegments[1] === "user-details")
      ) {
        navigate(`/user-courses/${decode.userId}`);
      }
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
        <li
          className="navbar__items__navi"
          style={{ display: "flex", gap: "5px" }}
        >
          <img src={logo} alt="logo" width="30px" />
          <Link
            className="navbar__items__navi__logo"
            to="/"
            onClick={() => {
              setActiveButton(null);
            }}
          >
            Spiki
          </Link>
        </li>
        <div className="navbar__items__rest">
          <li className="navbar__items__navi">
            <button
              className={`navi-btn ${
                activeButton === "about" ? "navi-btn--active" : ""
              }`}
              onClick={() => {
                navigate("/about");
                setActiveButton("about");
              }}
            >
              O stronie
            </button>
          </li>
          <li className="navbar__items__navi">
            <button
              className={`navi-btn ${
                activeButton === "dictionary" ? "navi-btn--active" : ""
              }`}
              onClick={() => {
                navigate("/dictionary");
                setActiveButton("dictionary");
              }}
            >
              Słownik
            </button>
          </li>
          <li className="navbar__items__navi">
            <button
              className={`navi-btn ${
                activeButton === "contact" ? "navi-btn--active" : ""
              }`}
              onClick={() => {
                navigate("/contact");
                setActiveButton("contact");
              }}
            >
              Kontakt
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
              {showMore && (
                <div className="navbar__items__navi__more">
                  <Link
                    className="navbar__items__navi__more__details"
                    to={`/user-details/${id}`}
                  >
                    Szczegóły
                  </Link>
                  <button
                    className="navbar__items__navi__more__logout"
                    onClick={handleLogout}
                  >
                    Wyloguj
                  </button>
                </div>
              )}
            </li>
          ) : (
            <li className="navbar__items__navi">
              <button
                className={`navi-btn ${
                  activeButton === "login" ? "navi-btn--active" : ""
                }`}
                onClick={() => {
                  navigate("/");
                  setActiveButton("login");
                }}
              >
                Login
              </button>
            </li>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
