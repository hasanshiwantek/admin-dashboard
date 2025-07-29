import axios from "axios"
import {toast} from "react-toastify"


const axiosInstance = axios.create({
  baseURL: "https://ecom.brokercell.com/api/",
})

axiosInstance.interceptors.request.use((config) => {
  if (typeof window != "undefined") {
    const token = localStorage.getItem("token");
    const storeId = localStorage.getItem("storeId");
    if (token){
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (storeId){
      config.headers["storeId"] = Number(storeId);
    }
  }

  return config;
})

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data?.message) {
      toast.success(response.data.message);
    }
    return response;
  },
  (error) => {
    toast.error(error.response?.data?.message || "Something went wrong!");
    return Promise.reject(error);
  }
);


export default axiosInstance;
