/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useLocation, Outlet, Navigate } from "react-router-dom";
import { NavBar } from "../Navbar";
import { useAuth } from "../../../context/AuthProvider";

const RequireAuth = ({ permission }) => {
  const { auth } = useAuth();
  const location = useLocation();

  return (
    <>
      <div className="flex flex-col">
        {!auth?.token ? (
          <Navigate to="/login" state={{ from: location }} replace />
        ) : (
          <>
            <NavBar />
            <div className="flex items-center justify-center mx-20 my-10">
              {!auth?.role?.permissions?.find((role) =>
                permission.includes(role)
              ) ? (
                <Navigate
                  to="/unauthorized"
                  state={{ from: location }}
                  replace
                />
              ) : (
                <Outlet />
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default RequireAuth;
