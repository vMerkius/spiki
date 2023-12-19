import { jwtDecode } from "jwt-decode";
import React from "react";
import { Navigate, useParams } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const value = useParams();
  const id = value.id;
  const isAuth = localStorage.getItem("token");
  // let decode: any = null;
  // if (isAuth) {
  //   decode = jwtDecode(isAuth);
  // }

  // console.log(decode.userId, id);
  // return isAuth && decode.userId === id ? children : <Navigate to="/" />;
  return isAuth ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
