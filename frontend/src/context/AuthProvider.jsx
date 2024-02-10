/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [token, setToken] = useState("");

  const handleAuth = (token) => {
    setToken(token);
    localStorage.setItem("jwtToken", JSON.stringify(token));
  };
  const value = {
    auth,
    setAuth,
    token,
    setToken,
    handleAuth,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
