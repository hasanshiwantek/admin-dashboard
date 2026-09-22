import axios from "axios";
import { errorMessage, successMessage } from "@/utils/message";
import { getFromStorage, removeFromStorage } from "@/utils/storage";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://backend.sparemicro.com/api/",
});

axiosInstance.interceptors.request.use((config) => {
  if (typeof window != "undefined") {
    const token = getFromStorage("token");
    const storeId = getFromStorage("storeId");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (storeId) {
      config.headers["storeId"] = Number(storeId);
    }
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data?.message) {
      successMessage(response.data.message);
    }
    return response;
  },
  (error) => {
    if (error.response?.data?.message) {
      errorMessage(error.response.data.message);

      if (error.response?.data?.message == "Unauthenticated.") {
        removeFromStorage("token");
        removeFromStorage("storeId");
        removeFromStorage("user");
        removeFromStorage("availableStores");
        removeFromStorage("tokenExpiry");

        window.location.href = "/login";
      }
    }

    // ✅ Show each validation error from `errors` object
    const errors = error.response?.data.errors;
    if (errors && typeof errors === "object") {
      Object.values(errors).forEach((fieldErrors) => {
        if (Array.isArray(fieldErrors)) {
          fieldErrors.forEach((err) =>
            errorMessage(err)
          );
        }
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
