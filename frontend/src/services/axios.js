/* eslint-disable no-undef */
import axios from "axios";

const base_Url = "http://localhost:8000/api";

export const axiosInstance = axios.create({
  baseURL: base_Url,
});

export const axiosPrivate = axios.create({
  baseURL: base_Url,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
