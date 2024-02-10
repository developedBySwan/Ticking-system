/* eslint-disable no-unused-vars */
import { useLocation, Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";

const RequireAuth = () => {
  const { token } = useAuth();
  const location = useLocation();

  return token ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default RequireAuth;
