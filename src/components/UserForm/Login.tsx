import { useState } from "react";
import { useNavigate } from "react-router";
import { getUserByEmailAPI, loginUserAPI } from "../../server/server";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value });
  };

  const handleLogin = async () => {
    try {
      const response: string = await loginUserAPI(
        loginData.email,
        loginData.password
      );
      console.log(response);
      const decode = jwtDecode(response);
      console.log(decode);

      localStorage.setItem("token", response);
      console.log(decode.userId);
      navigate(`/user-courses/${decode.userId}`);
      // navigate(`/user-courses/1`);
    } catch (error) {
      console.error("Błąd logowania", error);
      alert("Niepoprawny email lub hasło.");
    }
  };
  return (
    <form className="form-display">
      <input
        className="form-display__input"
        type="email"
        name="email"
        value={loginData.email}
        onChange={handleChange}
        placeholder="Email"
      />

      <input
        className="form-display__input"
        type="password"
        name="password"
        value={loginData.password}
        onChange={handleChange}
        placeholder="Hasło"
      />
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
