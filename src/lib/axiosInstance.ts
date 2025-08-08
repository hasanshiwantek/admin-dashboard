import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: "https://ecom.brokercell.com/api/",
});

axiosInstance.interceptors.request.use((config) => {
  if (typeof window != "undefined") {
    const token = localStorage.getItem("token");
    const storeId = localStorage.getItem("storeId");
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
      toast.success(response.data.message, {
        style: {
          fontSize: "12px",
          fontWeight: "bold",
        },
      });
    }
    return response;
  },
  (error) => {
    // ✅ Show the main message
    if (error.response?.data?.message) {
      toast.error(error.response.data.message, {
        style: {
          fontSize: "12px",
          fontWeight: "bold",
        },
      });
    }

    // ✅ Show each validation error from `errors` object
    const errors = error.response?.data.errors;
    if (errors && typeof errors === "object") {
      Object.values(errors).forEach((fieldErrors) => {
        if (Array.isArray(fieldErrors)) {
          fieldErrors.forEach((err) =>
            toast.error(err, {
              style: {
                fontSize: "12px",
                fontWeight: "bold",
              },
            })
          );
        }
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
