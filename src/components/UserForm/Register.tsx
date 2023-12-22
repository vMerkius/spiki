import { useState } from "react";
import { useNavigate } from "react-router";
import { addUserAPI } from "../../server/server";
import CountryDropdown from "./CountryDropdown";

const genders = ["M", "W"];
const Register = () => {
  const [section, setSection] = useState(1);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    gender: "M",
    country: "",
    imageUrl: "",
  });
  const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setRegisterData({
      ...registerData,
      [event.target.name]: event.target.value,
    });
    if (event.target.name === "password") {
      if (!event.target.value.match(regex)) {
        setPasswordError(
          "Hasło musi zawierać co najmniej 8 znaków, w tym przynajmniej jedną wielką literę, małą literę, cyfrę i znak specjalny."
        );
      } else {
        setPasswordError("");
      }
      if (event.target.value.length <= 5) {
        setPasswordError("");
      }
    }

    if (event.target.name === "confirmPassword") {
      if (event.target.value !== registerData.password) {
        setConfirmPasswordError("Hasła nie są zgodne.");
      } else {
        setConfirmPasswordError("");
      }
    }
  };
  const handleRegister = async () => {
    console.log(registerData);

    if (
      passwordError ||
      confirmPasswordError ||
      registerData.name === "" ||
      registerData.email === "" ||
      registerData.dateOfBirth === "" ||
      registerData.gender === "" ||
      registerData.country === "" ||
      registerData.password === "" ||
      registerData.confirmPassword === ""
    ) {
      alert("Wypełnij wszystkie pola formularza.");
      return;
    } else {
      const { confirmPassword, ...dataToSend } = registerData;
      const response = await addUserAPI(dataToSend);
      if (response === "Successfully created") {
        window.location.reload();
      } else {
        console.error("Błąd podczas rejestracji:", response.data);
      }
    }
  };

  return (
    <div className="register">
      {section === 1 ? (
        <form className="form-display">
          <input
            className="form-display__input"
            type="name"
            name="name"
            value={registerData.name}
            onChange={handleChange}
            placeholder="Nazwa użytkownika"
          />

          <input
            className="form-display__input"
            type="email"
            name="email"
            value={registerData.email}
            onChange={handleChange}
            placeholder="Email"
          />

          <input
            className="form-display__input"
            type="date"
            name="dateOfBirth"
            value={registerData.dateOfBirth}
            onChange={handleChange}
          />

          <select
            className="language-select form-display__input"
            name="gender"
            value={registerData.gender}
            onChange={handleChange}
          >
            {genders.map((gender, index) => (
              <option key={index} value={gender}>
                {gender === "M" ? "Mężczyzna" : "Kobieta"}{" "}
              </option>
            ))}
          </select>

          <CountryDropdown
            value={registerData.country}
            onChange={handleChange}
          ></CountryDropdown>
        </form>
      ) : (
        <form className="form-display">
          <input
            className="form-display__input"
            type="text"
            name="imageUrl"
            value={registerData.imageUrl}
            onChange={handleChange}
            placeholder="Url do zdjęcia"
          />
          {registerData.imageUrl && (
            <img
              className="form-display__img"
              width="100px"
              src={registerData.imageUrl}
              alt="user avatar"
            ></img>
          )}

          <input
            className="form-display__input"
            type="password"
            name="password"
            value={registerData.password}
            onChange={handleChange}
            placeholder="Hasło"
          />
          {passwordError && <p className="error-info">{passwordError}</p>}

          <input
            className="form-display__input"
            type="password"
            name="confirmPassword"
            value={registerData.confirmPassword}
            onChange={handleChange}
            placeholder="Potwierdź hasło"
          />
          {confirmPasswordError && (
            <p className="error-info">{confirmPasswordError}</p>
          )}

          <button
            className="btn-submit"
            type="button"
            onClick={() => {
              handleRegister();
            }}
          >
            Register
          </button>
        </form>
      )}
      <div className="logging__register__buttons">
        <button
          className={`logging__register__buttons__btn ${
            section === 1 ? "logging__register__buttons__btn--active" : ""
          } `}
          onClick={() => setSection(1)}
        >
          1
        </button>
        <button
          className={`logging__register__buttons__btn ${
            section === 2 ? "logging__register__buttons__btn--active" : ""
          }`}
          onClick={() => setSection(2)}
        >
          2
        </button>
      </div>
    </div>
  );
};
export default Register;
