import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import "./landing-page.scss";

const LandingPage: React.FC = () => {
  const [loggingIn, setLoggingIn] = useState(true);
  const handleLogin = () => {
    return;
  };
  const handleRegister = () => {
    return;
  };

  return (
    <div className="landing-page">
      <div className="landing-page__buttons">
        <button
          className={`landing-page__buttons__btn landing-page__buttons__btn--right ${
            loggingIn ? "btn--active" : ""
          }`}
          onClick={() => {
            setLoggingIn(true);
          }}
        >
          Sign in
        </button>
        <button
          className={`landing-page__buttons__btn
          landing-page__buttons__btn--left
           ${!loggingIn ? "btn--active" : ""}`}
          onClick={() => {
            setLoggingIn(false);
          }}
        >
          Sign up
        </button>
      </div>

      {loggingIn ? <Login /> : <Register />}
    </div>
  );
};

export default LandingPage;
