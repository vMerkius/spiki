import { useState } from "react";
import { useNavigate } from "react-router";
import { addUserAPI } from "../../server/server";

const genders = ["M", "W"];
const Register = () => {
  const navigate = useNavigate();
  const [section, setSection] = useState(1);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    gender: "",
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
    console.log(registerData);
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
          <label>
            Nazwa:
            <input
              type="name"
              name="name"
              value={registerData.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={registerData.email}
              onChange={handleChange}
            />
          </label>
          <label>
            Data urodzenia:
            <input
              type="date"
              name="dateOfBirth"
              value={registerData.dateOfBirth}
              onChange={handleChange}
            />
          </label>
          <label>
            Płeć:
            <select
              className="language-select"
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
          </label>
          <label>
            Kraj:
            <input
              type="text"
              name="country"
              value={registerData.country}
              onChange={handleChange}
            />
          </label>
        </form>
      ) : (
        <form className="form-display">
          <label>
            Image URL:
            <input
              type="text"
              name="imageUrl"
              value={registerData.imageUrl}
              onChange={handleChange}
            />
            {registerData.imageUrl && (
              <img
                className="form-display__img"
                width="100px"
                src={registerData.imageUrl}
                alt="user avatar"
              ></img>
            )}
          </label>
          <label>
            Hasło:
            <input
              type="password"
              name="password"
              value={registerData.password}
              onChange={handleChange}
            />
            {passwordError && <p className="error-info">{passwordError}</p>}
          </label>

          <label>
            Powtórz hasło:
            <input
              type="password"
              name="confirmPassword"
              value={registerData.confirmPassword}
              onChange={handleChange}
            />
            {confirmPasswordError && (
              <p className="error-info">{confirmPasswordError}</p>
            )}
          </label>

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