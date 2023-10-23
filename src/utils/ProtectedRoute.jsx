import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoutes({ isAuth, children }) {
  if (!isAuth) {
    return <Navigate to={"/register"} />;
  }

  return children;
}

export default ProtectedRoutes;
