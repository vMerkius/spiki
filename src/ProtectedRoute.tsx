import React from "react";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuth = localStorage.getItem("token");

  return isAuth ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
