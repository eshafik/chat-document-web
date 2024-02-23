import axios from "axios";
import { useContext } from "react";
import DispatchContext from "./DispatchContext";

// Create a new Axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: "http://13.229.46.229:7001/api/v1",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("ChatDocumentToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      (error.response && error.response.status === 401) ||
      error.response.status === 403
    ) {
      console.log("helooo");
      const appDispatch = error.config.appDispatch; // Access appDispatch from the error.config object
      if (appDispatch) {
        appDispatch({ type: "logout" });
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
