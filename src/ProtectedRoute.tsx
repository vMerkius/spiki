import { jwtDecode } from "jwt-decode";
import React from "react";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token) {
    let isTokenValid = false;
    try {
      const decoded: { exp: number } = jwtDecode(token);
      const currentTimestamp = Date.now() / 1000;
      if (decoded.exp > currentTimestamp) {
        isTokenValid = true;
      }
    } catch (error) {
      console.error("Token decoding error:", error);
    }

    if (!isTokenValid) {
      localStorage.removeItem("token");
      return <Navigate to="/login" />;
    }
  } else {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
