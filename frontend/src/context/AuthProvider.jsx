/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const getUserAuth = JSON.parse(localStorage.getItem("jwtToken"));
  const [auth, setAuth] = useState(getUserAuth || null);

  const logout = () => {
    localStorage.removeItem("jwtToken");
    navigate("/login");
  };

  const value = {
    auth,
    setAuth,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
