/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useLocation, Outlet, Navigate } from "react-router-dom";
import { NavBar } from "../Navbar";
import { useAuth } from "../../../context/AuthProvider";

const RequireAuth = ({ permission }) => {
  const { auth } = useAuth();
  const location = useLocation();
  console.log("route guard", auth);
  return auth?.role?.permission?.find((role) => permission.includes(role)) ? (
    <>
      <div className="flex flex-col">
        <NavBar />
        <div className="flex items-center justify-center mx-20 my-10">
          <Outlet />
        </div>
      </div>
    </>
  ) : auth?.token ? (
    <>
      <Navigate to={"/unauthorized"} state={{ from: location }} replace />
    </>
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default RequireAuth;
