// import axios from "axios";

// // Utility functions (or replace with Redux if needed)
// const getBaseUrl = () => {
//   return localStorage.getItem("baseURL") || "https://default-api.com";
// };

// const getToken = () => {
//   return localStorage.getItem("accessToken");
// };

// // Create Axios instance
// const axiosInstance = axios.create({
//   baseURL: getBaseUrl(),
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Request interceptor to attach token
// axiosInstance.interceptors.request.use((config) => {
//   const token = getToken();
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default axiosInstance;

import axios from "axios";

const getBaseUrl = () => {
  return typeof window !== "undefined"
    ? localStorage.getItem("baseURL") || "https://default-api.com"
    : "https://default-api.com";
};

const axiosInstance = axios.create({
  baseURL: getBaseUrl(),
  // Remove headers block here
});

axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");
    const baseURL = localStorage.getItem("baseURL") || "https://default-api.com";

    config.baseURL = baseURL;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default axiosInstance;
