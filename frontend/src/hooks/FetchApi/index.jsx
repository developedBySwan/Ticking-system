import { useState } from "react";

const useAxiosFetch = (axiosInstance) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (url, method, requestData = null) => {
    try {
      setLoading(true);
      let response;
      switch (method.toLowerCase()) {
        case "get":
          response = await axiosInstance.get(url);
          break;
        case "post":
          response = await axiosInstance.post(url, requestData);
          break;
        case "put":
          response = await axiosInstance.put(url, requestData);
          break;
        case "delete":
          response = await axiosInstance.delete(url);
          break;
        default:
          throw new Error("Invalid HTTP method");
      }
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
};

export default useAxiosFetch;
