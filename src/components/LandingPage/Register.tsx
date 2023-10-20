import { useState } from "react";
import { useNavigate } from "react-router";

const Register = () => {
  const navigate = useNavigate();
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
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({
      ...registerData,
      [event.target.name]: event.target.value,
    });
  };
  const handleRegister = () => {
    navigate("/dashboard");
  };
  return (
    <div>
      <form className="form-display">
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
          Password:
          <input
            type="password"
            name="password"
            value={registerData.password}
            onChange={handleChange}
          />
        </label>
        <label>
          Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            value={registerData.confirmPassword}
            onChange={handleChange}
          />
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
    </div>
  );
};
export default Register;
