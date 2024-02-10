import axios from "axios";

const base_Url = process.env.base_Url;

export default axios.create({
  baseURL: base_Url,
});

export const axiosPrivate = axios.create({
  baseURL: base_Url,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
