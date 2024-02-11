/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useAxiosFetch from "../hooks/FetchApi";
import { axiosInstance } from "../services/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Login = () => {
  const {
    data: resData,
    loading,
    error,
    fetchData,
  } = useAxiosFetch(axiosInstance);
  const { setAuth } = useAuth();
  console.log("first", resData);

  useEffect(() => {
    resData && localStorage.setItem("jwtToken", JSON.stringify(resData?.user));
    resData && navigate("/ticket");
  }, [resData]);

  const navigate = useNavigate();
  const defaultValues = {
    phNumber: "",
    password: "",
  };
  const { register, handleSubmit, watch, reset } = useForm({
    defaultValues,
  });

  const onSubmit = async (data) => {
    const transformData = {
      phone: data.phNumber,
      password: data.password,
    };
    await fetchData("/user/login", "post", transformData);
    reset();
  };
  return (
    <main className="flex h-screen justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col px-10 py-4 border border-black rounded-lg items-center gap-4"
      >
        <h1>Login Form</h1>
        <input
          type="number"
          {...register("phNumber")}
          className="px-4 py-2 rounded-lg outline-none border border-black"
        />
        <input
          type="password"
          {...register("password")}
          className="px-4 py-2 rounded-lg outline-none border border-black"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-green-400 text-white"
        >
          Log in
        </button>
      </form>
    </main>
  );
};

export default Login;
