import { useState } from "react";
import { useNavigate } from "react-router";
import { getUserByEmailAPI, loginUserAPI } from "../../server/server";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value });
  };

  const handleLogin = async () => {
    const response = await loginUserAPI(loginData.email, loginData.password);
    if (response === "Successfully logged in") {
      navigate("/user-courses/1");
    } else {
      alert("Niepoprawny email lub hasło.");
    }
  };
  return (
    <form className="form-display">
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={loginData.email}
          onChange={handleChange}
        />
      </label>
      <label>
        Hasło:
        <input
          type="password"
          name="password"
          value={loginData.password}
          onChange={handleChange}
        />
      </label>
      <button
        onClick={() => {
          handleLogin();
        }}
        type="button"
        className="btn-submit btn-submit--login"
      >
        Zaloguj
      </button>
    </form>
  );
};
export default Login;
