import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);

  // ✅ Already logged in → redirect dashboard
  if (token) {
    return <Navigate to="/" replace />;
  }

  // ❌ Not logged in → allow login/register
  return children;
};

export default AuthRoute;