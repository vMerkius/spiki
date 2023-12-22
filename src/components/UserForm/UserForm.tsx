import React, { useEffect, useState } from "react";
import Login from "./Login";
import Register from "./Register";
import "./user-form.scss";
import { jwtDecode } from "jwt-decode";

const UserForm: React.FC = () => {
  const [loggingIn, setLoggingIn] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) return;
    const decodedToken: any = jwtDecode(token!);
    const id = decodedToken.userId;
    if (id > 0) {
      window.location.href = `/user-courses/${id}`;
    }
  }, []);
  return (
    <div className="logging">
      <div
        className={`logging__header ${
          loggingIn ? "logging__header--login" : "logging__header--register"
        }`}
      >
        {loggingIn ? (
          <h1>Witaj z powrotem</h1>
        ) : (
          <h1>Pierwszy raz? Zarejestruj się</h1>
        )}
      </div>
      <div
        className={`logging__user-form ${
          loggingIn
            ? "logging__user-form--login"
            : "logging__user-form--register"
        }
    }`}
      >
        <div className="logging__user-form__buttons">
          <button
            className={`logging__user-form__buttons__btn logging__user-form__buttons__btn--right ${
              loggingIn ? "btn--active" : ""
            }`}
            onClick={() => {
              setLoggingIn(true);
            }}
          >
            Zaloguj się
          </button>
          <button
            className={`logging__user-form__buttons__btn
            logging__user-form__buttons__btn--left
           ${!loggingIn ? "btn--active" : ""}`}
            onClick={() => {
              setLoggingIn(false);
            }}
          >
            Zarejestruj
          </button>
        </div>

        {loggingIn ? <Login /> : <Register />}
      </div>
    </div>
  );
};

export default UserForm;
