import { useState } from "react";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value });
  };

  const handleLogin = () => {
    navigate("/dashboard");
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
        Password:
        <input
          type="password"
          name="password"
          value={loginData.password}
          onChange={handleChange}
        />
      </label>
      <button type="button" className="btn-submit">
        Log In
      </button>
    </form>
  );
};
export default Login;
