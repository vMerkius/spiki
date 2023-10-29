import { useState } from "react";
import { useNavigate } from "react-router";
import { getUserByEmailAPI } from "../../server/server";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value });
  };

  // const fetchUser = async (email: string) => {
  //   const fetchedUser = await getUserByEmailAPI(email);
  //   if (
  //     fetchedUser.email === loginData.email &&
  //     fetchedUser.password === loginData.password
  //   ) {
  //     alert("god");
  //   } else {
  //     alert("bad");
  //   }
  // };

  const handleLogin = () => {
    navigate("/user-courses/1");
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
      <button
        onClick={() => {
          handleLogin();
        }}
        type="button"
        className="btn-submit btn-submit--login"
      >
        Log In
      </button>
    </form>
  );
};
export default Login;
